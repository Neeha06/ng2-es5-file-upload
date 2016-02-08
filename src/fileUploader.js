  //require('./fileLikeObject.js');
  //require('./fileItem.js');

  exports.FileUploader = ng.core
  .Directive({
    selector: 'uploader'
  })
  .Class({
    constructor: function FileUploader (options) {
      this.options = options;
      this.isUploading = false;
      this.queue = [];
      this.progress = 0;
      this.autoUpload = false;
      this.isHTML5 = true;
      this.removeAfterUpload = false;
      this._nextIndex = 0;
      this.filters = [];
      this.url = options.url;
      this.authToken = options.authToken;
      this.filters.unshift({name: 'queueLimit', fn: this._queueLimitFilter});
      this.filters.unshift({name: 'folder', fn: this._folderFilter});
    },

    addToQueue: function (files, options, filters) {
      var _this = this;
      var list = [];
      for (var _i = 0; _i < files.length; _i++) {
        var file = files[_i];
        list.push(file);
      }
      var arrayOfFilters = this._getFilters(filters);
      var count = this.queue.length;
      var addedFileItems = [];
      list.map(function (some) {
        var temp = new exports.FileLikeObject(some);
        if (_this._isValidFile(temp, [], options)) {
          var fi = new exports.FileItem(_this, some, options);
          addedFileItems.push(fi);
          _this.queue.push(fi);
          _this._onAfterAddingFile(fi);
        }
        else {
          var filter = arrayOfFilters[_this._failFilterIndex];
          _this._onWhenAddingFileFailed(temp, filter, options);
        }
      });
      if (this.queue.length !== count) {
        this._onAfterAddingAll(addedFileItems);
        this.progress = this._getTotalProgress();
      }
      this._render();
      if (this.autoUpload) {
        this.uploadAll();
      }
    },

    removeFromQueue: function (value) {
      var index = this.getIndexOfItem(value);
      var item = this.queue[index];
      if (item.isUploading) {
        item.cancel();
      }
      this.queue.splice(index, 1);
      this.progress = this._getTotalProgress();
    },

    clearQueue: function () {
      while (this.queue.length) {
        this.queue[0].remove();
      }
      this.progress = 0;
    },

    uploadItem: function (value) {
      var index = this.getIndexOfItem(value);
      var item = this.queue[index];
      var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';
      item._prepareToUploading();
      if (this.isUploading) {
        return;
      }
      this.isUploading = true;
      this[transport](item);
    },

    cancelItem: function (value) {
      var index = this.getIndexOfItem(value);
      var item = this.queue[index];
      var prop = this.isHTML5 ? '_xhr' : '_form';
      if (item && item.isUploading) {
        item[prop].abort();
      }
    },

    uploadAll: function () {
      var items = this.getNotUploadedItems().filter(function (item) {
        return !item.isUploading;
      });
      if (!items.length) {
        return;
      }
      items.map(function (item) { return item._prepareToUploading(); });
      items[0].upload();
    },

    cancelAll: function () {
      var items = this.getNotUploadedItems();
      items.map(function (item) { return item.cancel(); });
    },

    isFile: function (value) {
      return (File && value instanceof File);
    },

    isFileLikeObject: function (value) {
      return value instanceof exports.FileLikeObject;
    },

    getIndexOfItem: function (value) {
      return typeof value === 'number' ? value : this.queue.indexOf(value);
    },

    getNotUploadedItems: function () {
      return this.queue.filter(function (item) { return !item.isUploaded; });
    },

    getReadyItems: function () {
      return this.queue
        .filter(function (item) { return (item.isReady && !item.isUploading); })
        .sort(function (item1, item2) { return item1.index - item2.index; });
    },

    destroy: function () {},

    onAfterAddingAll: function (fileItems) {},

    onAfterAddingFile: function (fItem) {},

    onWhenAddingFileFailed: function (item, filter, options) {},

    onBeforeUploadItem: function (fItem) {},

    onProgressItem: function (fItem, progress) {},

    onProgressAll: function (progress) {},

    onSuccessItem: function (item, response, status, headers) {},

    onErrorItem: function (item, response, status, headers) {},

    onCancelItem: function (item, response, status, headers) {},

    onCompleteItem: function (item, response, status, headers) {},

    onCompleteAll: function () {},

    _getTotalProgress: function (value) {
      if (value === undefined) {
        value = 0;
      }
      if (this.removeAfterUpload) {
        return value;
      }
      var notUploaded = this.getNotUploadedItems().length;
      var uploaded = notUploaded ? this.queue.length - notUploaded
          : this.queue.length;
      var ratio = 100 / this.queue.length;
      var current = value * ratio / 100;
      return Math.round(uploaded * ratio + current);
    },

    _getFilters: function (filters) {
      if (!filters) {
        return this.filters;
      }
      if (Array.isArray(filters)) {
        return filters;
      }
      var names = filters.match(/[^\s,]+/g);
      return this.filters.filter(
          function (filter) { return names.indexOf(filter.name) !== -1; });
    },

    _render: function () {},

    _folderFilter: function (item) {
      return !!(item.size || item.type);
    },

    _queueLimitFilter: function () {
      return this.queue.length < this.queueLimit;
    },

    _isValidFile: function (file, filters, options) {
      var _this = this;
      this._failFilterIndex = -1;
      return !filters.length ? true : filters.every(function (filter) {
        _this._failFilterIndex++;
        return filter.fn.call(_this, file, options);
      });
    },

    _isSuccessCode: function (status) {
      return (200 <= status && status < 300) || status === 304;
    },

    _transformResponse: function (response, headers) {
      return response;
    },

    _parseHeaders: function (headers) {
      var parsed = {}, key, val, i;
      if (!headers) {
        return parsed;
      }
      headers.split('\n').map(function (line) {
        i = line.indexOf(':');
        key = line.slice(0, i).trim().toLowerCase();
        val = line.slice(i + 1).trim();
        if (key) {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });
      return parsed;
    },

    _headersGetter: function (parsedHeaders) {
      return function (name) {
        if (name) {
          return parsedHeaders[name.toLowerCase()] || null;
        }
        return parsedHeaders;
      };
    },

    _xhrTransport: function (item) {
      var _this = this;
      var xhr = item._xhr = new XMLHttpRequest();
      var form = new FormData();
      this._onBeforeUploadItem(item);
      if (typeof item._file.size !== 'number') {
        throw new TypeError('The file specified is no longer valid');
      }
      form.append(item.alias, item._file, item.file.name);
      xhr.upload.onprogress = function (event) {
        var progress = Math.round(
            event.lengthComputable ? event.loaded * 100 / event.total : 0);
        _this._onProgressItem(item, progress);
      };
      xhr.onload = function () {
        var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
        var response = _this._transformResponse(xhr.response, headers);
        var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
        var method = '_on' + gist + 'Item';
        _this[method](item, response, xhr.status, headers);
        _this._onCompleteItem(item, response, xhr.status, headers);
      };
      xhr.onerror = function () {
        var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
        var response = _this._transformResponse(xhr.response, headers);
        _this._onErrorItem(item, response, xhr.status, headers);
        _this._onCompleteItem(item, response, xhr.status, headers);
      };
      xhr.onabort = function () {
        var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
        var response = _this._transformResponse(xhr.response, headers);
        _this._onCancelItem(item, response, xhr.status, headers);
        _this._onCompleteItem(item, response, xhr.status, headers);
      };
      xhr.open(item.method, item.url, true);
      xhr.withCredentials = item.withCredentials;
      if (this.authToken) {
        xhr.setRequestHeader('Authorization', this.authToken);
      }
      xhr.send(form);
      this._render();
    },

    _iframeTransport: function (item) {},

    _onWhenAddingFileFailed: function (item, filter, options) {
      this.onWhenAddingFileFailed(item, filter, options);
    },

    _onAfterAddingFile: function (item) {
      this.onAfterAddingFile(item);
    },

    _onAfterAddingAll: function (items) {
      this.onAfterAddingAll(items);
    },

    _onBeforeUploadItem: function (item) {
      item._onBeforeUpload();
      this.onBeforeUploadItem(item);
    },

    _onProgressItem: function (item, progress) {
      var total = this._getTotalProgress(progress);
      this.progress = total;
      item._onProgress(progress);
      this.onProgressItem(item, progress);
      this.onProgressAll(total);
      this._render();
    },

    _onSuccessItem: function (item, response, status, headers) {
      item._onSuccess(response, status, headers);
      this.onSuccessItem(item, response, status, headers);
    },

    _onErrorItem: function (item, response, status, headers) {
      item._onError(response, status, headers);
      this.onErrorItem(item, response, status, headers);
    },

    _onCancelItem: function (item, response, status, headers) {
      item._onCancel(response, status, headers);
      this.onCancelItem(item, response, status, headers);
    },

    _onCompleteItem: function (item, response, status, headers) {
      item._onComplete(response, status, headers);
      this.onCompleteItem(item, response, status, headers);
      var nextItem = this.getReadyItems()[0];
      this.isUploading = false;
      if (nextItem) {
        nextItem.upload();
        return;
      }
      this.onCompleteAll();
      this.progress = this._getTotalProgress();
      this._render();
    }
  });

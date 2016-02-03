;(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    factory(exports, require('fileLikeObject'));
  else if (typeof define === 'function' && define.amd)
    // AMD: Register as an anonymous module
    define(['exports', 'fileLikeObject'], factory);
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string')
    // CommonJS
    factory(exports, require('fileLikeObject'));
  else
    // browser globals (root is window)
    factory((root.fileItem = {}), root.fileLikeObject);
}(this, function (exports, fileLikeObject) {

  // Attach properties to the exports object to define exported properties
  exports.FileItem = ng.core.Class({
    constructor: function FileItem (uploader, some, options) {
      this.uploader = uploader;
      this.some = some;
      this.options = options;
      this.alias = 'file';
      this.url = '/';
      this.method = 'POST';
      this.headers = [];
      this.withCredentials = true;
      this.formData = [];
      this.isReady = false;
      this.isUploading = false;
      this.isUploaded = false;
      this.isSuccess = false;
      this.isCancel = false;
      this.isError = false;
      this.progress = 0;
      this.index = null;
      this.file = new fileLikeObject.FileLikeObject(some);
      this._file = some;
      this.url = uploader.url;
    },

    upload: function () {
      try {
        this.uploader.uploadItem(this);
      }
      catch (e) {
        this.uploader._onCompleteItem(this, '', 0, []);
        this.uploader._onErrorItem(this, '', 0, []);
      }
    },

    cancel: function () {
      this.uploader.cancelItem(this);
    },

    remove: function () {
      this.uploader.removeFromQueue(this);
    },

    onBeforeUpload: function () {
    },

    onProgress: function (progress) {
    },

    onSuccess: function (response, status, headers) {
    },

    onError: function (response, status, headers) {
    },

    onCancel: function (response, status, headers) {
    },

    onComplete: function (response, status, headers) {
    },

    _onBeforeUpload: function () {
      this.isReady = true;
      this.isUploading = true;
      this.isUploaded = false;
      this.isSuccess = false;
      this.isCancel = false;
      this.isError = false;
      this.progress = 0;
      this.onBeforeUpload();
    },

    _onProgress: function (progress) {
      this.progress = progress;
      this.onProgress(progress);
    },

    _onSuccess: function (response, status, headers) {
      this.isReady = false;
      this.isUploading = false;
      this.isUploaded = true;
      this.isSuccess = true;
      this.isCancel = false;
      this.isError = false;
      this.progress = 100;
      this.index = null;
      this.onSuccess(response, status, headers);
    },

    _onError: function (response, status, headers) {
      this.isReady = false;
      this.isUploading = false;
      this.isUploaded = true;
      this.isSuccess = false;
      this.isCancel = false;
      this.isError = true;
      this.progress = 0;
      this.index = null;
      this.onError(response, status, headers);
    },

    _onCancel: function (response, status, headers) {
      this.isReady = false;
      this.isUploading = false;
      this.isUploaded = false;
      this.isSuccess = false;
      this.isCancel = true;
      this.isError = false;
      this.progress = 0;
      this.index = null;
      this.onCancel(response, status, headers);
    },

    _onComplete: function (response, status, headers) {
      this.onComplete(response, status, headers);
      if (this.uploader.removeAfterUpload) {
        this.remove();
      }
    },

    _prepareToUploading: function () {
      this.index = this.index || ++this.uploader._nextIndex;
      this.isReady = true;
    }
  });
}));

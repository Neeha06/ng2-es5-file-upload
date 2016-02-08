  exports.FileLikeObject = ng.core
  .Class({
    constructor: function FileLikeObject (fileOrInput) {
      var isInput = !!(fileOrInput && (fileOrInput.nodeName
          || fileOrInput.prop && fileOrInput.attr && fileOrInput.find));
      var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
      if (typeof fakePathOrObject === 'string') {
        this._createFromFakePath(fakePathOrObject);
      }
      else {
        this._createFromObject(fakePathOrObject);
      }
    },

    _createFromFakePath: function (path) {
      this.lastModifiedDate = null;
      this.size = null;
      this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
      this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\')
          + 2);
    },

    _createFromObject: function (object) {
      this.size = object.size;
      this.type = object.type;
      this.name = object.name;
    }
  });

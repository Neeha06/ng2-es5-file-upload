;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD: Register as an anonymous module
    define(['exports'], factory);
    console.log('fileLikeObject@AMD');
    // or if global is also required:
    // define(['exports'], function (exports) {
    //   factory(root.fileLikeObject = exports);
    // });
  }
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports);
    console.log('fileLikeObject@CommonJS');
  }
  else {
    // browser globals (root is window)
    factory(root.fileLikeObject = {});
    console.log('fileLikeObject@globals');
  }
}(this, function (exports) {

  // Attach properties to the exports object to define exported properties
  exports.FileLikeObject = ng.core.Class({
    constructor: function FileLikeObject (fileOrInput) {
      var isInput = !!(fileOrInput && (fileOrInput.nodeName
          || fileOrInput.prop && fileOrInput.attr && fileOrInput.find));
      var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
      if (typeof fakePathOrObject === 'string')
        this._createFromFakePath(fakePathOrObject);
      else
        this._createFromObject(fakePathOrObject);
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

}));

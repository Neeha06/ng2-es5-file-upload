;(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    factory(exports, require('fileSelect'), require('fileDrop'),
        require('fileUploader'));
  else if (typeof define === 'function' && define.amd)
    // AMD: Register as an anonymous module
    define(['exports', 'fileSelect', 'fileDrop', 'fileUploader'], factory);
  else if (typeof exports === 'object' && typeof exports.nodeName !== 'string')
    // CommonJS
    factory(exports, require('fileSelect'), require('fileDrop'),
        require('fileUploader'));
  else
    // browser globals (root is window)
    factory((root.upload = {}), root.fileSelect, root.fileDrop,
        root.fileUploader);
}(this, function (exports, fileSelect, fileDrop, fileUploader) {

  const URL = 'http//jsonplaceholder.typicode.com/posts';

  // Attach properties to the exports object to define exported properties
  exports.Upload = ng.core.Component({
    selector: 'upload',
    templateUrl: 'upload.component.html',
    directives: [fileSelect.FileSelect, fileDrop.FileDrop]
  })
  .Class({
    constructor: function Upload () {
      this.uploader = new fileUploader.FileUploader({url: URL});
      this.hasBaseDropzoneOver = false;
      this.hasAnotherDropzoneOver = false;
    },

    fileOverBase: function (e) {
      this.hasBaseDropzoneOver = e;
    },

    fileOverAnother: function (e) {
      this.hasAnotherDropzoneOver = e;
    }
  });

}));

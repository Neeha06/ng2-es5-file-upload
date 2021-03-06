(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    factory(exports, require('ng2-es5-file-upload'));
  else if (typeof define === 'function' && define.amd)
    // AMD: Register as an anonymous module
    define(['exports', 'ng2-es5-file-upload'], factory);
  else if (typeof exports === 'object' && typeof exports.nodeName !== 'string')
    // CommonJS
    factory(exports, require('ng2-es5-file-upload'));
  else
    // browser globals (root is window)
    factory((root.upload = {}), root.ng2Es5FileUpload);
}(this, function (exports, fileUpload) {

  const URL = 'http://jsonplaceholder.typicode.com/posts';

  // Attach properties to the exports object to define exported properties
  exports.Upload = ng.core
  .Component({
    selector: 'upload',
    templateUrl: 'upload.component.html',
    directives: [fileUpload.FileSelect, fileUpload.FileDrop]
  })
  .Class({
    constructor: function Upload () {
      this.uploader = new fileUpload.FileUploader({url: URL});
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

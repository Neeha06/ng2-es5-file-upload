(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD: Register as an anonymous module
    define(['exports', 'fileSelect', 'fileDrop', 'fileUploader'], factory);
    console.log('upload@AMD');
    // or if global is also required:
    // define(['exports', 'fileSelect', 'fileDrop', 'fileUploader'],
    //     function (exports, fileSelect, fileDrop, fileUploader) {
    //   factory((root.upload = exports), fileSelect, fileDrop, fileUploader);
    // });
  }
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('fileSelect'), require('fileDrop'),
        require('fileUploader'));
    console.log('upload@CommonJS');
  }
  else {
    // browser globals (root is window)
    factory((root.upload = {}), root.fileSelect, root.fileDrop,
        root.fileUploader);
    console.log('upload@globals');
  }
}(this, function (exports, fileSelect, fileDrop, fileUploader) {

  const URL = '/api/upload';

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

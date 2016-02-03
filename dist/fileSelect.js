(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD: Register as an anonymous module
    define(['exports', 'fileLikeObject', 'fileItem'], factory);
    console.log('fileSelect@AMD');
    // or if global is also required:
    // define(['exports', 'fileLikeObject', 'fileItem'],
    //     function (exports, fileLikeObject, fileItem) {
    //   factory((root.fileSelect = exports), fileLikeObject, fileItem);
    // });
  }
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('fileLikeObject', 'fileItem'));
    console.log('fileSelect@CommonJS');
  }
  else {
    // browser globals (root is window)
    factory((root.fileSelect = {}), root.fileLikeObject, root.fileItem);
    console.log('fileSelect@globals');
  }
}(this, function (exports, fileLikeObject, fileItem) {

  // Attach properties to the exports object to define exported properties
  exports.FileSelect = ng.core
  .Directive({
    selector: '[ng2-file-select]',
    properties: ['uploader'],
    host: {
      '(change)': 'onChange()'
    }
  })
  .Class({
    constructor: [ng.core.ElementRef, function FileSelect (element) {
      this.element = element;
    }],

    getOptions: function () {
      return this.uploader.options;
    },

    getFilters: function () {
    },

    isEmptyAfterSelection: function () {
      return !this.element.nativeElement.attributes.multiple;
    },

    onChange: function () {
      var files = this.element.nativeElement.files;
      var options = this.getOptions();
      var filters = this.getFilters();
      this.uploader.addToQueue(files, options, filters);
      if (this.isEmptyAfterSelection()) {
      }
    }
  });

}));

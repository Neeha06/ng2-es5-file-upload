;(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    factory(exports, require('fileLikeObject'), require('fileItem'));
  else if (typeof define === 'function' && define.amd)
    // AMD: Register as an anonymous module
    define(['exports', 'fileLikeObject', 'fileItem'], factory);
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string')
    // CommonJS
    factory(exports, require('fileLikeObject'), require('fileItem'));
  else
    // browser globals (root is window)
    factory((root.fileSelect = {}), root.fileLikeObject, root.fileItem);
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

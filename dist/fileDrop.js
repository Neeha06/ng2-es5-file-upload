(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD: Register as an anonymous module
    define(['exports'], factory);
    console.log('fileDrop@AMD');
    // or if global is also required:
    // define(['exports'], function (exports) {
    //   factory(root.fileDrop = exports);
    // });
  }
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports);
    console.log('fileDrop@CommonJS');
  }
  else {
    // browser globals (root is window)
    factory(root.fileDrop = {});
    console.log('fileDrop@globals');
  }
}(this, function (exports) {

  // Attach properties to the exports object to define exported properties
  exports.FileDrop = ng.core
  .Directive({
    selector: '[ng2-file-drop]',
    properties: ['uploader'],
    events: ['fileOver'],
    host: {
      '(drop)': 'onDrop($event)',
      '(dragover)': 'onDragOver($event)',
      '(dragleave)': 'onDragLeave($event)'
    }
  })
  .Class({
    constructor: [ng.core.ElementRef, function FileDrop (element) {
      this.element = element;
      this.fileOver = new ng.core.EventEmitter();
    }],

    getOptions: function () {
      return this.uploader.options;
    },

    getFilters: function () {
    },

    onDrop: function (event) {
      var transfer = this._getTransfer(event);
      if (!transfer) {
        return;
      }
      var options = this.getOptions();
      var filters = this.getFilters();
      this._preventAndStop(event);
      this.uploader.addToQueue(transfer.files, options, filters);
      this.fileOver.next(false);
    },

    onDragOver: function (event) {
      var transfer = this._getTransfer(event);
      if (!this._haveFiles(transfer.types)) {
        return;
      }
      transfer.dropEffect = 'copy';
      this._preventAndStop(event);
      this.fileOver.next(true);
    },

    onDragLeave: function (event) {
      if (event.currentTarget === this.element[0]) {
        return;
      }
      this._preventAndStop(event);
      this.fileOver.next(false);
    },

    _getTransfer: function (event) {
      return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    },

    _preventAndStop: function (event) {
      event.preventDefault();
      event.stopPropagation();
    },

    _haveFiles: function (types) {
      if (!types) {
        return false;
      }
      if (types.indexOf) {
        return types.indexOf('Files') !== -1;
      }
      else if (types.contains) {
        return types.contains('Files');
      }
      else {
        return false;
      }
    },

    _addOverClass: function (item) {
      item.addOverClass();
    },

    _removeOverClass: function (item) {
      item.removeOverClass();
    }

  });

}));

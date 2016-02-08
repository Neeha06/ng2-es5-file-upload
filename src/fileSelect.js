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

    getFilters: function () {},

    isEmptyAfterSelection: function () {
      return !this.element.nativeElement.attributes.multiple;
    },

    onChange: function () {
      var files = this.element.nativeElement.files;
      var options = this.getOptions();
      var filters = this.getFilters();
      this.uploader.addToQueue(files, options, filters);
      if (this.isEmptyAfterSelection()) {}
    }
  });

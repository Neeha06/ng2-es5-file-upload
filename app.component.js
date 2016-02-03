;(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    factory(exports, require('upload'));
  else if (typeof define === 'function' && define.amd)
    // AMD: Register as an anonymous module
    define(['exports', 'upload'], factory);
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string')
    // CommonJS
    factory(exports, require('upload'));
  else
    // browser globals (root is window)
    factory((root.app = {}), root.upload);
}(this, function (exports, upload) {

  // Attach properties to the exports object to define exported properties
  exports.App = ng.core.Component({
    selector: 'div#app',
    template: '<h1>Queued File Uploads</h1><upload></upload>',
    directives: [upload.Upload]
  })
  .Class({
    constructor: function App () {}
  });

}));

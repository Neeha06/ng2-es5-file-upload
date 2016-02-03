;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD: Register as an anonymous module
    define(['exports', 'upload'], factory);
    console.log('app@AMD');
    // or if global is also required:
    // define(['exports', 'upload'], function (exports, upload) {
    //   factory((root.upload = exports), upload);
    // });
  }
  else if (typeof exports === 'object'
      && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('upload'));
    console.log('app@CommonJS');
  }
  else {
    // browser globals (root is window)
    factory((root.app = {}), root.upload);
    console.log('app@globals');
  }
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

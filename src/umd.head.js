/* @license Open source under the MIT License.
 * Version: 0.0.1
 * http://niczero.github.com/ng2-es5-file-upload/
 */
;(function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    factory(exports);
  else if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object' && typeof exports.nodeName !== 'string')
    factory(exports);
  else
    factory(root.ng2Es5FileUpload = {});
}(this, function (exports) {


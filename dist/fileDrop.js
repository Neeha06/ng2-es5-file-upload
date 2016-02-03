var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var FileDrop = (function () {
    function FileDrop(element) {
        this.element = element;
        this.fileOver = new core_1.EventEmitter();
    }
    FileDrop.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileDrop.prototype.getFilters = function () {
    };
    FileDrop.prototype.onDrop = function (event) {
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        var options = this.getOptions();
        var filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.next(false);
    };
    FileDrop.prototype.onDragOver = function (event) {
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.next(true);
    };
    FileDrop.prototype.onDragLeave = function (event) {
        if (event.currentTarget === this.element[0]) {
            return;
        }
        this._preventAndStop(event);
        this.fileOver.next(false);
    };
    FileDrop.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    FileDrop.prototype._preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDrop.prototype._haveFiles = function (types) {
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
    };
    FileDrop.prototype._addOverClass = function (item) {
        item.addOverClass();
    };
    FileDrop.prototype._removeOverClass = function (item) {
        item.removeOverClass();
    };
    FileDrop = __decorate([
        core_1.Directive({
            selector: '[ng2-file-drop]',
            properties: ['uploader'],
            events: ['fileOver'],
            host: {
                '(drop)': 'onDrop($event)',
                '(dragover)': 'onDragOver($event)',
                '(dragleave)': 'onDragLeave($event)'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], FileDrop);
    return FileDrop;
})();
exports.FileDrop = FileDrop;
//# sourceMappingURL=file-drop.js.map
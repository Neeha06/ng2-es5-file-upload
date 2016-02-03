## Usage

### Annotations
```javascript
// class FileSelect
.Directive({
  selector: '[ng2-file-select]',
  properties: ['uploader'],
  host: {
    '(change)': 'onChange()'
  }
})
```

```javascript
// class FileDrop
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
```

## FileSelect API

### Properties

- `uploader` - (`FileUploader`) - uploader object.  See usage in
[demo](https://github.io//niczero/ng2-es5-file-upload/blob/master/demo/upload.component.js)

Parameters supported by this object:

1. `url` - URL to POST to.
2. `authToken` - auth token that will be applied as 'Authorization' header
   during file send.

## FileDrop API

### Properties

As above.

### Events

- `file-over` - it fires during 'over' and 'out' events for drop area; returns
  `boolean`: `true` if file is over drop area, `false` otherwise.  See usage in
[demo](https://github.io//niczero/ng2-es5-file-upload/blob/master/demo/upload.component.js)

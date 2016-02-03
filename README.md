# ng2-es5-file-upload [![npm version](https://badge.fury.io/js/ng2-es5-file-upload.svg)](http://badge.fury.io/js/ng2-es5-file-upload)
Easy to use Angular2 directives for file uploads
([demo](http://niczero.github.io/ng2-es5-file-upload))

Follow me at [twitter](https://twitter.com/durcais) to be notified about new
releases.

[![Code Climate](https://codeclimate.com/github/niczero/ng2-es5-file-upload/badges/gpa.svg)](https://codeclimate.com/github/niczero/ng2-es5-file-upload)
[![Join the chat at https://gitter.im/niczero/ng2-bootstrap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/niczero/ng2-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/niczero/ng2-es5-file-upload.svg)](https://david-dm.org/niczero/ng2-es5-file-upload)
[![devDependency Status](https://david-dm.org/niczero/ng2-es5-file-upload/dev-status.svg)](https://david-dm.org/niczero/ng2-es5-file-upload#info=devDependencies)
[![Throughput Graph](https://graphs.waffle.io/niczero/ng2-es5-file-upload/throughput.svg)](https://waffle.io/niczero/ng2-es5-file-upload/metrics)

## Quick start

1. A recommended way to install ***ng2-es5-file-upload*** is through
[npm](https://www.npmjs.com/search?q=ng2-es5-file-upload) package manager using
the following command:

  `npm i ng2-es5-file-upload --save`

Alternatively, you can [download it in a ZIP file](https://github.com/niczero/ng2-es5-file-upload/archive/master.zip).

2. Currently `ng2-es5-file-upload` contains two directives: `ng2-file-select`
and `ng2-file-drop`.  `ng2-file-select` is used for 'file-input' form fields
and `ng2-file-drop` is used for areas that will be used for dropping files.

3. More information regarding use of ***ng2-es5-file-upload*** is located in
[demo](http://niczero.github.io/ng2-es5-file-upload) and
[demo sources](https://github.com/niczero/ng2-es5-file-upload/tree/master/demo).

## API for `ng2-file-select`

### Properties

- `uploader` - (`FileUploader`) - uploader object.  See usage in
[demo](https://github.com/niczero/ng2-es5-file-upload/blob/master/demo/components/file-upload/simple-demo.ts)

## API for `ng2-file-drop`

### Properties

- `uploader` - (`FileUploader`) - uploader object.  See using in
[demo](https://github.com/niczero/ng2-es5-file-upload/blob/master/demo/components/file-upload/simple-demo.ts)

Parameters supported by this object:

1. `url` - URL of File Uploader's route
2. `authToken` - Auth token that will be applied as 'Authorization' header
during file send.

### Events

- `file-over` - fires during 'over' and 'out' events for Drop Area; returns
`boolean: true` if file is over Drop Area, `false` otherwise.
See usage in
[ts demo](https://github.com/niczero/ng2-es5-file-upload/blob/master/demo/components/file-upload/simple-demo.ts)
and
[html demo](https://github.com/niczero/ng2-es5-file-upload/blob/master/demo/components/file-upload/simple-demo.html)

# Troubleshooting

Please follow these guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/niczero/ng2-es5-file-upload/issues)
to report bugs and feature requests.
2. Please **always** write steps to reproduce the error.  That way we can focus
on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding.

### License

The MIT License (see the
[LICENSE](https://github.com/niczero/ng2-es5-file-upload/blob/master/LICENSE)
file for the full text)

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.config('env',
      grunt.option('env') || process.env.GRUNT_ENV || 'development');

  grunt.config('concat', {
    js: {
      options: {
        sourceMap: true,
        preserveComments: 'some'
      },
      src: ['src/umd.head.js', 'src/fileLikeObject.js', 'src/fileItem.js',
           'src/fileUploader.js', 'src/fileSelect.js', 'src/fileDrop.js',
           'src/umd.tail.js'],
      dest: 'dist/<%= pkg.name %>.umd.js'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.config('uglify', {
    js: {
      options: {
        sourceMap: 'dist/<%= pkg.name %>.umd.min.js.map',
        preserveComments: 'some'
      },
      src: ['dist/<%= pkg.name %>.umd.js'],
      dest: 'dist/<%= pkg.name %>.umd.min.js'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);
};

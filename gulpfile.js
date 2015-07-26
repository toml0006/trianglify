var fs = require('fs')
var path = require('path')

var browserify = require('browserify')
var gulp = require('gulp')
var notifier = require('node-notifier')
var source = require('vinyl-source-stream')
var uglify = require('gulp-uglify')
var buffer = require('vinyl-buffer')

// Spin up a browserify instance
var bundler = browserify('./lib/trianglify.js', {
  standalone: 'Trianglify',
  cache: {},
  packageCache: {},
  fullPaths: true
})
bundler.exclude('crypto')

gulp.task('browserify', function () {
  // start the deps bundler
  return bundler.bundle()
    .on('error', function (error) {
      notifier.notify({
        'title': 'Browserify Build Failed',
        'message': path.relative(__dirname, error.filename)
      })
      console.log(error.message)
      this.emit('end')
    })
    .pipe(source('./trianglify.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('browser-test', function () {
  var testBundler = browserify('./test/test.js', {
    standalone: 'Trianglify',
    cache: {},
    packageCache: {},
    fullPaths: true
  })

  return testBundler.bundle()
  .pipe(source('test.browserify.js'))
  .pipe(gulp.dest('test'))
})

gulp.task('watch', ['browserify'], function () {
  gulp.watch('lib/**/*.js', ['browserify'])
})

gulp.task('clean', function (done) {fs.unlink('dist', done)})

gulp.task('default', ['browserify'])

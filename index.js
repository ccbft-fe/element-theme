var gulp = require('gulp')
var task = require('./lib/task')
var vars = require('./lib/gen-vars')
var config = require('./lib/config')

var noop = () => {}

var build = function (opts) {
  return function () {
    return task.build(Object.assign(opts, {message: 'build element theme'}))
  }
}

var fonts = function (opts) {
  return function () {
    return task.fonts(Object.assign(opts, {message: 'build theme font'}))
  }
}

exports.init = function (filePath) {
  filePath = {}.toString.call(filePath) === '[object String]' ? filePath : ''
  vars.init(filePath)
}

exports.watch = function (opts) {
  gulp.task('build', build(opts))
  exports.run(opts)
  gulp.watch(opts.config || config.config, ['build'])
}

exports.run = function (opts, cb) {
  gulp.task('build', build(opts))
  gulp.task('fonts', fonts(opts))
  if (typeof cb === 'function') {
    return gulp.series('build', 'fonts', cb)(noop)
  }
  return gulp.series('build', 'fonts')(noop)
}

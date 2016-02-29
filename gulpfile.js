var gulp = require('gulp');
var uglify = require('gulp-uglify');

// 压缩js
gulp.task('min-js', function () {
  gulp.src('sta/js/src/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('sta/js/dest/'))
});

//
gulp.task('default', []);

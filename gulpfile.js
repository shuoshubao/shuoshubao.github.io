var gulp = require('gulp');
var uglify = require('gulp-uglify');
var transport = require("gulp-seajs-transport");

// transport - seajs
gulp.task("transport",function(){
	gulp.src('sta/js-dist/*.js')
		.pipe(transport())
		.pipe(gulp.dest('sta/js/'))
});

// 压缩js
gulp.task('min-js', function () {
	gulp.src('sta/js-dist/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('sta/js/'))
});

//
gulp.task('default', []);

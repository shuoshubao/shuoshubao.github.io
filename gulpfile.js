"use strict";
let gulp = require('gulp');
let markdown = require('gulp-markdown');
let htmlmin = require('gulp-htmlmin');

/*
gulp.task('markdown', () => {
  return gulp.src('_posts\/\*\*\/\*.md')
    .pipe(markdown())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('_posts_other'));
});
*/
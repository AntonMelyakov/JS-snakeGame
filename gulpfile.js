const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('jsmin', function() {
  gulp.src('js and css/*.js')
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('minjs'))
})

gulp.task('cssmin', function() {
  gulp.src('js and css/*.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('minjs'))
})

gulp.task('default', ['cssmin'])

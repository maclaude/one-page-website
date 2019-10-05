/**
 * NPM import
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

/**
 * Configuration
 */
// Compile scss into css
function style() {
  // 1. Where is my scss file
  return gulp.src('./scss/**/*.scss')
  // 2. Pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
  // 3. Where do I save the compiled css
    .pipe(gulp.dest('./css'))
  // 4. Stream changes to all browser
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  // Watching update on SCSS / HTML / JS files
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

/**
 * Export
 */
exports.style = style;
exports.watch = watch;
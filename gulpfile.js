const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const pug = require('gulp-pug');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('cuda-project/style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('pug', () => {
    return gulp.src('cuda-project/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload())
});

gulp.task('watch', () => {
    gulp.watch('cuda-project/style/*.scss', ['sass']);
    gulp.watch('cuda-project/pug/*.pug', ['pug']);
});

gulp.task('connect', () => {
    connect.server({
        port: 8000,
        root: './',
        livereload: true
    })
});

gulp.task('default', ['connect', 'watch']);

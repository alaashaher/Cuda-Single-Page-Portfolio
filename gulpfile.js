const gulp = require('gulp');
const sass = require('node-sass');
const pug = require('gulp-pug');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const concat = require('gulp-concat');

gulp.task('sass', () => {
    sass('cuda-project/style/*.scss', {
        sourcemap: true,
        style: 'compressed'
    })
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
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

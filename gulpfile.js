var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');

var paths = {
    scripts: [
        'src/js/**/*.js',
        '!src/js/vendor/*.min.js'
    ],
    sass: 'src/scss/*.scss',
    css: [
        'src/css/**/*.css',
        '!src/css/bundle.css'
    ]
}

gulp.task('clean', function () {
    return del([
        'dist'
    ]);
});

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
});

gulp.task('css', function () {
    return gulp.src(paths.css)
        .pipe(concatCss("bundle.css"))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['clean', 'sass'], function () {
    gulp.start('css');
});
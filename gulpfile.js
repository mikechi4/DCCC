var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');


var paths = {
    jsSource: ['./app.js', './js/**/*.js'],
    scssSource: './styles/**/**/*.scss'
};


gulp.task('js-bundle', function() {
    gulp.src(paths.jsSource)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('scss-bundle', function() {
    gulp.src(paths.scssSource)
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('watch', function() {
    gulp.watch(paths.jsSource, ['js-bundle'])
    gulp.watch(paths.scssSource, ['scss-bundle'])
});

gulp.task('default', ['watch','js-bundle', 'scss-bundle']);

const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');


const paths = {
    jsSource: ['./app.js', './js/**/*.js'],
    scssSource: './styles/**/**/*.scss'
};


gulp.task('js-bundle', () => {
    gulp.src(paths.jsSource)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('scss-bundle', () => {
    gulp.src(paths.scssSource)
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/dist'))
});

gulp.task('watch', () => {
    gulp.watch(paths.jsSource, ['js-bundle'])
    gulp.watch(paths.scssSource, ['scss-bundle'])
});

gulp.task('default', ['watch','js-bundle', 'scss-bundle']);

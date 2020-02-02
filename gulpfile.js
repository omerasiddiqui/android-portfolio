const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    print = require('gulp-print').default();

    function style() {
        return gulp.src('./sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./css/'))
            .pipe(browserSync.stream());
    }

    function watch() {
        browserSync.init({
            server: {
                baseDir: './'
            }
        })
        gulp.watch('./sass/**/*.scss', style);
        gulp.watch('/*.html').on('change', browserSync.reload);
        gulp.watch('./js/**/*/.js').on('change', browserSync.reload);
    }


    exports.style = style;
    exports.watch = watch;

// Optimize Images
gulp.task('imagemin', function () {
    return gulp.src('assets/pre-images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/images'))
});


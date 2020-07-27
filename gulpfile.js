const autoprefixer = require('gulp-autoprefixer');
const cached = require('gulp-cached');
const cleancss = require('gulp-clean-css');
const del = require('del');
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const npmdist = require('gulp-npm-dist');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');

// Define paths
const paths = {
    base: {
        base: {
            dir: './'
        },
        node: {
            dir: './node_modules'
        }
    },
    dist: {
        base: {
            dir: './src/main/dist'
        },
        libs: {
            dir: './src/main/resources/static/node_modules'
        }
    },
    src: {
        base: {
            dir: './src/main/resources',
            files: './src/main/resources/**/*'
        },
        css: {
            dir: './src/main/resources/static/css',
            files: './src/main/resources/static/css/**/*'
        },
        html: {
            dir: './src/main/resources/html',
            files: './src/main/resources/html/**/*.html',
        },
        img: {
            dir: './src/main/resources/static/img',
            files: './src/main/resources/static/img/**/*',
        },
        js: {
            dir: './src/main/resources/static/js',
            files: './src/main/resources/static/js/**/*'
        },
        partials: {
            dir: './src/main/resources/html/partials',
            files: './src/main/resources/html/partials/**/*'
        },
        scss: {
            dir: './src/main/resources/static/scss',
            files: './src/main/resources/static/scss/**/*',
            main: './src/main/resources/static/scss/*.scss'
        },
        templates: {
            dir: './src/main/resources/templates',
            files: './src/main/resources/templates/**/*'
        }
    }
};

gulp.task('scss', function() {
    return gulp
        .src(paths.src.scss.main)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.src.css.dir));
});

gulp.task('fileinclude', function(callback) {
    return gulp
        .src([
            paths.src.html.files,
            '!' + paths.src.templates.files,
            '!' + paths.src.partials.files
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(cached())
        .pipe(gulp.dest(paths.src.templates.dir));
});

gulp.task('html', function() {
    return gulp
        .src([
            paths.src.html.files,
            '!' + paths.src.templates.files,
            '!' + paths.src.partials.files
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(replace(/href="(.{0,10})node_modules/g, 'href="$1static/libs'))
        .pipe(replace(/src="(.{0,10})node_modules/g, 'src="$1static/libs'))
        .pipe(useref())
        .pipe(cached())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleancss()))
        .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('clean:tmp', function(callback) {
    del.sync(paths.src.templates.dir);
    callback();
});

gulp.task('clean:dist', function(callback) {
    del.sync(paths.dist.base.dir);
    callback();
});


gulp.task('copy:libs', function() {
    return gulp
        .src(npmdist(), {
            base: paths.base.node.dir
        })
        .pipe(gulp.dest(paths.dist.libs.dir));
});

gulp.task('default', function() {
    gulp.watch(paths.src.scss.main,['scss']);
});

gulp.task('build', gulp.series(gulp.parallel('clean:tmp', 'copy:libs'),gulp.parallel('scss', 'fileinclude')));
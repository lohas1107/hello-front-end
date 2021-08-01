const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const $ = require('gulp-load-plugins')({lazy: false});
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const { config } = require('./config');

function clean() {
    return gulp.src(config.distPath, {
        read: false,
        allowEmpty: true,
    })
        .pipe($.clean());
}

function copyFile() {
    return gulp.src(config.copyPaths, {base: './'})
        .pipe(gulp.dest(config.distPath))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

function layoutHtml() {
    return gulp.src(config.htmlPaths, {base: './'})
        .pipe($.plumber())
        .pipe($.frontMatter())
        .pipe($.layout((file) => {
            return file.frontMatter;
        }))
        .pipe($.rename((file) => {
            file.dirname = file.dirname.split(path.sep)[0];
        }))
        .pipe(gulp.dest(config.distPath))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

function compileSass() {
    const plugins = [
        autoprefixer(),
    ];
    return gulp.src(config.stylePaths, {base: './'})
        .pipe($.sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe($.postcss(plugins))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.distPath))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

function browser() {
    browserSync.init({
        server: {
            baseDir: config.distPath,
        },
        port: 8080,
    });
}

function watch() {
    gulp.watch(config.htmlPaths, gulp.series(layoutHtml));
    gulp.watch(config.ejsPaths, gulp.series(layoutHtml));
    gulp.watch(config.copyPaths, gulp.series(copyFile));
    gulp.watch(config.stylePaths, gulp.series(compileSass));
}

function deploy() {
    return gulp.src(`${config.distPath}/**/*`)
        .pipe($.ghPages());
}

exports.clean = clean;
exports.deploy = deploy;

exports.build = gulp.series(clean, copyFile, layoutHtml, compileSass);
exports.default = gulp.series(clean, copyFile, layoutHtml, compileSass, gulp.parallel(browser, watch));
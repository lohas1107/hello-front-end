const gulp = require('gulp');
const $ = require('gulp-load-plugins')({lazy: false});
const browserSync = require('browser-sync').create();

const staticFiles = [
    "README.md",
    "tools/**/*",
    "resume/**/*",
    "pixel-perfect-kata/**/*",
    "about/**/*",
    "dessert/**/*",
];
const distPath = './dist';

function clean() {
    return gulp.src(distPath, {
        read: false,
        allowEmpty: true,
    })
        .pipe($.clean());
}

function copyFile() {
    return gulp.src(staticFiles, {base: './'})
        .pipe(gulp.dest(distPath))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

function browser() {
    browserSync.init({
        server: {
            baseDir: distPath,
        },
        port: 8080,
    });
}

function watch() {
    gulp.watch(staticFiles, gulp.series(copyFile));
}

function deploy() {
    return gulp.src(`${distPath}/**/*`)
        .pipe($.ghPages());
}

exports.default = gulp.series(clean, copyFile, gulp.parallel(browser, watch));

exports.clean = clean;
exports.build = gulp.series(clean, copyFile);
exports.deploy = deploy;
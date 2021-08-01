let config = {
    copyPaths: [
        // include
        "README.md",
        "tools/**/*",
        "resume/**/*",
        "pixel-perfect-kata/**/*",
        "about/**/*",
        "dessert/**/*",
        "official-website/assets/**/*",

        // exclude
        "!*/views/**/*.html",
        "!*/**/*.ejs",
        "!*/**/*.scss",
        "!*/**/*.sass",
        "!*/**/*.js",
    ],
    htmlPaths: [
        "*/views/**/*.html",
    ],
    ejsPaths: [
        "*/views/**/*.ejs",
    ],
    stylePaths: [
        "*/assets/**/*.scss",
        "*/assets/**/*.sass",
    ],
    distPath: './dist'
};

exports.config = config;
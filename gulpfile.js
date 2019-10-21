var gulp = require("gulp");
var htmlClean = require("gulp-htmlclean")
var imagemin = require("gulp-imagemin")
var connect = require("gulp-connect");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var less = require('gulp-less');


var folder = {
    src: "src/",
    dist: "dist/"
};

var devMod = process.env.NODE_ENV == "development";
console.log(devMod);

gulp.task("html", function(cb) {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + "html/"));
    cb();
});

gulp.task("images", function(cb) {
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/"))
    cb();
});

gulp.task("less", function(cb) {
    var page = gulp.src(folder.src + "less/*")
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(less())
        page.pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })]))
    }
    page.pipe(gulp.dest(folder.dist + "css/"));
    cb();
});

gulp.task("js", function(cb) {
    gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        .pipe(gulp.dest(folder.dist + "js/"));
    cb();
});

gulp.task("server", function(cb) {
    connect.server({
        port: "8080",
        livereload: true
    });
    cb();
});

gulp.task("watch", function(cb) {
    gulp.watch(folder.src + "html/*", gulp.series('html'));
    gulp.watch(folder.src + "js/*", gulp.series('js'));
    gulp.watch(folder.src + "less/*", gulp.series('less'));
    cb();
});


gulp.task("default", gulp.series('html', 'images', 'less', 'js', 'server', 'watch'));
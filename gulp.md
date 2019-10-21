gulp3.0
-------------------------------------------------
var gulp = require("gulp");
var folder = {
    src: "src/",
    dist: "dist/"
}

gulp.task("html", function() {
    gulp.src(folder.src + "html/*")
        .pipe(gulp.dest(folder.dist + "html/"));
});

gulp.task("default",["html"]);
-------------------------------------------------

gulp4.0
--------------------------------------------------
gulp.task("html", function(cb) {
    gulp.src(folder.src + "html/*")
        .pipe(gulp.dest(folder.dist + "html/"));
    cb();
});
gulp.task("default", gulp.series('html'));
----------------------------------------------------
function html(done) {
    gulp.src(folder.src + "html/*")
        .pipe(gulp.dest(folder.dist + "html/"));
    done();
}
exports.default = gulp.series(html);

-----------------------------------------------------

gulp插件

gulp-htmlmin

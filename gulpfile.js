var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var clean = require("gulp-clean");
var del = require("del");
var plumber = require("gulp-plumber");


gulp.task("process-styles", function (){
  gulp.src([
    "src/**/*.scss",
    "!src/**/*tmp*.scss"
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())

    .pipe(sourcemaps.write("."))
    .pipe(plumber.stop())
    .pipe(gulp.dest("dist"))
});

gulp.task("process-scripts", function (){
  gulp.src(["src/**/*.js"])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({modules: "amd", optional: ["es7.classProperties"], blacklist: ["useStrict"]}))
    .pipe(sourcemaps.write("."))
    .pipe(plumber.stop())
    .pipe(gulp.dest("dist"));
});


gulp.task("process-html", function (){
  gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist"));
});

gulp.task("clean", function(cb) {
  del(["dist/"], cb);
});

gulp.task("default", ["clean"], function () { //Build for deployment.
  gulp.start( "process-scripts", "process-styles", "process-html");
});

gulp.task("watch", function () {
  gulp.watch("src/**/*.js", ["process-scripts"]);
  gulp.watch("src/**/*.scss", ["process-styles"]);
  gulp.watch("src/**/*.html", ["process-html"]);
});

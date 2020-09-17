var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("autoprefixer", function (done) {
  gulp
    .src("css/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("css"));
  done();
});

gulp.task("sass", function (done) {
  gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());

  done();
});

gulp.task("serve", function (done) {
  browserSync.init({
    server: "",
  });

  gulp.watch("scss/*.scss", gulp.series("sass"));
  gulp.watch("*.html").on("change", () => {
    browserSync.reload();
    done();
  });

  done();
});

gulp.task("default", gulp.series("sass", "autoprefixer", "serve"));

const gulp = require("gulp");
const less = require("gulp-less");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const del = require("del");

// пути к изначальным файлам и файлам назначения
const paths = {
  styles: {
    src: "src/styles/**/*.less",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
};

// очистка папки dist
const clean = () => {
  return del(["dist"]);
};

const styles = () => {
  return gulp
    .src(paths.styles.src) // ~ пути "src/styles/**/*.less"
    .pipe(less())
    .pipe(cleanCss())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
};

const scripts = () => {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
};

const watch = () => {
  gulp.watch(paths.styles.src, styles); // отслеживает путь и вносит изменения в задачу(styles)
  gulp.watch(paths.scripts.src, scripts); // отслеживает путь и вносит изменения в задачу(scripts)
};

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch); // выполняется очистка clean, далее параллельно вып-ся изменение стилей и скриптов(styles и scripts), затем watch(который отслеживает изменение стилей и скриптов и при необходимости перекомпилирует все скрипты scripts)

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;

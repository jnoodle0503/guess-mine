import gulp from "gulp";
import sass from "gulp-sass";

const paths = {
  styles: {
    src: "assets/scss/styles.scss", // 변환할 파일이 있는 경로
    dest: "src/static/styles", // 변환한 파일이 저장되는 목적지 경로와 경로에 생성될 파일명
  },
};

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));
}

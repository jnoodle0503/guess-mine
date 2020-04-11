import gulp from "gulp";
import sass from "gulp-sass"; // gulp 에서 scss 파일을 css 로 변환해주기 위함
import autoprefixer from "gulp-autoprefixer"; // 여러가지 브라우저의 스타일 호환성을 도와줌
import minifyCSS from "gulp-csso"; // 변환된 파일을 한줄로 간단하게 만들어줌
import del from "del";
import bro from "gulp-browserify"; // 프론트엔드 자바스크립트에서 ES6 문법을 사용하게 해줌
import babel from "babelify"; // browserify 와 함께 쓰여야함

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss", // 컴파일 할 파일이 있는 경로
    // 컴파일한 파일이 저장되는 목적지 경로 (없으면 해당 경로까지의 폴더 등을 생성한다)
    // 해당 경로안에 컴파일되어 생성될 파일은 컴파일을 진행한 파일의 이름과 같아진다
    // ex) styles.scss (컴파일)=> styles.css
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js",
  },
};

const clean = () => del(["src/static"]);

/*
// package.json 의 스크립트에서 사용할땐 gulp 명령어 다음에 실행할 함수명을 써주면 된다
// 그 함수는 export 되어있어야한다
// 예를 들어, gulp styles
*/

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        // autoprefixer 설정
        broswers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      // 프론트엔드 자바스크립트에서 ES6 문법을 사용하게 해주는 코드
      bro({
        transform: [
          babel.configure({
            presets: ["@babel/preset-env"],
          }),
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

// gulp.series 함수는 차례대로 실행될 함수를 인자값으로 갖는다
const dev = gulp.series(clean, styles, js, watchFiles);

export const build = gulp.series(clean, styles, js);

// package.json 의 스크립트에서 사용할 함수이며, export default 로 설정된 함수는 gulp 명령어 뒤에 따로 함수명을 적지않아도 된다
// 즉, gulp 만 써주면 된다
export default dev;

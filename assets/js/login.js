import { initSockets } from "./sockets";

// 요소 객체화
const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

// 로그인 확인 검사와 로컬 스토리지에 닉네임 등록을 위한 상수
const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

// 로컬 스토리지에 등록된 nickname 값 가져옴
const nickname = localStorage.getItem(NICKNAME);

// 로그인 후, 소켓 연결과 setNickname 이벤트 발생
const logIn = (nickname) => {
  // eslint-disable-next-line no-undef
  const socket = io("/");
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

// 로그인 확인 검사
if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

// 로그인 폼 submit 처리 함수
const hadleFormSubmit = (e) => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  logIn(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", hadleFormSubmit);
}

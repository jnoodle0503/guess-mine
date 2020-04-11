import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => (socket = aSocket);

// 전체 프론트엔드 소켓 이벤트 모음
// 각 소켓 이벤트 컨트롤은 각각의 파일에서 컨트롤
export const initSockets = (aSocket) => {
  const { events } = window;
  updateSocket(aSocket);
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMsg, handleNewMessage);
};

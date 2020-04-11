import events from "./events";

const socketController = (socket) => {
  const broadcast = (event, data) => {
    socket.broadcast.emit(event, data);
  };

  // 클라이언트쪽에서 보낸 닉네임 값 받음
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname; // socket 객체에 nickname 값 설정
    broadcast(events.newUser, { nickname }); // newUser 이벤트 발생 (닉네임 값 전달)
  });

  // 클라이언트쪽 연결 끊어짐
  socket.on(events.disconnect, () => {
    // disconnected 이벤트 발생 (닉네임 값을 전체 클라이언트들에 전달)
    broadcast(events.disconnected, { nickname: socket.nickname });
  });

  // 클라이언트쪽에서 보낸 메세지 값 받음
  socket.on(events.sendMsg, ({ message }) =>
    // newMsg 이벤트 발생 (메세지 값과 닉네임 값을 전체 클라이언트들에 전달)
    broadcast(events.newMsg, { message, nickname: socket.nickname })
  );

  // 클라이언트쪽에서 보낸 x, y 값(캔버스 안에서의 마우스 좌표) 값 받음
  socket.on(events.beginPath, ({ x, y }) =>
    // benganPath 이벤트 발생 (x 값과 y 값을 전체 클라이언트들에 전달)
    broadcast(events.beganPath, { x, y })
  );

  // 클라이언트쪽에서 보낸 x, y 값(캔버스 안에서 마우스좌표에따라 그려지는 선) 값 받음
  socket.on(events.strokePath, ({ x, y, color }) => {
    // strokedPath 이벤트 발생 (x 값과 y 값을 전체 클라이언트들에 전달)
    broadcast(events.strokedPath, { x, y, color });
  });

  // 클라이언트쪽에서 보낸 color 값(캔버스 전체를 채우는 색깔 : 페인트칠같은 역할)값 받음
  socket.on(events.fill, ({ color }) => {
    // filled 이벤트 발생 (color 값을 전체 클라이언트에 전달)
    broadcast(events.filled, { color });
  });
};

export default socketController;

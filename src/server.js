import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.use(logger("dev"));

app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () =>
  console.log(`✅ Server Running: http://localhost:${PORT}`);

// server 변수에 서버를 넣어줌...?
const server = app.listen(PORT, handleListening);

// socket.io 에게... 이 서버를 잡고 있어!!!
const io = socketIO.listen(server);

// 소켓 연결 시작
// socketController 에서 실질적인 소켓 기능들을 컨트롤함
io.on("connection", (socket) => socketController(socket));

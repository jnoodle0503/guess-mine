import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.use(logger("dev"));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`✅ Server Running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

// socket.io 에게... 이 서버를 잡고 있어!!!
const io = socketIO.listen(server);

io.on("connection", (socket) => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon",
    });
  });

  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});

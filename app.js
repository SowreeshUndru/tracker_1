const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
app.set("view engine", "ejs");
app.use(express.static("public"));
const server = http.createServer(app);
const dotenv=require("dotenv").config();

const io = socketio(server);
io.on("connection", function (socket) {
    console.log("connected");
  socket.on("user-location",function(data){
    io.emit("r-location",{id:socket.id,...data});
    console.log(socket.id);
  });
});

app.get("/", function (req, res) {
    res.render("index");
})
const port=process.env.PORT||3000;
server.listen(`${port}`, "0.0.0.0", function (err) {
    if (err) console.log(err);
    else console.log("server is runninng on port 3000");
});

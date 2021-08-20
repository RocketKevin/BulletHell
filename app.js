const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

app.use("/", express.static(path.join(__dirname, "src")));

// io.on("connection", (socket) => {
//     console.log("a user has connected to the server. New socket created.");
//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     })
//     io.emit("chat message", "You are very good at sockets.")
//     socket.on("chat message", function (msg) {
//         console.log(msg);
//     })
//     // socket.on("chat message", (msg) => {
//     //     //send message received from one client to all other clients.
//     //     io.emit("chat message", msg);
//     // })
// })


server.listen(3001, () => {
    console.log("listening on port 3001");
})

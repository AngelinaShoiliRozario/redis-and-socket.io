const path = require("path");

// express imports
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// redis imports
const redis = require("redis");
const client = redis.createClient();

// socket imports
const { Server } = require("socket.io");
const io = new Server(server);

// redis connections
(async () => {
  await client.connect();
})();

// load values from the .env file in this directory into process.env
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views" + "/index.html"));
});

app.get("/set_value", async (req, res) => {
  let success = await client.set("sad", "shoili");
  if (success) {
    res.send("successfully set value");
  } else {
    res.send("failed to set value");
  }
});

app.get("/get_value", async (req, res) => {
  let data;
  data = await client.get("sad");
  if (data) {
    res.send(data);
  } else {
    res.send("failed to get value");
  }
});

app.get("/del_value", async (req, res) => {
  let success;
  success = await client.del("sad");
  if (success) {
    res.send("deleted value");
  } else {
    res.send("failed to delete");
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", async (msg) => {
    let success = await client.set("sad", "shoili");
    if (success) {
      console.log("message sent to redis: " + msg);
    } else {
      console.log("message sending failed to redis");
    }
    io.emit("emitted message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
// should use server not app as server has been configured for socket io
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

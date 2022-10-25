const path = require("path");
const express = require("express");
const app = express(); // create express app
// add middlewares
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));
app.use((req, res, next) => {
  const uniqueLabel = Math.random().toString(36).substring(2, 10);
  const timeLabel = `handleRequest ${req.originalUrl} label: ${uniqueLabel}`;
  console.time(timeLabel);
  res.sendFile(path.join(__dirname, "build", "index.html"));
  console.timeEnd(timeLabel);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started on port " + port);
});

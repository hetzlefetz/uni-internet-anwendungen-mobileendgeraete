let mediaItems = require("./mediaitems.json");
const express = require("express");
const app = express();
const port = 8001;

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Content-Type", "application/json");

  next();
});

app.post("/mediaitems", async (req, res) => {
  var newItem = req.body;
  if (!newItem || newItem.id) {
    res.statusCode = 400;
    res.end();
    return;
  }
  newItem.id = new Date().getTime();
  mediaItems.push(newItem);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: newItem }));
  return;
});
app.get("/mediaitems", async (req, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify({ data: mediaItems }));
  return;
});
app.get("/mediaitems/:id", async (req, res) => {
  let id = req.params.id;
  var mediaItem = mediaItems.find((x) => x.id == id);
  if (!mediaItem) {
    res.statusCode = 404;
    res.end();
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ data: mediaItem }));
  return;
});
app.put("/mediaitems/:id", async (req, res) => {
  var oldMediaItemIdx = mediaItems.findIndex((x) => x.id == req.params.id);
  if (oldMediaItemIdx == -1) {
    res.statusCode = 404;
    res.end();
    return;
  }
  mediaItems[oldMediaItemIdx] = req.body;
  res.statusCode = 200;
  res.end(JSON.stringify({ data: 1 }));
  return;
});
app.delete("/mediaitems/:id", async (req, res) => {
  var oldMediaItemIdx = mediaItems.findIndex((x) => x.id == req.params.id);
  if (oldMediaItemIdx == -1) {
    res.statusCode = 404;
    res.end();
    return;
  }
  mediaItems.splice(oldMediaItemIdx, 1);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: 1 }));
  return;
});

app.listen(port, () => {});

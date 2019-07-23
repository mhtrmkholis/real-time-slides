const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

let currentSlideIndex = 0;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(function(req, res, next) {
  req.io = io;
  next();
});

app.patch('/current-slide-index', function(req, res, next) {
  currentSlideIndex = req.body.currentSlideIndex;
  io.emit('change-current-slide-index', currentSlideIndex);

  res.json({ currentSlideIndex });
});

server.listen(port, function() {
  console.log('Listening on port', port);
});

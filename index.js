const express = require('express');
const app = express();
app.set('port', 5000);
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/messages', (req, res) => {
  io.emit('chat message')
})

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

server.listen(5001, () => {
  console.log('listening on *:5001');
});
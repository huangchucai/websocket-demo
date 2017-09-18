var express = require('express');
var name = require('./lib/name.js').name;
var axios = require('axios');
var APP_KEY = '9ec33ae01b9443a794aefb6d5ee4d9e8'

var app = express();
var server = require('http').createServer(app);

var random = null;
var io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('chat' ,(user, data) => {
    // socket.emit('chat-from-server', `Say: ${data}`)
    // socket.broadcast.emit('chat-from-server', `Say: ${data}`)
    if(/小才/.test(data)) {
      axios.post('http://www.tuling123.com/openapi/api', {
        "key" : APP_KEY,
        "info": data,
        "userid": "123456"
      }).then(res => {
        io.sockets.emit('chat-from-server', `小才: ${res.data.text}`)
      })
    }
    if(!random) {
      random = Math.floor((name.length) * Math.random())
    }
    io.sockets.emit('chat-from-server', `${user}: ${data}`)
  })
})


app.use(express.static('./public'))
server.listen(4000)

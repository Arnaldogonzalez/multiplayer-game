const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('static'));

module.exports = io;

require('./connection.js').initialize();

http.listen(3003, ()=>console.log('server listening....'));

var io = require('./server.js');
const players = require('./connection')
const ball = {
  x: 200,
  y: 200,
  velX: 3,
  velY: 4
}

module.exports = {
    initializeBall: function(socket){
        socket.on("player move", function(socketMsg){
            socket.x = socketMsg.x;
            socket.y = socketMsg.y;
            var trimmedPlayers = {};
            for(let socket in players){
                trimmedPlayers[socketid] = {
                    x: players[socketid].x,
                    y: players[socketid].y
                }
            }
            socket.broadcast.emit("player move", trimmedPlayers);
        });
    },
    initializeBall: function(){
        io.emit("ball created", ball);
        if(interval){
            clearInterval(interval);
            ball.x = 200;
            ball.y = 200;
        }
        interval = setInterval(function(){
            ball.x += ball.velX;
            ball.y += ball.velY;
            io.emit("ball moved", ball);
        }, 50);
    }
}

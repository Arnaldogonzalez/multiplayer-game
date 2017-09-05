var io = require('./server.js');
const players = require('./connection.js').players;
const ball = {
  x: 200,
  y: 300,
  velX: 8,
  velY: 8
}
let intervalball;
let leftcont = 0;
let rightcont = 0;

module.exports = {
  initializeSocket: function (socket){
    socket.on('player move', function(socketMsg){
      socket.x = socketMsg.x;
      socket.y = socketMsg.y;
      var trimmedPlayers = {};
     for(let socketid in players){
        trimmedPlayers[socketid] = {
          x: players[socketid].x,
          y: players[socketid].y,
        }
      }
      socket.broadcast.emit('player move',trimmedPlayers );
    });
  },
  initializeBall: function(){
    io.emit('ball created', ball);
     leftcont = 0;
     rightcont = 0;
    if(intervalball){
      clearInterval(intervalball);
      ball.x = 200;
      ball.y = 200;
    }
     intervalball = setInterval(function () {
      ball.x += ball.velX;
      ball.y += ball.velY;
        if( (ball.y<=0) || (ball.y+10) >= 400 ){
          ball.velY *= -1;
        }
        if( (ball.x+10) >= 600){
          leftcont++;
          ball.velX *= -1;
        }
         if(ball.x<=0){
           rightcont++;
          ball.velX *= -1;
        }
        for(var playerid in players){
          var between = (players[playerid].y <= (ball.y+10)) && ( (players[playerid].y+100) >= ball.y);
          var leftpaddle =  (ball.x <= players[playerid].x+10) && players[playerid].x < 100;
           var rightpaddle =  ((ball.x) >= players[playerid].x) && players[playerid].x >200;
          if((between && leftpaddle) || (between && rightpaddle)) {
            ball.velY*=1.1;
            ball.velX*=1.1;
            ball.velX *= -1;
            if(leftpaddle) ball.x = players[playerid].x+10;
            if(rightpaddle) ball.x = players[playerid].x-10;
          }
        }
        GameOver();
      io.emit('ball moved', {ball:ball, leftcont:leftcont, rightcont:rightcont})
    }, 75);
  },
}
function GameOver(){
  var leftsocket, rightsocket;
  for(var socketid in players){
    if(players[socketid].x < 100){
      leftsocket=players[socketid];
    }
    else{
      rightsocket=players[socketid];
    }
  }
  if(leftcont===10){
    rightsocket.emit('game over', 'You Win')
    leftsocket.emit('game over', 'You Lost')
  }
  if(rightcont===10){
    leftsocket.emit('game over', 'You Win')
    rightsocket.emit('game over', 'You Lost')
  }
}

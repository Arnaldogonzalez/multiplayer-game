var io = require('./server.js');
var players = {};
const spectators = {};
const Num_Players = 2;


module.exports = {
  initialize: function () {
      io.on('connection', function(socket){
        var numSockets = Object.keys(players).length;
        let player = false;
        if(numSockets<Num_Players) player = true;
        console.log(`A ${player?'player': 'spectators'} has connect: `, socket.id);

        if(player){
          players[socket.id] = socket;
          var opp = null;
          for(var i in players){
            if(i!=socket.id){
              opp = players[i]
            }
          }
          socket.player = true;
          socket.x = 20;
          socket.y = 100;
          if(opp && opp.x === 20){
            socket.x = 560;
          }
          console.log(players);
          socket.emit('player created',{x: socket.x, y: socket.y})
          if(Object.keys(players).length === Num_Players){
            require('./gameEvents.js').initializeBall();
          }
        }
        else{
          spectators[socket.id]=socket;
          socket.player = false;
        }
        require('./gameEvents.js').initializeSocket(socket);

        socket.on('disconnect', handleDisconnection);
      });
  },
  players: players
}

function handleDisconnection(){
  console.log('User disconnecting: ', this.id);
  if(players) return delete players[this.id];
  delete spectators[this.id];
};

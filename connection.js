var io = require('./server.js');
const players = {};
const spectators = {};
const NUM_PLAYERS = 2;
// var gameEvents = require('./gameEvents.js');

module.exports ={
  initialize: function(){
    io.on('connection', function(socket){
      var numSockets = Object.keys(players).length;
      let player = false;
      if(numSockets < NUM_PLAYERS) player = true;
      console.log(`A ${player?'player':'spectator'} has connected:`, socket.id);

      if(player){
        players[socket.id] = socket;
        socket.player = true;
        socket.x = 100;
        socket.y = 100;
        if(numSockets === NUM_PLAYERS-1){
          gameEvents.initializeBall();
        }
      }
      else{
        spectator[socket.id] = socket;
        socket.player = false;
      }
      require('./gameEvents.js').initializeSocket(socket);
      socket.on("disconnect", handleDisconnection);
    });
  },
  players: players
}

function handleDisconnection(){
    console.log("User disconnecting:", this.id);
    if(players) return delete players[this.id];
    delete spectators[this.id];
}

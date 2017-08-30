const paddle = function(x, y, ctx, c){
  this.x = x;
  this.y = y;
  this.velY = 0;
  this.ctx = ctx;
  this.c = c;
  var self = this;
  document.addEventListener("keydown", function(e){
    console.log(e.keyCode);
    if(e.keyCode === 38).paddle.direction = "up";
    else if(e.keyCode === 40).paddle.direction = "down";
  });
  document.getElementById("keyup", function(e){
    if(e.keyCode === 38 || e.keyCode === 40) paddle.direction === null;
  });
}

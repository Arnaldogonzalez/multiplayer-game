const paddle = function(x, y, ctx,c){
  this.x = x;
  this.y = y;
  this.velY = 0;
  this.ctx = ctx;
  this.c = c;
  var self = this;
  window.addEventListener('keydown', function(e){
    //console.log(e.keyCode);
     if (e.keyCode === 40){
     self.velY = 15;
     }
     if (e.keyCode === 38){
     self.velY = -15;
     }
  });
  window.addEventListener('keyup', function(e){
    if(e.keyCode === 40 || e.keyCode === 38){
      self.velY = 0;
    }
  });
}
paddle.prototype.update = function(){
   this.y += this.velY;
   if(this.y < 2){
     this.y = 2;
   }
   if((this.y + 100) > this.c.height){
     this.y = this.c.height - 102;
   }
};

paddle.prototype.render = function(){
  this.ctx.fillStyle = "#000000";
  this.ctx.strokeRect(this.x, this.y, 10, 100);
};

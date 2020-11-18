function Player(x, y) {
  this.x = x;
  this.y = y;
  this.xspeed = 0;
  this.yspeed = 0;
  this.friction = 0.9;
  this.maxSpeed = 15;
  this.width = 50;
  this.height = 50;
  this.active = true;
  this.step = function() {
    if(this.active) {
      // Horizontal movement
      if(!leftKey && !rightKey) {
        this.xspeed *= this.friction;
      } else if(rightKey) {
        this.xspeed++;
      } else if(leftKey) {
        this.xspeed--;
      }
      // Vertical Movement
      if(upKey) {
        this.yspeed -= 15;
      }
      this.yspeed += 5;
      if(this.xspeed > this.maxSpeed) {
        this.xspeed = this.maxSpeed;
      } else if(this.xspeed < -this.maxSpeed) {
        this.xspeed = -this.maxSpeed;
      }
      if(this.yspeed > this.maxSpeed) {
        this.yspeed = this.maxSpeed;
      } else if(this.yspeed < -this.maxSpeed) {
        this.yspeed = -this.maxSpeed;
      }
      if(this.xspeed > 0) {
        this.xspeed = Math.floor(this.xspeed);
      } else {
        this.xspeed = Math.ceil(this.xspeed);
      }
      if(this.yspeed > 0) {
        this.yspeed = Math.floor(this.yspeed);
      } else {
        this.yspeed = Math.ceil(this.yspeed);
      }
      let horizontalRect = {
        x: this.x + this.xspeed,
        y: this.y,
        width: this.width,
        height: this.height
      }
      let verticalRect = {
        x: this.x,
        y: this.y + this.yspeed,
        width: this.width,
        height: this.height
      }
      for(let i = 0; i < borders.length; i++) {
        let borderRect = {
          x: borders[i].x,
          y: borders[i].y,
          width: borders[i].width,
          height: borders[i].height
        }
        if(checkIntersection(horizontalRect, borderRect)) {
          while(checkIntersection(horizontalRect, borderRect)) {
            horizontalRect.x -= Math.sign(this.xspeed);
          }
          this.x = horizontalRect.x;
          this.xspeed = 0;
        }
        if(checkIntersection(verticalRect, borderRect)) {
          while(checkIntersection(verticalRect, borderRect)) {
            verticalRect.y -= Math.sign(this.yspeed);
          }
          this.y = verticalRect.y
          this.yspeed = 0;
        }
      }
      this.x += this.xspeed;
      this.y += this.yspeed;
    }
  }

  this.draw = function() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

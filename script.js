// Variables
let canvas;
let ctx;
let upKey;
let downKey;
let rightKey;
let leftKey;
let gameLoop;
let player;
let borders = [];
window.onload = function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  setupInputs();
  player = new Player(50, 200);
  for(let i = 0; i < 6; i++) {
    borders.push(new Border(0 + 100*i, 460, 100, 100, 1))
  }
  borders.push(new Border(0, 360, 100, 100, 2));
  for(let i = 0; i < 3; i++) {
    borders.push(new Border(600, 260 + 100*i, 100, 100, 2));
  }
  gameLoop = setInterval(step, 1000/30);
}

function step() {
  player.step();
  draw();
}

function draw() {
  // Clears canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 550);
  player.draw();
  for(let i = 0; i < borders.length; i++) {
    borders[i].draw();
  }
}

function setupInputs() {
  document.addEventListener('keydown', function(e) {
    if(e.key == 'w' || e.key == 'ArrowUp') {
      upKey = true;
    } else if(e.key == 'a' || e.key == 'ArrowLeft') {
      leftKey = true;
    } else if(e.key == 's' || e.key == 'ArrowDown') {
      downKey == true;
    } else if(e.key == 'd' || e.key == 'ArrowRight') {
      rightKey = true;
    }
  });
  document.addEventListener('keyup', function(e) {
    if(e.key == 'w' || e.key == 'ArrowUp') {
      upKey = false;
    } else if(e.key == 'a' || e.key == 'ArrowLeft') {
      leftKey = false;
    } else if(e.key == 's' || e.key == 'ArrowDown') {
      downKey == false;
    } else if(e.key == 'd' || e.key == 'ArrowRight') {
      rightKey = false;
    }
  });
}

function checkIntersection(r1, r2) {
  if(r1.x > r2.x + r2.width) {
    return false;
  } else if(r1.x + r1.width <= r2.x) {
    return false;
  } else if(r1.y > r2.y + r2.height) {
    return false;
  } else if(r1.y + r1.height <= r2.y) {
    return false;
  } else {
    return true;
  }
}

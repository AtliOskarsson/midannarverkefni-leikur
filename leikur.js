let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let img;
let max = 0;

let width = canvas.width = window.innerWidth - 13;
let height = canvas.height = window.innerHeight - 20;

// function to generate random number

function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

let image = new Image();
image.src = 'images/asteroidmirror.png'
let earth = new Image();
earth.src = 'images/player-earth.png';
let jupiter = new Image();
jupiter.src = 'images/jupiter.png'

function Player(x, y, vel) {
  this.x = x;
  this.y = y;
  this.vel = 0;
}

Player.prototype.draw = function() {
  ctx.drawImage(earth, this.x, this.y, 35, 35);
  ctx.beginPath();
  ctx.fill();
};

Player.prototype.update = function() {

  this.x += 0.1;
  this.y += 0.1;
  console.log(this.x)
}

// define Ball constructor

function Ball(x, y, velX, velY, size, eyda) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.size = size;
  this.eyda = eyda;
}

// define ball draw method

Ball.prototype.draw = function() {
  ctx.drawImage(image, this.x-15, this.y-15, this.size*2, this.size*2)
  ctx.beginPath();
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.eyda = 1;
  }

  if((this.x - this.size) <= -17) {
    this.eyda = 1;
  }

  if((this.y + this.size) >= height) {
    this.eyda = 1;
  }

  if((this.y - this.size) <= 0) {
    this.eyda = 1;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        //balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store balls
let balls = [];

// define loop that keeps drawing the scene constantly
man = new Player(150, 150, 50)

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0,0,width,height);
  ctx.drawImage(jupiter, 30, 50);
  ctx.font = '90px Algerian';
  ctx.fillStyle = 'green';
  ctx.fillText(Math.round(max, 1), width-150, 70)
  while(balls.length < max) {
    let ball = new Ball(
      random(0,width),
      20,
      random(-3,4),
      random(1,7),
      random(9,19),
    );
    balls.push(ball);
  }
  man.draw();
  man.update();
  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    if (balls[i].eyda === 1){
      balls.splice(i, 1)
    };
  }
  // Hægt og rólega leyfir fleiri object að vera til
  max += 0.01;
  requestAnimationFrame(loop);
}



loop();
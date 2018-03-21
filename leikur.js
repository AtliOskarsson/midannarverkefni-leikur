let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let img;

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
    this.velX = -(this.velX);
    this.eyda = 1;
  }

  if((this.x - this.size) <= -17) {
    this.velX = -(this.velX);
    this.eyda = 1;
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
    this.eyda = 1;
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
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

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0,0,width,height);
  ctx.drawImage(jupiter, 30, 50)
  while(balls.length < 25) {
    let ball = new Ball(
      random(0,width),
      20,
      random(-5,5),
      random(1,7),
      random(9,19),
    );
    balls.push(ball);
  }
  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    if (balls[i].eyda === 1){
      balls.splice(i, 1)
    };
  }

  requestAnimationFrame(loop);
}



loop();
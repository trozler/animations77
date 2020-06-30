const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function rand(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//Modelling the ball, creating constructor
class Ball {
  constructor(x, y, velx, vely, color, size) {
    this.x = x; //Where ball starts on the screen. 0 top left
    this.y = y;
    this.velx = velx; //These are the vakues regularraly added to the x/y coordinate values when we animate the balls.
    this.vely = vely;
    this.color = color;
    this.size = size; //radius.
  }
  //Function draws a ball on screen
  //CTx is lik the canvas or paper.
  draw() {
    ctx.beginPath(); //Want tp draw a shape.
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //Trace an arc shape.

    //x and y are center, size = radius, last 2 parameters equal number of degrees around circle we draw.
    ctx.fill();
  }
  //Updating the ball.
  //If reach edge of canvas reverse velocty and make balls travel in opposite direction.
  update() {
    if (this.x + this.size >= width) {
      this.velx = -this.velx;
    }
    if (this.x - this.size <= 0) {
      this.velx = -this.velx;
    }
    if (this.y + this.size >= height) {
      this.vely = -this.vely;
    }
    if (this.y - this.size <= 0) {
      this.vely = -this.vely;
    }
    this.x += this.velx;
    this.y += this.vely;
  }
  //Check if the ball has collided with every other ball.
  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        //Dont check if ball collided with itself.
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color =
            "rgb(" +
            rand(0, 255) +
            "," +
            rand(0, 255) +
            "," +
            rand(0, 255) +
            ")";
        }
      }
    }
  }
}

//Creating balls to add to the canvas.
let balls = [];
while (balls.length < 20) {
  const size = rand(10, 20);
  let ball = new Ball(
    rand(0 + size, width - size),
    rand(0 + size, height - size),
    rand(-7, 7),
    rand(-7, 7),
    "rgb(" + rand(0, 255) + "," + rand(0, 255) + "," + rand(0, 255) + ")",
    size
  );
  balls.push(ball);
}

//Animation loop
function loop() {
  ctx.fillStyle = "rgba(2, 2, 43, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}

//Execute code.
loop();

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

function draw() {
  background(0);
  noFill();
  stroke(100, 100, 240);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(250, 250, 250);
}

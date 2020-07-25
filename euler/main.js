var speed = 0;
var strum = 1;
var centerX = 450;
var centerY = 215;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(250);

  // sketchCircle();
  // sin(frequency) * amplitude + center.
  let y_revolve = sin(frameCount / 50) * 58 + centerY;
  let x_revolve = cos(frameCount / 50) * 58 + centerX;

  beginShape(POINTS);
  strokeWeight(10);
  stroke("#ef798a");
  noFill();
  vertex(x_revolve, y_revolve);
  endShape();

  //Draw circle
  strokeWeight(1);
  stroke(47, 72, 88);
  ellipse(centerX, centerY, 115);
  line(centerX, centerY, x_revolve, y_revolve);

  // sketchWave();
  stroke(47, 72, 88);
  noFill();
  beginShape();

  //vertex(0, height);
  //x < 250 means we stop rendering wave at 250 pixels.
  //So for every pixel up to this point we find the corresponding point.

  for (let x = 0; x < 250; x++) {
    let freq = speed + x * 0.05;
    //Map -1 and 1 amplitudes to amplitudes in range 150px and 280px.
    let y = map(sin(freq), -strum, strum, 150, 280);
    vertex(x, y);
  }
  //Gives us line to extend
  vertex(x_revolve, y_revolve);
  endShape();
  speed += 0.02;
}

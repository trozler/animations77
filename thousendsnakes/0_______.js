function setup(){
	createCanvas(400, 400);
}


// let color = [random(255), random(100,200), random(100)]
let r = 255;
let g = 255;
let b = 255;
    
function draw() {
  
  fill(g, r, b);
  ellipse(mouseX, mouseY, 80, 80);
}


setInterval(() => {
  r = random(255);
  g = random(100, 200);
  b = random(100);
  }, 5000)

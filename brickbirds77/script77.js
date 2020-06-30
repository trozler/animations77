var myGamePiece;
var myObstacles = [];
var myScore;
var level = 0;
var hardness = 130 * 9; //Every 130 frames we create a new obstacke. And evey 9 obstacles we increase hardness.

document.addEventListener("keyup", function (e) {
  e.view.event.preventDefault();
  if (e.key === " ") {
    myGamePiece.gravity = 0.05;
  }
});

document.addEventListener("keydown", function (e) {
  e.view.event.preventDefault();
  if (e.key === " ") {
    myGamePiece.gravity = -0.25;
  }
});

// Create an event listner which removes itself as soon as called.

document
  .getElementById("canvas")
  .addEventListener("click", function fireOnce(e) {
    startGame();
    document.getElementById("canvas").removeEventListener("click", fireOnce);
  });

var myGameArea = {
  canvas: document.getElementById("canvas"),
  start: function () {
    //The function which calls start will be the thgis. So allproperties are set for that object.
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    // updateGameArea is next function
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    // Earases pixels in a rectangualar area by setting them to transparent black.
    // (x, y) is the top corner. Then width and rectangel.
    // Earsing entier canavs is requierd at the start of each frame in animation.
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function startGame() {
  myObstacles = [];
  myScore = 0;
  level = 0;
  hardness = 130 * 9;

  // Creating red square
  myGamePiece = new objComponent(30, 30, "rgba(70, 102, 204, 0.87)", 10, 10);
  myGamePiece.gravity = 0.05; //Every 20 frames y coordinate will increase by gravity.
  // Top left canvas is (0, 0).
  myScore = new textComponent("20px", "Consolas", "whitesmoke", 380, 30);
  myGameArea.start();
}

function textComponent(size, font, color, x, y) {
  this.score = 0;
  this.size = size;
  this.font = font;
  this.x = x;
  this.y = y;
  this.text = "";
  this.lvl = "";
  //   Set update property equal to a function. So when call update, we are calling a function.
  //   Update function draws rectangel and updates score.
  this.update = function () {
    var ctx = myGameArea.context;
    // Writing score on canvas. Always need to retrieve context.
    ctx.font = this.size + " " + this.height;
    ctx.fillStyle = color;
    ctx.fillText(this.text, this.x, this.y);
    ctx.fillText(this.lvl, this.x, this.y + 20);
  };
}

// We should think of componet much in the same way we think of a class:
// It has a constriucor, properties and methods.
function objComponent(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0; //cumulator of how many time we press up or down.

  //   Set update property equal to a function. So when call update, we are calling a function.
  //   Update function draws rectangel and updates score.
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.newPos = function () {
    this.gravitySpeed += this.gravity;
    this.y += this.gravitySpeed;
  };

  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      //Evaluate 1 objet at a time and we have 2 types of object. Upward vs downward.
      mytop > 0 &&
      mybottom < myGameArea.canvas.height &&
      (mybottom < othertop ||
        mytop > otherbottom ||
        myright < otherleft ||
        myleft > otherright)
    ) {
      crash = false;
    }
    return crash;
  };
}

function updateGameArea() {
  var height, gap, minHeight, maxHeight, minGap, maxGap;

  for (let i = 0; i < myObstacles.length; i++) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      var flag = false;
      var highscore = localStorage.getItem("highscore");
      if (highscore !== null) {
        if (myGameArea.frameNo > highscore) {
          localStorage.setItem("highscore", myGameArea.frameNo);
          flag = true;
        }
      } else {
        localStorage.setItem("highscore", myGameArea.frameNo);
        flag = true;
      }
      drawCircle();
      var go_again = new textComponent(
        "20px",
        "Consolas",
        "whitesmoke",
        180,
        110
      );
      go_again.text = "Go again looser";
      go_again.update();

      if (flag) {
        go_again.text = "New Highscore: " + myGameArea.frameNo;
      } else {
        go_again.text = "Highscore: " + highscore;
      }
      go_again.y += 28;
      go_again.update();

      // Last thing method does is clear interval and add event listener.
      //Then function returns, and nothing is executing, as function is executed async on an interval.
      document
        .getElementById("canvas")
        .addEventListener("click", function fireOnce(e) {
          clearInterval(myGameArea.interval);
          myGameArea.clear();
          startGame();
          document
            .getElementById("canvas")
            .removeEventListener("click", fireOnce);
        });

      return; //Game stops never clear canvas for next frame.
    }
  }
  // Clears canvas for next frame.
  myGameArea.clear();
  // Next frame.
  myGameArea.frameNo++;
  // Only create obstacles every 150 frames.
  if (myGameArea.frameNo == 1 || myGameArea.frameNo % 130 == 0) {
    //Every 9 obstacles decrease by fcator of 10.
    if (myGameArea.frameNo % hardness == 0) {
      level++;
      if (level == 19) {
        drawCircle();
        var go_again = new textComponent(
          "20px",
          "Consolas",
          "whitesmoke",
          180,
          110
        );
        go_again.text = "Nice now stop.";
        go_again.x;
        go_again.update();
        clearInterval(myGameArea.interval);
        return;
      }
      clearInterval(myGameArea.interval);
      myGameArea.interval = setInterval(
        updateGameArea,
        20 - Math.floor(level / 2)
      );
    }
    minHeight = 20;
    maxHeight = 110;
    height = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    minGap = 50;
    let temp = 10 * level;
    maxGap = Math.max(230 - temp, 50); //So we have 18 levels.
    gap = Math.floor(Math.random() * (maxGap - minGap)) + minGap;
    myObstacles.push(
      new objComponent(10, height, "green", myGameArea.canvas.width, 0) //Draw top rectangel pointing down.
    );
    myObstacles.push(
      //Draw recirpocal barrier.
      new objComponent(
        10,
        myGameArea.canvas.height - height - gap,
        "green",
        myGameArea.canvas.width, //Set x coordinate to maximum width. So when we begin to decrement move closer to screen.
        height + gap //Start drawing at height + gap. So mid screen and upwards. As we always maintain upwards orientation.
      )
    );
  }

  for (let i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x--;
    myObstacles[i].update();
  }

  myScore.text = "Score: " + myGameArea.frameNo;
  myScore.lvl = "level:" + level;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function drawCircle() {
  var ctx = myGameArea.context;
  ctx.beginPath();
  ctx.arc(
    myGameArea.canvas.width / 2,
    myGameArea.canvas.height / 2,
    100,
    0,
    2 * Math.PI,
    false
  );
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fill();
}

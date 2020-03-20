

var context, controller, drag, loop;
let gameIsRunning = false;
let frameCounter = 0;
let referenceCount = 1300;
let backgroundImgCount1 = 0;
let backgroundImgCount2 = 900;
let backgroundImgCount3 = 1800;
let chooseGemOrObstacle = 0;
let score = 0;
let crashing = false;
let speedPause = 1;
let speed = 1;
let randomObject1 = "";
let randomNumber = 0;
let gameOver = false
let canvasActive = false

let pauseGame = false;




let backgroundImg = new Image();
backgroundImg.src = "images/background.png";
let champagneImage = new Image();
champagneImage.src = "images/sekt.png";
let backgroundReverseImg = new Image();
backgroundReverseImg.src = "images/backgroundreverse.png";
let backgroundImg3 = new Image();
backgroundImg3.src = "images/background3.png";
let footballImage = new Image();
footballImage.src = "images/football.png";
let justinImage = new Image();
justinImage.src = "images/justin.png";
let breadImage = new Image();
breadImage.src = "images/bread.png";
let wigImage = new Image();
wigImage.src = "images/wig.png";
let lipstickImage = new Image();
lipstickImage.src = "images/lipstick.png";
let dragImg = new Image();
dragImg.src = "images/kimchi.png";
let afdImage = new Image();
afdImage.src = "images/afd.png";

context = document.querySelector("canvas").getContext("2d");





drag = {
  height: 150,
  jumping: true,
  width: 110,
  x: 144,
  x_velocity: 0,
  y: 0,
  y_velocity: 0
};

let objects = [
  { name: "bread", width: 90, height: 60, img: breadImage, art: "obstacle" },
  { name: "football", width: 70, height: 70, img: footballImage, art: "obstacle" },
  { name: "fuckboys", width: 100, height: 80, img: justinImage, art: "obstacle" },
  { name: "afd", width: 130, height: 70, img: afdImage, art: "none" },
  { name: "lipstick", width: 40, height: 70, img: lipstickImage, art: "gem" },
  { name: "wig", width: 90, height: 90, img: wigImage, art: "gem" },
  { name: "champagne", width: 90, height: 90, img: champagneImage, art: "gem" }
];
let currentObject = randomObject();

function randomObject() {
  let randomNumber = Math.floor(Math.random() * objects.length);
  randomObject1 = objects[randomNumber];

  return randomObject1;
}

controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 38:
        controller.up = key_state;
        break;
      case 39:
        controller.right = key_state;
        break;
      case 37:
        controller.left = key_state;
        break;
    }
  }
};



window.addEventListener("keydown", event => {
  if (event.key === " " && !pauseGame) {
    pauseGame = true
  } else if (event.key === " " && pauseGame) {
    pauseGame = false;
  }
  if (gameOver === true && event.key === "r") 
  {
  score = 0.00
  speed = 1.000
  frameCounter = 0.00
  gameOver = false
  drag.x = 144
  drag.y = 0
  }

});





loop = function() {
  let dragLeft = drag.x;
  let dragRight = drag.x + drag.width;
  let dragTop = drag.y;
  let dragBottom = drag.y + drag.height;

  //THE COUNTERS

  referenceCount -= 5 * speed * speedPause;
  backgroundImgCount1 -= 2 * speed * speedPause;
  backgroundImgCount2 -= 2 * speed * speedPause;
  backgroundImgCount3 -= 2 * speed * speedPause;
  frameCounter = frameCounter + (1 * speedPause);

  if (pauseGame) {speedPause = 0} else {speedPause = 1}

  if (gameOver) {speedPause = 0
    context.clearRect(300, 155, 640, 60);
    context.font = "40px Impact";
    context.fillStyle = "black";
    context.fillText("Game Over.", 300, 200);
  } else if (gameOver == false && pauseGame == false) {speedPause = 1}

 

  if (frameCounter % 800 === 0) {
    speed = speed + 0.6;
  }

  //THE DRAG

  if (!pauseGame) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (controller.up && drag.jumping == false) {
      drag.y_velocity -= 40;
      drag.jumping = true;
    }
    if (controller.left && drag.x > 60) {
      drag.x_velocity -= 1;
    }
    if (controller.right && drag.x < canvas.width - 200) {
      drag.x_velocity += 1;
    }

    drag.y_velocity += 1.5; //Gravity
    drag.x += drag.x_velocity;
    drag.y += drag.y_velocity;
    drag.x_velocity *= 0.9; //friction
    drag.y_velocity *= 0.9;

    if (drag.y > canvas.height - 220) {
      drag.jumping = false;
      drag.y = canvas.height - 220;
      drag.y_velocity = 0;
    }

    //THE BACKGROUND
    if (backgroundImgCount1 >= -900) {
      context.drawImage(backgroundImg, backgroundImgCount1, 0, 900, 600);
    } else {
      backgroundImgCount1 += 2700;
    }
    if (backgroundImgCount2 >= -900) {
      context.drawImage(backgroundReverseImg, backgroundImgCount2, 0, 900, 600);
    } else {
      backgroundImgCount2 += 2700;
    }
    if (backgroundImgCount3 >= -900) {
      context.drawImage(backgroundImg3, backgroundImgCount3, 0, 900, 600);
    } else {
      backgroundImgCount3 += 2700;
    }
    context.fillStyle = "#484848";
    context.fillRect(0, canvas.height - 60, canvas.width, 60);

    context.drawImage(dragImg, drag.x, drag.y, drag.width, drag.height);




  } 


  








    //THE ITEMS

    if (currentObject != "") {
      context.drawImage(
        currentObject.img,
        referenceCount,
        455,
        currentObject.width,
        currentObject.height
      );
    }


  

   
    if (referenceCount < -100) {
      
      referenceCount += 1300;
      currentObject = randomObject();
    }

    if (
      referenceCount - dragRight < 5 &&
      dragBottom > 455 &&
      dragLeft - (referenceCount + currentObject.width) < 4
    ) {
      crashing = true;


    
      if (currentObject.art === "gem") {
        score += 5;
      } else if (
        currentObject.art === "obstacle" &&
        score > 0
      ) {
        score -= 5;
      }

      if (currentObject.name === "afd") {gameOver = true

      
      
      }

    




          referenceCount = 1300;
    currentObject = randomObject();
    
    
    }

      else {crashing = false}

      


    

    context.font = "30px Impact";
    context.fillText(`Score: ${score}`, 10, 50);
    context.fillText(
      "Speed: " + Math.floor(speed),
      canvas.width - 150,
      50
    )


    if (gameOver) {
      context.clearRect(280, 155, 680, 220);
  
      context.fillStyle = "white";
      context.font = "30px Impact";
      context.fillText("You joined the wrong crowd", 380, 220);
      context.font = "50px Impact";
      context.fillText("Sashay away!", 380, 280);
      context.font = "20px Impact";
      context.fillText("aka Game Over! Press r to restart", 680, 265);
      context.font = "40px Impact";
      context.fillText("Your final score is " + score, 380, 345);

    }

    if (pauseGame) {
      context.clearRect(300, 155, 640, 60);
      context.font = "40px Impact";
      context.fillStyle = "white";
      context.fillText("Game Paused. Press space to continue.", 300, 200);
    }


  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
let startButton = document.getElementById("start-button")







// document.getElementById("explanation").onclick = () => {
//   if (gameIsRunning === false) {
//     gameIsRunning = true;
//     loop();



  
//   }}


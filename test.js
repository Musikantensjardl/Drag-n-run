var context, controller, drag, loop
let gameIsRunning = false
let frameCounter = 0
let referenceCount = 1300
let backgroundImgCount1 = 0
let backgroundImgCount2 = 900
let backgroundImgCount3 = 1800
let chooseGemOrObstacle = ""
let score = 0
let crashing = false
let positiveCount = 0
let negativeCount = 0
let speed = 1




let backgroundImg = new Image()
backgroundImg.src = "images/background.png"
let backgroundReverseImg = new Image()
backgroundReverseImg.src = "images/backgroundreverse.png"
let backgroundImg3 = new Image()
backgroundImg3.src = "images/background3.png"
let jakobImage = new Image()
jakobImage.src = "images/jakob.png"
let breadImage = new Image()
breadImage.src = "images/bread.png"
let wigImage = new Image()
wigImage.src = "images/wig.png"
let lipstickImage = new Image()
lipstickImage.src = "images/lipstick.png"
let dragImg = new Image();
dragImg.src = "images/kimchi.png"

context = document.querySelector('canvas').getContext('2d')

context.canvas.height = 600
context.canvas.width = 1200

drag = {
  height: 100,
  jumping: true,
  width: 100,
  x: 144,
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
}





let obstacles = [
    {name: "bread", width: 90, height: 60, img: breadImage},
    {name: "jakob", width: 70, height: 70, img: jakobImage}
]

let gems = [
    {name: "lipstick", width: 40, height: 70, img: lipstickImage},
    {name: "wig", width: 90, height: 90, img: wigImage} 
]


function randomObject() {
   chooseGemOrObstacle =  Math.floor((Math.random() * 2) + 0)
    if ( chooseGemOrObstacle === 0)
  { let randomObstacle = obstacles[Math.floor((Math.random() * obstacles.length))]
   return randomObstacle}
   else { let randomGem = gems[Math.floor((Math.random() * gems.length))]
    return randomGem}
}


controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    var key_state = event.type == 'keydown' ? true : false

    switch (event.keyCode) {
      case 38:
        controller.up = key_state
        break
      case 39:
        controller.right = key_state
        break
      case 37:
        controller.left = key_state
        break
    }
  },
}


let currentObject = randomObject()



loop = function() {

let dragLeft = drag.x
let dragRight = drag.x + drag.width
let dragTop = drag.y
let dragBottom = drag.y + drag.height

 //THE COUNTERS
referenceCount-= 5 * speed
backgroundImgCount1 -= 2 * speed
backgroundImgCount2 -= 2 * speed
backgroundImgCount3 -= 2 * speed
frameCounter++

if (frameCounter % 4000 === 0) {speed++}


//THE DRAG
        context.clearRect(0, 0, canvas.width, canvas.height)
  if (controller.up && drag.jumping == false) {
    drag.y_velocity -= 40
    drag.jumping = true
  }
  if (controller.left) {
    drag.x_velocity -= 1 
  }
  if (controller.right) {
    drag.x_velocity += 1 
  }

  drag.y_velocity += 1.5 //Gravity
  drag.x += drag.x_velocity
  drag.y += drag.y_velocity
  drag.x_velocity *= 0.9 //friction
  drag.y_velocity *= 0.9 


  if (drag.y > canvas.height-170) {
    drag.jumping = false
    drag.y = canvas.height-170
    drag.y_velocity = 0
  }

if (drag.x <= 4) {drag.x_velocity = 0.3} 
  if (drag.x > canvas.width-50) {drag.x_velocity = .3}



  //THE BACKGROUND
if (backgroundImgCount1 >= -900) {context.drawImage(backgroundImg, backgroundImgCount1, 0, 900, 600)} else {backgroundImgCount1 += 2700}
if (backgroundImgCount2 >= -900) {context.drawImage(backgroundReverseImg, backgroundImgCount2, 0, 900, 600)} else {backgroundImgCount2 += 2700}
if (backgroundImgCount3 >= -900) {context.drawImage(backgroundImg3, backgroundImgCount3, 0, 900, 600)} else {backgroundImgCount3 += 2700}
context.fillStyle = "#484848";
context.fillRect(0, canvas.height-60, canvas.width, 60);
  

   context.drawImage(dragImg, drag.x, drag.y, drag.width, drag.height)












//THE ITEMS

if (currentObject !="")
   { context.drawImage(currentObject.img, referenceCount, 455, currentObject.width, currentObject.height)
}

 if (referenceCount === -100) {
    currentObject = randomObject()
 } 
 if (referenceCount < -100) {referenceCount+= 1300}



if (referenceCount - dragRight < 5 && dragBottom > 455 && (dragLeft - (referenceCount+currentObject.width)) < 4)
    
  {crashing = true; currentObject =""} else {crashing = false}



context.font = "30px Arial";
  context.fillText(`Score: ${score}`, 10, 50)
  context.fillText(crashing, 10, 100)



  if (crashing === true && chooseGemOrObstacle === 1) {score+=5}
  else if (crashing === true && chooseGemOrObstacle === 0 && score >0) {score -= 5}


  window.requestAnimationFrame(loop)
}



window.addEventListener('keydown', controller.keyListener)
window.addEventListener('keyup', controller.keyListener)

document.getElementById("start-button").onclick = () => {
    if (gameIsRunning===false)
{gameIsRunning = true
    loop()};
  }




    

  
 
  


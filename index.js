// window.onload = () => {
//     let canvas = document.getElementById("canvas")
//   ctx = document.getElementById("canvas").getContext("2d");
//     document.getElementById("start-button").onclick = () => {
//       startGame()
//     }}
//     let dragImg = new Image();
//     dragImg.src = "images/kimchi.png"

//     let drag = {
//         x: 0,
//         y: 500,
//         jump: function () {
    
//             drag.y -= 300

//           },
//         }


// frameCounter = 0

// function startGame() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
// frameCounter++
//     function drawDrag() {
//           ctx.drawImage(dragImg, drag.x, drag.y, 100, 100)
//        }
       

// drawDrag()
//       window.requestAnimationFrame(startGame)
//       ctx.font = "30px Arial";
//       ctx.fillText(frameCounter, 10, 50);
// }


// document.onkeydown = function (e) {
//     switch (e.keyCode) {
//       case 32:
//        drag.jump();
//         break;
    
//     }
//   }
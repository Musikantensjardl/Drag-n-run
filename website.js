document.getElementById("title").onclick = () => {

document.getElementById("title").remove()
document.getElementById("explanation").remove()
context.canvas.height = 600;
context.canvas.width = 1200;
canvasActive = true
      if (gameIsRunning === false) {
        gameIsRunning = true;
        loop();}
      }
    



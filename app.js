let canvas = document.getElementById('myCanvas');
let storedContent = canvas.getContext("2d");

let xBall = canvas.width/2;
let yBall = canvas.height-30;

let dx = 2;
let dy = -2;

let radiusBall = 10;

let barWidth = 80;
let barHeight = 10;

let xBar = (canvas.width - barWidth)/2;
let yBar = (canvas.height - barHeight - radiusBall);

let rowBrick = 3;
let columnBrick = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let pTopAllBrick = 30;
let pLeftAllBrick = 30;

let score = 0;

let bricks = [];
for (var column = 0; column < columnBrick; column++) {
  bricks[column] = [];
  for (var row = 0; row < rowBrick; row++) {
    bricks[column][row] = {
      x:0,
      y:0,
      stt: 1
    }
  }
}

const drawScore = () => {
  storedContent.font = '20px Arial';
  storedContent.fillStyle = 'green';
  storedContent.fillText('Score: ' + score, 350, 20);
}

const drawBall = () => {
  storedContent.beginPath();

  storedContent.arc(xBall, yBall, radiusBall, 0, 2*Math.PI);
  storedContent.fillStyle = 'white';
  storedContent.fill();
  drawBar();

  storedContent.closePath();
}

const drawBar = () => {
  storedContent.beginPath();

  storedContent.rect(xBar, yBar, barWidth, barHeight);
  storedContent.fillStyle = 'yellow';
  storedContent.fill();

  storedContent.closePath();
}

const drawBricks = () => {
  for (let column = 0; column < columnBrick; column++) {
    for (let row = 0; row < rowBrick; row++) {
      if (bricks[column][row].stt == 1) {
        let brickX = (column * (brickWidth + brickPadding)) + pLeftAllBrick;
        let brickY = (row * (brickHeight + brickPadding)) + pTopAllBrick;
        bricks[column][row].x = brickX;
        bricks[column][row].y = brickY;
        storedContent.beginPath();

        storedContent.rect(brickX, brickY, brickWidth, brickHeight);
        storedContent.fillStyle = 'red';
        storedContent.fill();

        storedContent.closePath();
      }

    }
  }
}

const draw = () => {
  storedContent.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBar();
  drawBricks();
  testDetection();
  drawScore();
  xBall += dx;
  yBall += dy;

  if (yBall + dy < radiusBall) {
    dy = -dy;
  } else if (yBall + dy > canvas.height - barHeight - radiusBall) {
    if (xBall + radiusBall >= xBar && xBall <= xBar + radiusBall + barWidth/2) {
      if (dx > 0 && dy > 0) {
        dx = -dx;
        dy = -dy;
      }

      dy = -dy;
    } else if (xBall + radiusBall >= xBar + barWidth/2 && xBall <= xBar + radiusBall + barWidth) {
      if (dx < 0 && dy > 0) {
        dx = -dx;
        dy = -dy;
      }
      dy = -dy;
      // console.log('Right');
      // console.log(dx, dy);
    } else {
      alert("GAME OVER!");
      document.location.reload();
    }
  }
  if (xBall + dx < radiusBall || xBall + dx > canvas.width - radiusBall) {
    // console.log('Left and Right: ', dx, dy);
    dx = -dx
  }
  if(pressRight && xBar < canvas.width - barWidth) {
      xBar += 5;
  }
  else if(pressLeft && xBar > 0) {
      xBar -= 5;
  }
}

setInterval(draw, 10);

const testDetection = () => {
  for (let column = 0; column < columnBrick; column++) {
    for (let row = 0; row < rowBrick; row++) {
      let brickPos = bricks[column][row];
      if (brickPos.stt == 1) {
        if(
          xBall + radiusBall >= brickPos.x && //left
           xBall - radiusBall <= brickPos.x + brickWidth && //right
           yBall >= brickPos.y - radiusBall && //top
           yBall <= brickPos.y + radiusBall + brickHeight) { //bot
             if (xBall + radiusBall == brickPos.x && //left
              xBall - radiusBall <= brickPos.x + brickWidth && //right
              yBall >= brickPos.y - radiusBall && //top
              yBall <= brickPos.y + radiusBall + brickHeight) {
                if (dx > 0) {
                  dx = -dx;
                }
                dx = dx;
             } else if (xBall + radiusBall >= brickPos.x && //left
              xBall - radiusBall == brickPos.x + brickWidth && //right
              yBall >= brickPos.y - radiusBall && //top
              yBall <= brickPos.y + radiusBall + brickHeight) {
               if (dx < 0 && dy > 0) {
                 dx = -dx;
               }
               dx = dx;
             } else {
               dy = -dy;
             }
          brickPos.stt = 0;
          score++;
          if (score == rowBrick*columnBrick) {
            alert("YOU WIN!");
            document.location.reload();
          }
        }
      }
    }
  }
}

//----------------------------------------------

let pressRight = false;
let pressLeft = false;

const keyDownHandler = (el) => {
  if (el.keyCode == 39) {
    pressRight = true;
  }
  else if (el.keyCode == 37) {
    pressLeft = true;
  }
}

const keyUpHandler = (el) => {
  if (el.keyCode == 39) {
    pressRight = false;
  }
  else if (el.keyCode == 37) {
    pressLeft = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

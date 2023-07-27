let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;

const bricks = [];
for (let col = 0; col < brickColumCount; col++){
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++){
        bricks[col][row] = {x: 0, y: 0, status: 1};
    }
}

addEventListener("keydown", keyDownHandler, false);
addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key === "Right"  || e.key === "ArrowRight"){
        rightPressed = false;
    }else if(e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = false;
    }
}

//collision detection
/** function to store bricks objects
    in everu loop of collision detection  */

function collisionDetection() {
    for (let col = 0; col < brickColumCount; col++) {
      for (let row = 0; row < brickRowCount; row++) {
        const b = bricks[col][row];
        if (b.status === 1) {
          // Calculate the coordinates of the edges of the brick
          const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
          const brickRightEdge = brickX + brickWidth;
          const brickBottomEdge = brickY + brickHeight;
  
          // Check for collision
          if (
            x + ballRadius > brickX &&
            x - ballRadius < brickRightEdge &&
            y + ballRadius > brickY &&
            y - ballRadius < brickBottomEdge
          ) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score === brickRowCount * brickColumCount){
                alert("YOU WIN, CONGRATULATIONS!");
                document.location.reload();
                clearInterval(interval); // Need for chrome to end the game
            }
          }
        }
      }
    }
  }

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle =  "0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}
  

//draw ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    
}

//draw Paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//draw bricks
function drawBricks(){
    for (let col = 0; col < brickColumCount; col++){
        for (let row = 0; row < brickRowCount; row++){
            if(bricks[col][row].status === 1){
                const brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//clear ball
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    //update x and y position
    bounce();
    drawPaddle();
    movePaddle();
    drawScore();
    collisionDetection();
    x += dx;
    y += dy;
}

//bounce ball
function bounce(){
    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){   //bouncing off the left and right
        dx = -dx;
    }
    if(y + dy < ballRadius){   //bouncing off the top and bottom
        dy = -dy;
    }else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            if(y >= canvas.height - paddleHeight - ballRadius){
                dy = -dy;
            }
        }else{
            alert("GAME OVER!");
            document.location.reload();
            clearInterval(interval); //Needed for chrome to end
        }
    }
}

//move paddle
function movePaddle(){                                                               
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
}

let interval = setInterval(draw, 10); //call the function every 10 milliiseconds

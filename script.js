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

const bricks = [];
for (let col = 0; col < brickColumCount; col++){
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++){
        bricks[col][row] = {x: 0, y: 0,};
    }
}

addEventListener("keydown", keyDownHandler, false);
addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = true;
    }else if(e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = true;
    }
}

//collision detection
/** function to store bricks objects
    in everu loop of collision detection  */
    
    function collisionDetection(){
        for (let col = 0; col < brickColumCount; col++){
            for (let row = 0; row < brickRowCount; row++){
                const b = bricks[col][row];
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y  + brickHeight){
                    dy = -dy;
                }
            }
        }
    }

function keyUpHandler(e){
    if(e.key === "Right"  || e.key === "ArrowRight"){
        rightPressed = false;
    }else if(e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = false;
    }
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
            const brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[col][row].x = 0;
            bricks[col][row].y = 0;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

//clear ball
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    //update x and y position
    x += dx;
    y += dy;
    bounce();
    drawPaddle();
    movePaddle();
    collisionDetection();
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
            dy = -dy;
        }else{
        alert("GAME OVER!");
        window.location.reload();
        clearInterval(interval); //Needed for chrome to end
        }
    }
}

//move paddle
function movePaddle(){                                                               
    if(rightPressed){
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    }else if(leftPressed){
        paddleX = Math.max(paddleX - 7, 0)
    }
}

let interval = setInterval(draw, 10); //call the function every 10 milliiseconds

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

//draw ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//drawPaddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//clear ball
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    //update x and y position
    x += dx;
    y += dy;
    bounce();
    drawPaddle();
}

//bounce ball
function bounce(){
    if(y + dy < ballRadius || y + dy > canvas.height - ballRadius){   //bouncing off the top and bottom
        dy = -dy;
    }
    if(x + dx < ballRadius || x + dy > canvas.width - ballRadius){   //bouncing off the left and right
        dx = -dx;
    }
}

setInterval(draw, 10); //call the function every 10 milliiseconds

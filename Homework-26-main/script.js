"use strict";

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 4;
let dy = -4;

let ballRadius = 15;

let platformHeight = 10;
let platformWidth = 150;
let platformX = (canvas.width-platformWidth)/2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 5;
let brickColumnCount = 5;
let brickWidth = 150;
let brickHeight = 20;
let brickPadding = 20;
let brickOffsetTop = 60;
let brickOffsetLeft = 60;

let score = 0;
let lives = 3;
let color = "#3CB371";

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.code === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.code === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.code === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.code === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        platformX = relativeX - platformWidth/2;
    }
}

function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status === 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS! YOU SCORE:" + `${score}`);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function RandColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPlatform(){
    ctx.beginPath();
    ctx.rect(platformX, canvas.height-platformHeight, platformWidth, platformHeight);
    ctx.fillStyle = "#20B2AA";
    ctx.fill();
    ctx.closePath();
}

let my_gradient = ctx.createLinearGradient(700, 0, 0, 400);
my_gradient.addColorStop(0, "green");
my_gradient.addColorStop(1, "blue");

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status === 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = my_gradient;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#B22222";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#B22222";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPlatform();
    drawScore();
    drawLives();
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > platformX && x < platformX + platformWidth) {
            dy = -dy*1.05;
            dx = dx*1.05;
            color = RandColor();
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 4;
                dy = -4;
                platformX = (canvas.width - platformWidth) / 2;
            }
        }
    }
    if(rightPressed && platformX < canvas.width-platformWidth){
        platformX += 14;
    } else if(leftPressed && platformX > 0){
        platformX -= 14;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();

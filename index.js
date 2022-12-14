const grid = document.querySelector(".grid");
const brickWidth = 100;
const brickHeight = 20;
const boardSizes = [620, 400];
const ballDiameter = 20;
let xDirection = 2;
let yDirection = 2;
let timerId

const userStart = [260, 10];
let currentPosition = userStart;

const ballStart = [300, 40];
let ballcurrentPosition = ballStart;

class Brick {
    constructor(xAxis, yAxis){
         this.bottomLeft = [xAxis, yAxis];
         this.bottomRight = [xAxis + brickWidth, yAxis];
         this.topLeft = [xAxis, yAxis + brickHeight]
         this.topRight = [xAxis + brickWidth, yAxis + brickHeight]
        // adicionar estagios dos tijolos
    }
}

const bricks = [
    new Brick(10, 370),
    new Brick(110, 370),
    new Brick(210, 370),
    new Brick(310, 370),
    new Brick(410, 370),
    new Brick(510, 370),

    new Brick(10, 350),
    new Brick(110, 350),
    new Brick(210, 350),
    new Brick(310, 350),
    new Brick(410, 350),
    new Brick(510, 350),

    new Brick(10, 330),
    new Brick(110, 330),
    new Brick(210, 330),
    new Brick(310, 330),
    new Brick(410, 330),
    new Brick(510, 330),

    new Brick(10, 310),
    new Brick(110, 310),
    new Brick(210, 310),
    new Brick(310, 310),
    new Brick(410, 310),
    new Brick(510, 310),

    new Brick(10, 290),
    new Brick(110, 290),
    new Brick(210, 290),
    new Brick(310, 290),
    new Brick(410, 290),
    new Brick(510, 290),


]

function addBricks(){
    for(let i = 0; i < bricks.length ; i++){
        const brick = document.createElement('div');
        brick.classList.add("brick");
        brick.style.left = bricks[i].bottomLeft[0] + 'px'
        brick.style.bottom = bricks[i].bottomLeft[1] + 'px'
        grid.appendChild(brick)
    }
}

addBricks();

const user = document.createElement('div')
user.classList.add("user")
drawUser()
grid.appendChild(user)

function drawUser(){
    user.style.left = currentPosition[0] + "px";
    user.style.bottom = currentPosition[1] + "px"   
}

function drawBall(){
    ball.style.left = ballcurrentPosition[0] + "px";
    ball.style.bottom = ballcurrentPosition[1] + "px";
}

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10;
                drawUser();
                break;
            }
        case 'ArrowRight':
            if(currentPosition[0] < boardSizes[0] - brickWidth){
                currentPosition[0] += 10;
                drawUser();
                break;
            }
    }
}


document.addEventListener('keydown', moveUser)

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);


function moveBall(){
    ballcurrentPosition[0] += xDirection;
    ballcurrentPosition[1] += yDirection;
    drawBall();
    checkCollisions();
}

timerId = setInterval(moveBall, 30);

function checkCollisions(){
    for(let i = 0; i < bricks.length; i++){
        if(
            (ballcurrentPosition[0] > bricks[i].bottomLeft[0] && ballcurrentPosition[0] < bricks[i].bottomRight[0]) &&
            ((ballcurrentPosition[1] + ballDiameter) > bricks[i].bottomLeft[1] && ballcurrentPosition[1] < bricks[i].topLeft[1])
        ){
            const allBricks = Array.from(document.querySelectorAll(".brick"))
            allBricks[i].classList.remove("brick")
            bricks.splice(i, 1)
            changeDirection(); 
            // add  1 ponto
        }
    }


    if(ballcurrentPosition[0] >= (boardSizes[0] - ballDiameter) ||
       ballcurrentPosition[1] >= (boardSizes[1] - ballDiameter) ||
       ballcurrentPosition[0] <= 0 
        ){
            changeDirection();
    }
    
    if(ballcurrentPosition[0] > currentPosition[0] && ballcurrentPosition[0] < (currentPosition[0] + brickWidth) &&
        (ballcurrentPosition[1] > currentPosition[1] && ballcurrentPosition[1] < (currentPosition[1] + brickHeight))){
            changeDirection();
        }

    if(ballcurrentPosition[1] <= 0 ){
        clearInterval(timerId) // executa ao perder
        document.removeEventListener("keydown", moveUser)
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2;
        return
    }
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return 
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return
    }
}

var canvas = document.getElementById('canv');
var canvasElement = canvas.getContext("2d");
var playerImg = document.getElementById("charImg");
var playerContainer = document.querySelector(".Charecter");
var playerSize = getComputedStyle(document.documentElement)
.getPropertyValue('--player-size');
var audio = document.querySelector("#myAudio");


class Player {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.h = playerSize*30
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    show(){
        playerImg.style.display="block";
        playerContainer.style.top =`${this.x}px`;
        playerContainer.style.left = `${this.y}px`;
    }

    update(){
        this.y += this.ySpeed;
        this.ySpeed += gravity

        playerContainer.style.top =`${this.y}px`;
        
        if(this.y > 750-this.h){
            this.ySpeed = 0;
            this.xSpeed = 1.8;
            canJump = true;
            playerImg.classList.add('addAnimation');
        }else{
            canJump = false
        }
         
    }
}

class Obstacle{

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.h = 50;
        this.w = 50;
    }

    show(){
        canvasElement.fillStyle='grey'
        canvasElement.fillRect(this.x,this.y,this.w,this.h)
    }

   
   
}

var obstacles = [];
var obstacleXPos = 500
var p;
var gravity = 0.1;
var canJump = false;


window.onload= function(){
    
    start();
    setInterval(update,10)
};

function start(){
   
    //player
    p = new Player(40,40)
    p.show()
    // obstacle
    for(i=0;i<10;i++){
        var newObstacle = new Obstacle(obstacleXPos,750-50)
        obstacles.push(newObstacle);
        obstacleXPos+=Math.round(Math.random()*400)+200;
    }
}

function update(){
    canvas.width = canvas.width;

    canvasElement.fillStyle = 'green'
    canvasElement.fillRect(0,750,900,50);
    // show the player
    p.update()
    // show the obstacles
    for(i=0;i<10;i++){
        obstacles[i].show()
        obstacles[i].x -= p.xSpeed
    }
    console.log(i);
    
}

function keyDown(key){
    audio.play()
    if(key.keyCode == 32&&canJump){
        p.ySpeed -= 7;
        playerImg.classList.remove('addAnimation');
    }
}

function keyUp(key){
    if(key.keyCode == 32){
        p.ySpeed = 0;
        playerImg.classList.add('addAnimation');
    }
}

window.onkeydown = keyDown;
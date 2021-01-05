var canvas = document.getElementById('canv');
var canvasElement = canvas.getContext("2d");
var playerImg = document.getElementById("charImg");
var playerContainer = document.querySelector(".Charecter");
var playerSize = getComputedStyle(document.documentElement)
.getPropertyValue('--player-size');

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
        console.log(this.h);
    }

    update(){
        this.y += this.ySpeed;
        this.ySpeed += gravity

        playerContainer.style.top =`${this.y}px`;
        if(this.y > 750-this.h){
            this.ySpeed = 0;
            playerImg.classList.add('addAnimation');
        }
    }
}

var p;
var gravity = 0.1;
window.onload= function(){
    start();
    setInterval(update,10)
};

function start(){
    p = new Player(40,40)
    p.show()
}

function update(){
    canvas.width = canvas.width;

    canvasElement.fillStyle = 'green'
    canvasElement.fillRect(0,750,800,50);
    p.update()
   
}
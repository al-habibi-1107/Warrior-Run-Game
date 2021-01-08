// ON Deployment the pixel while animation blurrs
// The collision isnt that accurate -- fixed
// player after collision is stuck,change bg -- added game over screen
// sound just pops up - make a volume button to mute it -- fixed
// mobile phone compatibility -- partial






var canvas = document.getElementById('canv');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
var canvasElement = canvas.getContext("2d");
// to manipulate player sprite
var playerImg = document.getElementById("charImg");
// to chnage the sprite effects
var playerContainer = document.querySelector(".Charecter");
// to make the sizing better
var playerSize = getComputedStyle(document.documentElement)
.getPropertyValue('--player-size');
// the background music
var audio = document.querySelector("#myAudio");
// the animated background image
var bgImg = document.querySelector(".bgImg");
// sound icon
var soundIcon = document.getElementById("song-img");
// Game Over panel 
var gameover = document.querySelector(".game-over");
// reload button
var reloadBtn = document.querySelector(".reload");


class Player {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.h = playerSize*30
        this.w = playerSize*20
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
        
        if(this.y >= window.innerHeight-80-this.h){
            this.ySpeed = 0;
            this.xSpeed = 1.8;
            canJump = true;
            // start the player sprite animation
            playerImg.classList.add('addAnimation');
            // start the background animation
            bgImg.classList.add('bg-animation')
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

    update(){
        if(((p.x+p.w)>=this.x)&&((p.x+p.w)<=this.x+this.w)&&((p.y+p.h)>=this.y)){
            p.xSpeed = 0;
            gameover.classList.add("show-game-over");
            bgImg.classList.remove('bg-animation');
            playerImg.classList.remove('addAnimation');
            playerImg.classList.add('opacityDown');

            
        }
    }
   
   
}



var obstacles = [];
var obstacleXPos = 500
var p;
var gravity = 0.1;
var canJump = false;
var soundPlays = false;


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
        var newObstacle = new Obstacle(obstacleXPos,window.innerHeight-80-50)
        obstacles.push(newObstacle);
        obstacleXPos+=Math.round(Math.random()*400)+200;
    }
}

function update(){
    canvas.width = canvas.width;

    canvasElement.fillStyle = 'green'
    canvasElement.fillRect(0,window.innerHeight-80,window.innerWidth,80);

   

    // show the player
    p.update()
    // show the obstacles
    for(i=0;i<10;i++){
        obstacles[i].show()
        obstacles[i].update()
        obstacles[i].x -= p.xSpeed
    }
    
    
}

function keyDown(key){
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

soundIcon.addEventListener("click",function(){
    console.log("clicked");
    if(soundPlays===true){
        console.log("sound on");
        soundPlays=!soundPlays;
        audio.pause();
    }else{
        console.log("sound off");
        soundPlays=!soundPlays;
        audio.play()
    }
})

window.onkeydown = keyDown;
window.ontouchstart = keyDown;
window.ontouchend = keyUp;

reloadBtn.addEventListener("click",function(){
    location.reload()
});
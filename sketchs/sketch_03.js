
let screen = [400, 400];
let fps = 30;
let pipes = [];
let speed = 1;


let score = 0;
let bird = {
    y :  0,
    x :  Math.floor( screen[0] / 2),
    speed : 0,
    mass : 0.5,

    fly : function(){

        t = 1/15;
        a = 9.8665;

//      v = v0 + at
        this.speed = this.speed + a * t;   
        
//      y = y0 + speed* t + a * t^2 / 2                
        this.y = this.y  + this.speed * t + (a * Math.pow(t, 2)) / 2; 
    },

    draw : function(){
        this.fly();
        if(this.y >= screen[1]-10 && this.speed > 0){
            noLoop();
//            this.speed = (this.speed - 10) * -1;
        }
        rect(this.x,this.y, 10, 10);
    }

}

    my_bird = bird;

//function preload() {}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(50);
    textAlign(10, 10);
    pipes.push(new Pipe());
//    frameRate(fps);
}

function draw() {
    background(110, 190, 200);
    
    fill(241, 233, 91);
    my_bird.draw();
    for(i=0;i<pipes.length;i++){
        pipes[i].show();
        hit_detect(i);
    }

    if(pipes[0].x < my_bird.x && pipes.length == 1){
        pipes.push(new Pipe());
        score += 1;
    }

    if(pipes[0].x < -60){
        pipes.splice(0, 1);
    }
    fill(0, 0, 0);
    text(score, width/2, 20, 150, 150);
}

function Pipe(){
    this.x = width + 20;
    this.y = random(50,height-50);
    if(pipes.length > 0){
        if(pipes[0].y - height/2 > this.y){
            this.y = pipes[0].y - height/2 ;
            console.log("DANGER!!! RUN RUN...");
        }
    }
    this.show = function(){
        this.x -= speed ;
        fill(120, 172, 62);
//        line(this.x,0, this.x, height); 
        rect(this.x, 0, 60 , this.y - 20);
        rect(this.x - 10,this.y - 30, 80, 20);
        rect(this.x, this.y + 50, 60 ,  height);
        rect(this.x - 10,this.y + 40, 80, 20);
    }
}


function hit_detect(N){
    if(pipes[N].x < my_bird.x + 20 && pipes[N].x > my_bird.x - 40){
        if(pipes[N].y + 30 < my_bird.y || pipes[N].y - 10 > my_bird.y ){
            noLoop();  
        }
    }

}

function keyPressed() {
  keyIndex = key.charCodeAt(0);

  if(keyIndex == 32 || keyCode === UP_ARROW){ // SPACE OR UP => TURN THE PIECE
//    if( bird.speed > 0){
        bird.speed = -20;
//    }

  }else if(keyCode === LEFT_ARROW){    

  }else if(keyCode === RIGHT_ARROW){

  }else if(keyCode === DOWN_ARROW){
 
  }
}


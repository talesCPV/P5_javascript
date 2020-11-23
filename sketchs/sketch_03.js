
let screen = [400, 400];

let score = 0;
let bird = {
    y :  0,
    x :  Math.floor( screen[0] / 2),
    speed : 0,
    mass : 0.5,

    fly : function(){

        t = 1/30;
        a = 9.8665;

//      v = v0 + at
        this.speed = this.speed + a * t;   
        
//      y = y0 + speed* t + a * t^2 / 2                
        this.y = this.y  + this.speed * t + (a * Math.pow(t, 2)) / 2; 
    },

    draw : function(){
        this.fly();
        rect(this.x,this.y, 10, 10);
    }

}

    my_bird = bird;

//function preload() {}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);

}

function draw() {
    background(0, 0, 0);
    fill(0, 102, 153);
    my_bird.draw();
    
}


function keyPressed() {
  keyIndex = key.charCodeAt(0);

  if(keyIndex == 32 || keyCode === UP_ARROW){ // SPACE OR UP => TURN THE PIECE

  }else if(keyCode === LEFT_ARROW){    

  }else if(keyCode === RIGHT_ARROW){

  }else if(keyCode === DOWN_ARROW){
 
  }
}


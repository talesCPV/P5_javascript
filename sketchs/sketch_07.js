let screen = [600,600];
let middle = [screen[0]/2,screen[1]/2];
let end_tunel = [10,10]
let lines = [];
let speed = 1
//function preload() {}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    lines.push(new Wall_lines);

}

function draw() {
    background(0, 0, 0);
    draw_walls("L");
    for(let i=0; i<lines.length;i++){
        lines[i].draw();
    }

    
}

function draw_walls(){
    stroke(255,255,0);
    noFill();
    beginShape();
    vertex(0, 0);
    vertex(middle[0] - end_tunel[0], middle[1] - end_tunel[1]);
    vertex(middle[0] - end_tunel[0], middle[1] + end_tunel[1]);
    vertex(0, height);
    endShape();
    beginShape();
    vertex(width, 0);
    vertex(middle[0] +end_tunel[0], middle[1] -end_tunel[1]);
    vertex(middle[0] +end_tunel[0], middle[1] +end_tunel[1]);
    vertex(width, height);
    endShape();    
    line(middle[0] -end_tunel[0], middle[1] +end_tunel[1],middle[0] +end_tunel[0], middle[1] +end_tunel[1]);
}

function Wall_lines(){
    this.distance = 100;    
//    this.box = Math.floor(random(0,5));
//    this.box_sx = Math.floor(random(1,8));
//    this.box_sy = Math.floor(random(1,8));
    this.box = 2;
    this.box_sx = 30;
    this.box_sy = 30;
    this.box_sz = 30;

}
Wall_lines.prototype.draw = function(){
    let percent = this.distance/100;
    let x1 = (middle[0] - end_tunel[0]) * percent ;        
    let y1 = (middle[1] - end_tunel[1]) * percent ;
    let x2 = width - x1 ;        
    let y2 = height - y1;
    line(x1,y1,x1,y2);
    line(x2,y1,x2,y2);
    line(x1,y2,x2,y2);   
    this.distance -= speed;
    if(this.distance <= 50 && lines.length <= 1){
        lines.push(new Wall_lines);
    }else if(this.distance <= 0){
        lines.splice(0, 1);
    }
    if(this.box > 0){
        this.draw_box(x1,y1,x2,y2);
    }
}
Wall_lines.prototype.draw_box = function(x1,y1,x2,y2){
    let size_y = (y2 - y1) * (this.box_sy / 100);        
    let size_x = (x2 - x1) * (this.box_sx / 100);     
    
    let x3 = ((middle[0] - x1) * (this.box_sz / 100)) + x1 ;            
    let y3 = ((y2 - middle[1]) * (this.box_sz / 100)) + middle[1];  
    
    let x4 = 
   

    if(this.box == 1){    
        rect(x1,y1 ,size_x,size_y);
    }
  
    if(this.box == 2){    
        rect(x1, y2 - size_y,size_x,size_y);
        line(x1, y2 - size_y,x3,y3);
        line(x3, y3 ,x3 + (size_x * ((100-this.box_sz) / 100) ),y3);
    }
   
    if(this.box == 3){    
        rect(x2 - size_x,y2 - size_y,size_x,size_y);
    }

    if(this.box == 4){    
        rect(x2 - size_x, y1,size_x,size_y);
 
    }

}


function keyPressed() {
  keyIndex = key.charCodeAt(0);

  if(keyIndex == 32 || keyCode === UP_ARROW){ // SPACE OR UP => TURN THE PIECE

  }else if(keyCode === LEFT_ARROW){    

  }else if(keyCode === RIGHT_ARROW){

  }else if(keyCode === DOWN_ARROW){
 
  }
}


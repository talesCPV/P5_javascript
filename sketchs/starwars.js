const screen = [800,600];

let lines = [];
let speed = 1
let pos = [0,0];
let num_walls = 1;
const vertices = [216, 324, 36, 144]; // degrees for each vertice
let add_vert = [0,0,0,0];

// END TUNNEL
const middle = [screen[0]/2,screen[1]/2];
const end_tunel = [5,5]
const A = [middle[0] - end_tunel[0], middle[1] - end_tunel[1]];
const B = [middle[0] - end_tunel[0], middle[1] + end_tunel[1]];
const C = [middle[0] + end_tunel[0], middle[1] + end_tunel[1]];
const D = [middle[0] + end_tunel[0], middle[1] - end_tunel[1]];

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    for(let i = 0; i<num_walls ; i++){
        lines.push(new Wall_lines);
        lines[i].distance = Math.floor(100/num_walls) * i;
    }
}

function draw() {
    background(0, 0, 0);
    stroke(255,255,255);
    strokeWeight(3);
    noFill();
    draw_walls();
    for(let i=0; i<lines.length;i++){
//        lines[i].draw();
    }

    joystick();
    
    text('POS:'+vertices , 10, 10, 70, 80);
}

function seno(ang){
    return Math.sin(ang * (Math.PI / 180));
}

function cosseno(ang){
    return Math.cos(ang * (Math.PI / 180));
}

function tangente(ang){
    return Math.tan(ang * (Math.PI / 180));
}

function Atangente(x,y){
    return Math.atan2(y,x) * 57.296;
}

function get_point(P,V, dist){

    let x =   P[0] + cosseno(vertices[V] + add_vert[V]) * dist + end_tunel[0];
    let y =   P[1] + seno(vertices[V] + add_vert[V]) * dist - end_tunel [1];
    return [x,y];
}

function draw_walls(){

    beginShape(); // draw end tunel
    vertex(A[0], A[1]);
    vertex(B[0], B[1]);
    vertex(C[0], C[1]);
    vertex(D[0], D[1]);
    endShape(CLOSE);

    if(pos[0] < 0){

    }

    let P1 =   get_point(A,0 ,1000) ;
    let P2 =   get_point(B,1 ,1000) ;
    let P3 =   get_point(C,2 ,1000) ;
    let P4 =   get_point(D,3 ,1000) ;

    line(A[0], A[1], P1[0] , P1[1]);
//    line(B[0], B[1], P4[0] , P4[1]);
//    line(C[0], C[1], P3[0] , P3[1]);
    line(D[0], D[1], P2[0] , P2[1]);

}

function Wall_lines(){
    this.distance = 100;    
    this.box = Math.floor(random(0,5));
    this.box_sx = Math.floor(random(20,50));
    this.box_sy = Math.floor(random(20,50));
    this.box_sz = Math.floor(random(10,50));

//    this.box = 4;
//    this.box_sx = 30;
//    this.box_sy = 40;
//    this.box_sz = 20;

}
Wall_lines.prototype.draw = function(){
    let percent =  1 - this.distance/100;

    let P1 =   get_point(A,vertices[0],1000 * percent) ;
    let P2 =   get_point(B,vertices[1],1000 * percent) ;
    let P3 =   get_point(C,vertices[2],1000 * percent) ;
    let P4 =   get_point(D,vertices[3],1000 * percent) ;
  
    line(P1[0],P1[1],P4[0],P4[1]);
    line(P2[0],P2[1],P3[0],P3[1]);
//    line(P4[0],P4[1],P3[0],P3[1]);

    this.distance -= speed + ((100 - this.distance) * 0.1 ) ;
    
    if(this.distance <= -10){
        lines.splice(0, 1);
        lines.push(new Wall_lines);
    }
/*    
    if(this.box > 0){
        this.draw_box(x1,y1,x2,y2);
    }
*/    
}
Wall_lines.prototype.draw_box = function(x1,y1,x2,y2){


    let perc =  ((1 - this.distance/100) * ((this.box_sz / 100))) +  this.distance/100 ;

    let x3 = (middle[0] - end_tunel[0]) * perc ;        
    let y3 = (middle[1] - end_tunel[1]) * perc ;
    let x4 = width - x3 ;        
    let y4 = height - y3;

    let size_y1 = (y2 - y1) * (this.box_sy / 100);        
    let size_x1 = (x2 - x1) * (this.box_sx / 100); 

    let size_y2 = (y4 - y3) * (this.box_sy / 100);        
    let size_x2 = (x4 - x3) * (this.box_sx / 100);   


    if(this.box == 1){    
        rect(x1,y1 ,size_x1,size_y1);
        rect(x3, y3 ,size_x2,size_y2);
        line(x1 + size_x1, y1,x3 + size_x2, y3);
        line(x1 + size_x1, y1+size_y1,x3 + size_x2, y3+size_y2);
        line(x1, y1+size_y1,x3, y3+size_y2);
    }
  
    if(this.box == 2){    
        rect(x1, y2 - size_y1,size_x1,size_y1);
        rect(x3, y4 - size_y2,size_x2,size_y2);
        line(x1, y2 - size_y1,x3, y4 - size_y2)
        line(x1 + size_x1, y2 - size_y1,x3 + size_x2, y4 - size_y2)
        line(x1 + size_x1, y2,x3 + size_x2, y4)
    }   
    if(this.box == 3){    
        rect(x2 - size_x1,y2 - size_y1,size_x1,size_y1);
        rect(x4 - size_x2,y4 - size_y2,size_x2,size_y2);
        line(x2 - size_x1,y2 - size_y1,x4 - size_x2,y4 - size_y2)
        line(x2 - size_x1,y2,x4 - size_x2,y4)
        line(x2,y2 - size_y1,x4,y4 - size_y2)
    }

    if(this.box == 4){    
        rect(x2 - size_x1, y1,size_x1,size_y1);
        rect(x4 - size_x2, y3,size_x2,size_y2);
        line(x2 - size_x1, y1,x4 - size_x2, y3);
        line(x2 - size_x1, y1 + size_y1,x4 - size_x2, y3 + size_y2);
        line(x2, y1 + size_y1,x4, y3 + size_y2);
    }

}

function mod(N){
    if(N < 0){
        N *= -1;
    }
    return N;
}

function keyPressed() {
  keyIndex = key.charCodeAt(0);

  if(keyIndex == 32 || keyCode === UP_ARROW){ // SPACE OR UP => TURN THE PIECE

  }else if(keyCode === LEFT_ARROW){    

  }else if(keyCode === RIGHT_ARROW){


  }else if(keyCode === DOWN_ARROW){
 
  }
}


function joystick(){

    let dist = 10;
    let per_x = width / dist;
    let per_y = height / dist;

    if(keyIsDown(LEFT_ARROW)) {   
        pos[0] -= 1;      
    }else if(keyIsDown(RIGHT_ARROW)) {    
        pos[0] += 1; 
    }
    if(keyIsDown(DOWN_ARROW)) {    
        pos[1] -= 1; 
    } else if(keyIsDown(UP_ARROW)) {    
        pos[1] += 1; 
    }

    for(let i=0; i<2; i++){
        if(pos[i] > dist){
            pos[i] = dist;
        }else if(pos[i] < -dist){
            pos[i] = -dist;
        }   
    }

    add_vert[0] = 0;
    add_vert[1] = 0;
    add_vert[2] = 0;
    add_vert[3] = 0;


    add_vert[0] += seno(pos[0]) * dist * -1;

    let h = Math.sqrt(Math.pow((dist-pos[0]),2) + Math.pow((dist-pos[1]),2));

    add_vert[0] = ( Atangente( (per_x * pos[0]), per_y * pos[1]) );




/*
    if(pos[0] < 0){
        add_vert[0] += seno(pos[0]) * dist * -1;
        add_vert[1] += seno(pos[0]) * dist * -1;
        add_vert[2] += seno(pos[0]) * dist  ;
        add_vert[3] += seno(pos[0]) * dist  ;
    } else if(pos[0] > 0){
        add_vert[0] += (pos[0] / 90) * dist * -1;
        add_vert[1] += (pos[0] / 90) * dist * -1;
        add_vert[2] += (pos[0] / 90) * dist  ;
        add_vert[3] += (pos[0] / 90) * dist  ;
    }

    if(pos[1] < 0){
        add_vert[0] += seno(pos[1]) * dist * -1;
        add_vert[1] += seno(pos[1]) * dist ;
        add_vert[2] += seno(pos[1]) * dist ;
        add_vert[3] += seno(pos[1]) * dist * -1;
    } else if(pos[1] > 0){
        add_vert[0] += (pos[1] / 90) * dist * -1;
        add_vert[1] += (pos[1] / 90) * dist ;
        add_vert[2] += (pos[1] / 90) * dist ;
        add_vert[3] += (pos[1] / 90) * dist * -1;
    }

*/



   
}
let fps = [0,6]; // cont | fps
let pos = [100,100]; // x | y 
let tail = []; //
let eni = [0,0];
let mov = [0,0]; // x | y ***  values => 0=stop | 1=right or up | 2=left or down
let s = 10;      // square size
let score = 0;
let screen = [400,400];



function preload() {
    
}

function setup(){
    font = loadFont('press_start.ttf');
    createCanvas(screen[0],screen[1]);
    new_block();

    textSize(20);
    textAlign(10, 10);
}

function draw(){
    background(0,0,0);
    draw_border();


    fps[0] += 1;
    if(fps[0] >= 30/fps[1]){
        fps[0] = 0;
        joystick();


        
    }
    
    fill(255, 0, 0);
    rect(eni[0]+s, eni[1]+s, s, s);
    draw_tail();

    fill(0, 102, 153);
    text('SCORE:'+tail.length, 10, 10, 70, 80);
    rect(pos[0], pos[1], s, s);

    check_crash();

    
}

function new_block(){
    let x = random(400 - 2 * s);
    let y = random(400 - 2 * s);
    eni = [x,y];
}

function joystick(){

    if (keyIsDown(LEFT_ARROW)) {
        mov[0] = 2;
        mov[1] = 0;
    }else if (keyIsDown(RIGHT_ARROW)) {
        mov[0] = 1;
        mov[1] = 0;
    }else if (keyIsDown(UP_ARROW)) {
        mov[0] = 0;
        mov[1] = 2;
    }else if (keyIsDown(DOWN_ARROW)) {
        mov[0] = 0;
        mov[1] = 1;
    }
    moving();    
}

function moving(){

    for(i=tail.length-1;i>0; i--){
        tail[i] = tail[i-1];
    }
    if(tail.length>0){
        tail[0]= (mov[0] * 1) + (mov[1] * 3);
    }

    if(mov[0] == 1){
        pos[0] += s;
    }else if (mov[0] == 2){
        pos[0] -= s;
    }

    if(mov[1] == 1){
        pos[1] += s;
    }else if (mov[1] == 2){
        pos[1] -= s;
    }

    capture();    
}

function capture(){
    let border = Math.floor(s/2);
    let p_x = pos[0];
    let p_y = pos[1];
    let e_x = eni[0]+s;
    let e_y = eni[1]+s;
   
    if ( p_x+border >= e_x-border && p_x-border <= e_x+border){
        if ( p_y+border >= e_y-border && p_y-border <= e_y+border){
            score += 1;
            let side = (mov[0] * 1) + (mov[1] * 3);            
            tail.push(side);
            new_block();
            if(tail.length % 3 == 0){ // increase speed
                fps[1] += 1;
                console.log(fps[1]);
            }

        }
    }

}

function check_crash(){
    if(pos[0] < s || pos[0] > screen[0] - 2*s || pos[1] < s || pos[1] > screen[1] -2*s){
        game_over();
    }
}

function draw_tail(){
    let dir = (mov[0] * 1) + (mov[1] * 3);
    let x = pos[0];
    let y = pos[1];
    
    for(i=0; i<tail.length; i++){
        if (dir == 1){
            x = x - s;
        }else if(dir == 2){
            x = x + s;
        }else if(dir == 3){
            y = y - s;
        }else{
            y = y + s;
        }

        if (x == pos[0] && y == pos[1]){
            game_over();

        }

        fill(255, 0, 0);
        rect(x, y, s, s);
        dir = tail[i];        
    }
    
}

function draw_border(){

    let x = s;
    let y = 0;

    for(i=0;i<screen[0];i = i+s){
        rect(i, 0, s, s);
    }

    for(i=0;i<screen[0];i = i+s){
        rect(i, screen[1] - s, s, s);
    }

    for(i=0;i<screen[1];i = i+s){
        rect(0, i, s, s);
    }

    for(i=0;i<screen[1];i = i+s){
        rect(screen[0] - s,i, s, s);
    }


}

function game_over(){
    fps[1] = 0;
    text('GAME OVER', 150, 100, 150, 150);  
}
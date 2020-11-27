let screen = [800,600];
let sprites;
let pixel = 4;
let score = 0;
let num_enemys = [4,9];
let enemy_pos = [0,0];
let dir = [1,0];
let fps = [0,45];
let shoting = [];


let player = {
    x :  screen[0] / 2,
    y : screen[1] - 20
}


let p1 = player;
let enemy = [];

function preload() {

    sprites = loadJSON('assets/space_invaders.json');

}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
//    frameRate(1);

    for(i=0;i<num_enemys[0];i++){
        enemy.push([]);
        for(j=0;j<num_enemys[1];j++){
            let x = (j+1) * pixel * 4;
            let y = (i+1) * pixel * 3;
            enemy[i].push(new Enemy(x,y));
        }
    }
}

function draw() {
    background(0, 0, 0);
    fill(255,0,0);
    text("SCORE: "+score, 10, 10, 150, 150);

    fps[0] += 1;
    if(fps[0] >= fps[1]){
        fps[0] = 0;
        enemy_pos[0] = 10;
        enemy_pos[1] = 4;

    }
    for(i=0;i<shoting.length;i++){
        shoting[i].show();
    }

    draw_sprite(p1.x,p1.y,"player");  
    show_enemys();
    joystick();
    
}

function show_enemys(){

    for(let i=0;i<num_enemys[0];i++){
        for(let j=0;j<num_enemys[1];j++){
            if(enemy[i][j].live){ 

                let x = enemy[i][j].x; // * pixel + pixel* (j*10) + 30;
                let y = enemy[i][j].y; // * pixel + pixel* (i*5) + 50;
                let kind = enemy[i][j].kind;   
                if(x >= width - pixel * 23){
                    if(dir[0] > 0){
                        fps[1] -= 1;
                    }                          
                    dir[0] = -1;
//                    dir[1] = 1;    
        
                    
                }else if(x <= 10){
//                    if(dir[0] < 1){
//                        fps[1] -= 1;
//                    }
                    dir[0] = 1;  
                    dir[1] = pixel;
                    
                  
                }
                enemy[i][j].hit()

                enemy[i][j].move(enemy_pos[0],enemy_pos[1]);      
                draw_sprite(x,y,kind);

            }
        }
    }
    enemy_pos = [0,0];
    dir[1] = 0;
}

function draw_sprite(x,y,EN){
    ln = sprites[EN].sprite01.dots
//    alert([x,y,EN]);
    for(i=0;i<ln.length;i++){        
        let x1 = x + ln[i][0]*pixel;
        let y1 = y - ln[i][1]*pixel;
        rect(x1,y1, pixel, pixel);
    }
    
}


function joystick(){
    if(keyIsDown(LEFT_ARROW)) {    
        p1.x -= 2;
    }else if(keyIsDown(RIGHT_ARROW)) {    
        p1.x += 2;

    }
}

function Enemy(x,y){
    this.x = x * pixel + 5,
    this.y = y * pixel + 5,

    this.kind = "squid";
    if(y > pixel * 3){
        this.kind = "crab";                
    }
    if(y > pixel * 9){
        this.kind = "octopus";                
    }
    this.live = true; 
    this.move = function(hor,ver){
        this.x += hor * dir[0];
        this.y += ver * dir[1]; 

        if(this.y > p1.y - 10 && this.live){
            alert("GAME OVER!!!");
            noLoop();
            return;
        }   

    }
    this.hit = function(){

        if(shoting.length > 0){           
            if(shoting[0].x > this.x &&  shoting[0].x < this.x + 10 * pixel && this.y > shoting[0].y && shoting[0].y < this.y + 10 * pixel){
                this.live = false;
                shoting.splice(0, 1);
                score += 100;
                fps[1] -= 1;
                if(score == num_enemys[0] * num_enemys[1] * 100){
                    alert("Congatulations, you save the world !!!");
                    noLoop();
                }
                
            }
        }           

    }
  
}

function Shot(x){
    this.x = x + pixel*4;
    this.y = screen[1] - 35;
    this.show = function(){
        this.y -= 3;
        rect(this.x,this.y,5,10);
        if(this.y < 10){
            shoting.splice(0, 1);
        }
    }
}


function keyPressed() {
    keyIndex = key.charCodeAt(0);

    if(keyIndex == 32 || keyCode === UP_ARROW){ // SPACE OR UP => TURN THE PIECE
        if(shoting.length < 1){
            shoting.push(new Shot(p1.x));
        }
    }
}


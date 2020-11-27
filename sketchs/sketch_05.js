let screen = [400,400];
let grid = [10,10];
let box = [(screen[0]/grid[0]),(screen[1]/grid[1])];
let board = [];

//function preload() {}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    for(i=0;i<grid[0]+1;i++){
        board.push([]);
        for(j=0;j<grid[1]+1;j++){
            let rand = Math.floor(random(0,10));
            let bomb =  false;
            if(rand %6 == 0){
                bomb = true;
            }
            board[i].push(new Cell(i,j, bomb));
        }
    }
    count_neighbors();

}

function draw() {
    background(255, 255, 255);

    let x = Math.floor(map(mouseX,0,screen[0],0,grid[0]));
    let y = Math.floor(map(mouseY,0,screen[1],0,grid[1]));
    if(x < 0){ x = 0; }else if(x >= grid[0]){ x = grid[0] - 1; }
    if(y < 0){ y = 0; }else if(y >= grid[1]){ y = grid[1] - 1; }
    if (mouseIsPressed) {        
        if (mouseButton === LEFT) {
            board[x][y].mark(0);
          }
          if (mouseButton === CENTER) {
            board[x][y].mark(1);
          }        
      }

    draw_grid();
}


function draw_grid(){
    let win = true;
    for(i=0;i<grid[0];i++){
        for(j=0;j<grid[1];j++){
            board[i][j].print();
            if(!board[i][j].show){
                win = false;
            }

        }
    }
    if(win){
        alert("Congratulations!!!")
        noLoop();    
    }
}


function Cell(x,y,b){
    this.x = x;
    this.y = y;
    this.bomb = b;
    this.show = false;
    this.neighbors = 0;
    this.player_say = "";
    this.print = function(){
        if(this.show){
            rect(this.x * box[0], this.y * box[1], box[0], box[1]);
            if(!this.bomb){
                fill(0, 0, 255);
                text(this.player_say, this.x * box[0] + (box[0]/2) , this.y * box[1] + (box[1]/2));
                noFill();
            }else{
                fill(255, 0, 0);
                text(this.player_say, i*box[0] + (box[0]/2) , j*box[1]+ (box[1]/2));
                noFill();
            }            
        }else{
            rect(this.x * box[0], this.y * box[1], box[0], box[1]);
        }
    }

    this.mark = function(N){
        this.show = true;
        if(N == 0){
            if(this.bomb){
                this.player_say = "B";
                alert("Game Over!!!")
                noLoop();
            }else{
                this.player_say = this.neighbors;
            }
            
        }else{
            this.player_say = "B";
        }

    }



}

function count_neighbors(){
    for(x=0;x<grid[0];x++){
        for(y=0;y<grid[1];y++){
            board[x][y].neighbors = 0;
            if(!board[x][y].bomb){
                for(i=-1;i<=1;i++){
                    for(j=-1;j<=1;j++){
                        let n_x = x + i;
                        let n_y = y + j;            
                        if(n_x >= 0 && n_x < grid[0] && n_y >= 0 && n_y < grid[1]){
                            if(board[n_x][n_y].bomb){
                                board[x][y].neighbors += 1;
                            }
                        }
                    }
                }
            }
        }
    }



 
}
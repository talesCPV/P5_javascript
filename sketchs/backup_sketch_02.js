let fps = [0, 1]; // cont | fps
let screen = [400, 400];

let score = 0;
let square = 10; // square size
let box = [10, 20];
let board = [];
let next = [2,0];
let pivot = [5, 20, 0]; // X | Y | Spin
let main_piece = [];

let width = (box[0] + 2) * square;
let height = (box[1] + 1) * square
let pieces = [ [[-1, 0],[1, 0],[2, 0]], [[0, -1],[1, -1],[1, 0]], [[0, -1],[1, 0],[2, 0]], [[-1, 0],[0, -1],[1, -1]], [[-1, 0],[0, -1],[1, 0]] ];

//function preload() {}

function setup() {

  createCanvas(screen[0], screen[1]);
  textSize(20);
  textAlign(10, 10);

  
  for(x=0; x<(box[0]+2); x++){ // fill board
    board.push([]);
    for(y=0; y<box[1]+1; y++){
      if(x == 0 || x == box[0]+1 || y == 0){ // edges
        board[x].push(1);
      }else{
        board[x].push(0);
      }
    }
  }
    
  new_piece();
  
}

function draw() {
  background(0, 0, 0);
  fill(0, 102, 153);

  text('SCORE:' + score, 10, 10, 70, 80);
  text('Next:', 10, 40, 70, 80);
  draw_next_piece([80, 45], next[0]);

  fps[0] += 1;
  if (fps[0] >= 30 / fps[1]) {
    fps[0] = 0;

    if (!crash([0,-1])){
      pivot[1] -= 1;
    }else{
      rec_piece();
    }  
    
  }

  draw_board();
  draw_piece();
 
  
}

function keyPressed() {
  keyIndex = key.charCodeAt(0);

  if(keyIndex == 32 || keyCode === UP_ARROW){ // SPACE OR UP => TURN THE PIECE
    let aux = pivot[2];
    pivot[2] -= 1;
    if(pivot[2] > 3){
      pivot[2] = 0;
    }    
    if(pivot[2] < 0){
      pivot[2] = 3;
    }

    refresh_main_piece();

    if(crash([0,0])){      
      pivot[2] = aux;
      refresh_main_piece();
    }

  }else if(keyCode === LEFT_ARROW){    
    if (!crash([-1,0])){
      pivot[0] -= 1;
    }
  }else if(keyCode === RIGHT_ARROW){
    if (!crash([1,0])){
      pivot[0] += 1;
    }
  }else if(keyCode === DOWN_ARROW){
//    stop();

    if (!crash([0,-1])){
      pivot[1] -= 1;
    }else{
      rec_piece();
    }
 
  }
}


function new_piece(){  
  next[1] = next[0];
  next[0] = Math.floor(Math.random() * 5);  
}

function draw_next_piece(pivot, piece) {
  let x = pivot[0];
  let y = pivot[1];

  rect(x, y, square, square);

  for (i = 0; i < pieces[next[0]].length; i++) {
    let n_pos = pieces[piece][i];
    x = pivot[0] + n_pos[0] * square;
    y = pivot[1] + n_pos[1] * square;
    rect(x, y, square, square);
  }
}

function draw_board(){
  for(x=0; x<board.length; x++){
    for(y=0; y<board[0].length; y++){
        
      if(board[x][y] == 1){
        let px = square +  Math.floor(screen[0] / 2 - width / 2) + (x * square);
        let py = screen[1] - square * 4 - (y * square); 

        if(x == 0 || x == box[0]+1 || y == 0){
          fill(255, 0, 0);
        }else{
          fill(0, 102, 153);
        }        
        rect(px, py, square, square);
                
      }      
    }    
  }    
}

function draw_piece() {
  
  refresh_main_piece();

  fill(0, 102, 153);0
  for(i=0; i<main_piece.length; i++ ){

    let px = square +  Math.floor(screen[0] / 2 - width / 2) + (main_piece[i][0] * square);
    let py = screen[1] - square * 4 - (main_piece[i][1] * square); 

    rect(px, py, square, square);

  }

}

function refresh_main_piece(){
  main_piece = [[pivot[0],pivot[1]]];  
  for (i = 0; i < pieces[next[1]].length; i++) {

    let coord = turn_piece(pivot[2],pieces[next[1]][i]);
    let x = coord[0] + pivot[0];
    let y = coord[1] + pivot[1];
    
    main_piece.push([x,y]);

  }
}

function turn_piece(spin,xy) {
  p_xy = Array.from(xy);
  for(n=0; n<spin; n++) {
    let aux = p_xy[1] * -1;
    p_xy[1] = p_xy[0];
    p_xy[0] = aux
  }
  return p_xy;
}

function rec_piece(){
  for(i=0; i<main_piece.length; i++ ){
    x = main_piece[i][0];
    y = main_piece[i][1];
    board[x][y] = 1;
    if(check_line(y) > 0){
      drop_line(y);
    }
  }
  new_piece();
  pivot = [5, 20, 0];

}

function crash(pos){

  let resp = false;

  for(i=0; i<main_piece.length; i++ ){
    let x = main_piece[i][0] +  pos[0];
    let y = main_piece[i][1] +  pos[1];

    if(x >= 0 && x < board.length){
      if(board[x][y] == 1){
        resp = true;
      }  
    }else{
      resp = true;
    }
  }
  return resp;
}


function check_line(line){
  let resp = line;
  for(x=0; x< board.length; x++){
    if(board[x][line] == 0){
      resp = 0;
    }
  }
  return resp;
}

function drop_line(line){
  console.log(line);
let aux_ln = [];

for(y=board[0].length; y >=line; y--){

}


}

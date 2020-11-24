/*
    PROGRAMER BY: TALES C. DANTAS
    EMAIL: tales@flexibus.com.br
    22/11/2020
*/

let screen = 400;
let board = [["","",""],
             ["","",""],
             ["","",""]];
let square = Math.floor(screen / 3);   
let half = Math.floor(square/2);
let margin = Math.floor(square/4);
let turn = Math.floor(Math.random() * 2 );

function setup() {
    frameRate(10);
    createCanvas(screen, screen);
    textSize(20);
    textAlign(10, 10);
    console.log(turn)   ;
}

function draw() {
    background(0, 0, 0);
    draw_board();
    let x = Math.floor(map(mouseX,0,screen,0,3));
    let y = Math.floor(map(mouseY,0,screen,0,3));
    if (mouseIsPressed) {
        if(board[y][x] == ""){
            board[y][x] = "x";
            turn = 1;              
        }

      }
      play();
      
}

function draw_board(){
    stroke(255,0,0);
    line(0,square, screen,square);
    line(0,square*2, screen,square*2);
    line(square,0, square,screen);
    line(square*2,0, square*2,screen);
    plot();
    winner("0");
    winner("x");
}

function plot(){
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            if(board[j][i] == "x"){
                line(i*square+margin,j*square+margin, (i+1)*square-margin,(j+1)*square-margin);
                line((i+1)*square-margin,j*square+margin,i*square+margin ,(j+1)*square-margin);
            }else if(board[j][i] == "0"){

                noFill();
                ellipse(i*square+half, j*square+half, half, half);               
            }
        }
    }
}

function play(){

    if(turn == 1){ 

    
        let resp =  check("0",2);
        if(resp != -1){
            board[resp[0]][resp[1]] = "0";
            turn = 0;        
            return
        }    

        resp =  check("x",2);
        if(resp != -1){
            board[resp[0]][resp[1]] = "0";
            turn = 0;
            return
        }



        let x = Math.floor(Math.random() * 3 );
        let y = Math.floor(Math.random() * 3 );

        let opt = [];
        for(x=0;x<3;x++){
            for(y=0;y<3;y++){
                if(board[x][y] == ""){
                    opt.push([x,y]);
                }
            }
        }

        if(opt.length > 0){
            let P = Math.floor(Math.random() * opt.length);
            console.log(opt[P]);
            board[opt[P][0]][opt[P][1]] = "0";
            turn = 0;
            return


        }else{
            noLoop();
            alert("Tied Game!!");   
            return
        }


    }


}

function check(L,N){
    let count = [0,0];
    let out = [[0,0],[0,0]];
        for(i=0; i<3; i++){// check lines, cols
            for(j=0; j<3;j++){
                if(board[j][i] == L){
                    count[0] += 1;
                }else if(board[j][i] == ""){
                    out[0] = [j,i];
                }
                if(board[i][j] == L){
                    count[1] += 1;
                }else if(board[i][j] == ""){
                    out[1] = [i,j];
                }                
            }

            if(count[0] == 3 || count[0] == 3 ){
                return L;
            }
            if(count[0] == N && board[out[0][0]][out[0][1]] == ""){
                return out[0];
            }else if(count[1] == N && board[out[1][0]][out[1][1]] == ""){
                return out[1];
            }  
            count = [0,0];
            out = [[0,0],[0,0]];                       
        }
   
        for(i=0; i<3; i++){// check diagonals      
            if(board[i][i] == L){
                count[0] += 1;
            }else if(board[i][i] == ""){
                out[0] = [i,i];
            }
            if(board[i][2-i] == L){
                count[1] += 1;
            }else if(board[i][2-i] == ""){
                out[1] = [i,2-i];
            }
                    
        }

        if(count[0] == 3 || count[0] == 3 ){
            return L;
        }
        if(count[0] == N && board[out[0][0]][out[0][1]] == ""){
            return out[0];
        }else if(count[1] == N && board[out[1][0]][out[1][1]] == ""){
            return out[1];
        }      

        return -1;
}

function winner(L){
    let resp = new_check(L,3);
    if(resp != -1){
        stroke(255,255,0);
        line(resp[0][1]* square + half,resp[0][0]* square + half, resp[2][1]* square + half,resp[2][0]* square + half);        
        noLoop();
        alert("Winner: "+L);
    }

}

function new_check(L,N){
    let lines;
    let cols;
    for(i=0;i<3;i++){
        lines = [];
        cols = [];
        diag_1 = [];
        diag_2 = [];
        for(j=0;j<3;j++){
            if(board[i][j] == L){
                lines.push([i,j]);
            }
            if(board[j][i] == L){
                cols.push([j,i]);
            }
            if(board[j][j] == L){
                diag_1.push([j,j]);
            }
            if(board[j][2-j] == L){
                diag_2.push([j,2-j]);
            }
        }
        if(lines.length == N){
            console.log("lines "+lines);
            return lines;
        }else if(cols.length == N){
            console.log("cols "+cols);
            return cols
        }else if(diag_1.length == N){
            console.log("diag 1 "+diag_1);
            return diag_1;
        }else if(diag_2.length == N){
            console.log("diag 2 "+diag_2);
            return diag_2;
        }
    }
    return -1;
}
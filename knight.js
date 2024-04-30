// knight exercise

const board = [];// create the board!
for (let i = 0; i < 8; i++) {
  board[i] = [];
}

const boardmoves = [];// create anther board!
for (let i = 0; i < 10; i++) {
  boardmoves[i] = [];
  for (let j = 0; j < 2; j++) {
    boardmoves[i][j] = [];
  }
}
let z = 0;

const addMove = (x, y, level) => {  //insert the initial position!
  if ((x >= 0) && (x <= 7) && (y >= 0) && (y <= 7) && board[x][y] == null) {
    board[x][y] = level;
  }
}

/* const addAllMoves = (x, y, level) => { // knight movements
  addMove(x + 1, y + 2, level);
  addMove(x + 2, y + 1, level);
  addMove(x + 2, y - 1, level);
  addMove(x + 1, y - 2, level);
  addMove(x - 1, y - 2, level);
  addMove(x - 2, y - 1, level);
  addMove(x - 2, y + 1, level);
  addMove(x - 1, y + 2, level);
}
 */
const addAllMoves = (x, y, level) => { // knight movements 
  addMove(x + 1, y + 2, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x + 1, y + 2];
  addMove(x + 2, y + 1, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x + 2, y + 1];
  addMove(x + 2, y - 1, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x + 2, y - 1];
  addMove(x + 1, y - 2, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x + 1, y - 2];  
  addMove(x - 1, y - 2, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x - 1, y - 2];
  addMove(x - 2, y - 1, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x - 2, y - 1];
  addMove(x - 2, y + 1, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x - 2, y + 1];
  addMove(x - 1, y + 2, level);
    boardmoves[z++][0] = [x, y];
    boardmoves[z][1] = [x - 1, y + 2];
}
/* 
const paths1 = (i,j) => {
  //for ( let m = 0; m < 8; m++){
    boardmoves[z++][0] = [i, j];
    boardmoves[z][1] = [i, j];
  //}
} */
const addAllPossible = (level) => { // scan the board 
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === level) {
        //paths1(i,j);
        //boardmoves[0][z++] = [i, j];
        addAllMoves(i, j, level + 1); // call moves function 
      }
    }
  }
}

const findPath = (startX, startY, endX, endY) => {
  addMove(startX, startY, 0); // call the function to insert initial position
  let index = 0;
  do {
    addAllPossible(index++); // start with 0
  } while (board[endX][endY] == null);
  return board[endX][endY];
}

console.log(findPath(3, 3, 1, 4));
console.log(boardmoves.length);
console.log(boardmoves);
console.log(board);

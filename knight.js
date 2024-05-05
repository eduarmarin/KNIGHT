// knight exercise

const board = [];// create the board!
for (let i = 0; i < 8; i++) {
  board[i] = [];
}

const boardMoves = [];// create another board with every internal move!
for (let i = 0; i < 40; i++) {
  boardMoves[i] = [];
  for (let j = 0; j < 2; j++) {
    boardMoves[i][j] = [];
  }
}
var z = 0;

const addMove = (a, b, x, y, level) => {  //insert level; level says how many step take it 
  if ((x >= 0) && (x <= 7) && (y >= 0) && (y <= 7) && board[x][y] == null) {
    board[x][y] = level;
    boardMoves[z][0] = [a, b]; // fill the boardMoves with inicial and final square 
    boardMoves[z][1] = [x, y]; // every iteration 
    z++;
  }
}

const addAllMoves = (x, y, level) => { // goes to every possible knight move
  addMove(x, y, x + 1, y + 2, level);
  addMove(x, y, x + 2, y + 1, level);
  addMove(x, y, x + 2, y - 1, level);
  addMove(x, y, x + 1, y - 2, level);
  addMove(x, y, x - 1, y - 2, level);
  addMove(x, y, x - 2, y - 1, level);
  addMove(x, y, x - 2, y + 1, level);
  addMove(x, y, x - 1, y + 2, level);
}
const addAllPossible = (level) => { // scan the board 
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === level) {
        addAllMoves(i, j, level + 1); // call moves function 
      }
    }
  }
}

const findPath = (startX, startY, endX, endY) => {
  addMove(startX, startY, startX, startY, 0); // call the function to insert initial position
  let index = 0;
  do {
    addAllPossible(index++); // start with 0
  } while (board[endX][endY] == null);
  return board[endX][endY];
}

const allmoves = [];
const findMoves = (endX, endY) => {
  for (i = 0; i < z; i++){
    if (boardMoves[i][1][0] == endX && boardMoves[i][1][1] == endY){
       console.log("last move: " + boardMoves[i][1]);
       const lastcell = boardMoves.slice(i, i + 1);
       allmoves.push(lastcell);
       console.log(allmoves[0]);
    }
  }
}

console.log("moves: " + findPath(3, 3, 4, 6)); // 1 move 3, 3, 1, 4 ----------- 2 move 3, 3, 4, 6
//console.log(boardMoves.length);
//console.log(boardMoves);
//console.log("this is z: " + z);
findMoves(4, 6);
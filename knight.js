// knight exercise

const board = [];// create the board!
for (let i = 0; i < 8; i++) {
  board[i] = [];
}

const boardMoves = [];// create another board with every internal move!
for (let i = 0; i < 40; i++) { // iteration to initialize boradMoves matriz <-----------------
  boardMoves[i] = [];
  for (let j = 0; j < 2; j++) {
    boardMoves[i][j] = [];
  }
}

var z = 0;

const addMove = (a, b, x, y, level) => {  //insert level; level says how many step take it 
  if ((x >= 0) && (x <= 7) && (y >= 0) && (y <= 7) && board[x][y] == null) {
    board[x][y] = level;
    boardMoves[z][0] = [a, b]; // fill the boardMoves with inicial and final square move
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
//-------------------------------------------------------------------------------------------------------------
const lastmove = [];           // this one help to compare every array iniside boardMoves
for (let i = 0; i < 40; i++) { 
  lastmove[i] = [];
  for (let j = 0; j < 2; j++) {
    lastmove[i][j] = [];
  }
}
const allmoves = [];           // this is a matriz to save moves connect to the last one, it'll save pairs 
for (let i = 0; i < 40; i++) { 
  allmoves[i] = [];
  for (let j = 0; j < 2; j++) {
    allmoves[i][j] = [];
  }
}

const findMoves = (endX, endY) => {
  for (i = z; i >=0 ; i--){
    if (boardMoves[i][1][0] == endX && boardMoves[i][1][1] == endY){ // find and compare the last move
      lastmove = boardMoves.slice(i, i + 1); //then add it to another array
      allmoves.push(boardMoves.slice(i, i + 1));
    }
    // if (boardMoves[i][1][0] == lastmove[0][0][0] && boardMoves[i][1][1] == lastmove[0][0][1]){
    //   lastmove = boardMoves.slice(i, i + 1);
    //   allmoves.push(boardMoves.slice(i, i + 1));
    // }
    //console.log("last square: " + boardMoves[i][1]);
    //console.log("i lastmove: " + i + " last move: " + lastmove);
    // console.log("allmoves: ");
    // console.log(allmoves);
    console.log("lastmove: ");
    console.log(lastmove[0]);
  }
}

console.log("moves: " + findPath(3, 3, 4, 6)); // 1 move 3, 3, 1, 4 ----------- 2 move 3, 3, 4, 6
//console.log(boardMoves.length);
//console.log(boardMoves);
//console.log("this is z: " + z);
findMoves(4, 6);
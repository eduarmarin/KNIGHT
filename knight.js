// knight exercise
// initial code taken from https://unicorn-utterances.com/posts/chess-knight-problem
const board = [];// create the board
for (let i = 0; i < 8; i++) {
  board[i] = [];
}

const boardMoves = [];// create another board with every internal move!
for (let i = 0; i < 100; i++) { // iteration to initialize boradMoves matriz
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
  const findMoves = (endX, endY) => { // this function will save and display every move from the first one to the last one
    var lastmove = [];           // initialize a new matriz to help to compare every array inside boardMoves
    for (let i = 0; i < 40; i++) { 
      lastmove[i] = [];
      for (let j = 0; j < 2; j++) {
        lastmove[i][j] = [];
      }
    }
    var allmoves = [];           // matriz to save moves connect to the last one, it'll save pairs 
    for (i = z; i >=0 ; i--){
      if (boardMoves[i][1][0] == endX && boardMoves[i][1][1] == endY){ // find and compare from the last move to the first one
        lastmove = boardMoves.slice(i, i + 1);                         //then add it to another array
        allmoves.push(boardMoves.slice(i, i + 1));
      }
      if (boardMoves[i][1][0] == lastmove[0][0][0] && boardMoves[i][1][1] == lastmove[0][0][1]){ //reassign to compare again and push last array pair
        lastmove = boardMoves.slice(i, i + 1);
        allmoves.push(boardMoves.slice(i, i + 1));
      }
    }
    //const allmovesr = allmoves.slice(1, allmoves.length - 2).reverse();
    var j = 1;
    for (i = allmoves.length - 2; i >0 ; i--){ // display move by move
      console.log("move: " + j++);
      console.log(allmoves[i][0][0][0] + ",  " + allmoves[i][0][0][1]);
    }
    return allmoves;
  }
//--------------------------------------------------- test --------------------------------------------
var startX = 0;   // start point
var startY = 0;
var endX = 3;     // final point
var endY = 3;

console.log("moves: " + findPath(startX, startY, endX, endY));
findMoves(endX, endY);                                                                                     
//const findMoves = require('./knight');
//const findPath = require("./knight.js");

var center = document.createElement('div'); // Create a div to center all the elements
center.style.display = "flex";
center.style.alignItems = "center";
center.style.justifyContent = "center";
center.style.flexDirection = "column";

// Create a table element  --> chessboard --------------------------------------------------------------------
var ChessTable = document.createElement('table');
for (var i = 0; i < 8; i++) {
    let tr = document.createElement('tr'); // Create a row
    for (var j = 0; j < 8; j++) {
        let td = document.createElement('td');// Create a cell
        td.textContent = [i, j]; //and fill every cell with tr and td   < ------------------------------------
        if ((i + j) % 2 == 0) { // If the sum of cell coordinates is even then color the cell white
            td.classList.add('cell', 'whitecell');
            tr.appendChild(td);
        }
        else {  // If the sum of cell coordinates is odd the color the cell black
            td.classList.add('cell', 'blackcell');
            tr.appendChild(td);
        }
    }
    ChessTable.appendChild(tr);
}

// from here read clicks and save them ---> cellstore --------------------------------------------------------------
var cellstore = [];
var x = 0;
function getindex (){
    var celllist = document.getElementsByClassName('cell');
    for (var i = 0 ; i < celllist.length; i++) {
        celllist[i].addEventListener('click', function () { // listen click on chessboard
            this.classList.add('blue');
            this.style.transform = "scale(1.08, 1.08)";
            var indexcell=this.innerHTML; //this is string of 3 index
            if(x == 0){
                cellstore[0] = indexcell[0]; //startX
                cellstore[1] = indexcell[2]; //startX
                x++;
            }else{
                cellstore[2] = indexcell[0]; //endX
                cellstore[3] = indexcell[2]; //endY
                x = 0;
                console.log("moves: " + findPath(cellstore[0], cellstore[1], cellstore[2], cellstore[3]));
                findMoves(cellstore[2], cellstore[3]);
            }
            //console.log("cellstore " + cellstore);
        });
    }
}
center.appendChild(ChessTable); // Modifying table attribute properties------------------------------------------
ChessTable.setAttribute('cellspacing', '0');
ChessTable.setAttribute('width', 'auto');
document.body.appendChild(center);
getindex();

//-------findpath and findMoves functions-------------------------------------------------------------------------
//-------findpath and findMoves functions-------------------------------------------------------------------------

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
    const allmovesr = allmoves.slice(1, allmoves.length - 2).reverse();
    var j = 1;
    var text = [] // array to save every string
    for (i = allmoves.length - 2; i >0 ; i--){  // loop to display move by move
      var text1 = allmoves[i][0][0].toString(); // convert every move to string to allow comparing with
      text.push(text1);                         // textcontent of every cell
      console.log("move: " + j++);
      console.log(allmoves[i][0][0] + " to " + allmoves[i][0][1]);
      console.log("to string: " + text + " lenght: " + text.length);
    }
    return allmovesr;
  }
var z = 0;

var container = document.createElement('div');
container.style.display = "flex";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.flexDirection = "column";

var center = document.createElement('div'); // Create a div to center all the elements

var info = document.createElement('div'); //
var infomoves = document.createElement('div'); // how many moves

info.appendChild(infomoves);
container.appendChild(center);

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
var click = 0;
function getindex (){
    let celllist = document.getElementsByClassName('cell');    // <------------------------------------------------
    for (let i = 0 ; i < celllist.length; i++) {
        celllist[i].addEventListener('click', function () { // listen click on chessboard
            this.style.transform = "scale(1.08, 1.08)";
            let indexcell=this.innerHTML; //this is string of 3 index
            if(click == 0){
                //z = 0;
                cellstore.lenght = 0;
                this.classList.add('blue');
                cellstore[0] = indexcell[0]; //startX
                cellstore[1] = indexcell[2]; //startX
                infomoves.textContent = ("moves: ");
                removered();
                click = 1;
            }else{
                this.classList.add('blue');
                cellstore[2] = indexcell[0]; //endX
                cellstore[3] = indexcell[2]; //endY
                click = 0;
                //z = 0; bug
                removeblue();

                var infocontedor = findPath(cellstore[0], cellstore[1], cellstore[2], cellstore[3]);
                infomoves.textContent = ("moves: " + infocontedor);
                center.appendChild(info);
                console.log("moves: " + infocontedor);
                //console.log("moves: " + findPath(cellstore[0], cellstore[1], cellstore[2], cellstore[3]));
                //indexcell.length = 0;
                findMoves(cellstore[2], cellstore[3]);
            }
            //console.log("cellstore " + cellstore);
        });
    }
		//return celllist;
}
center.appendChild(ChessTable); // Modifying table attribute properties------------------------------------------
ChessTable.setAttribute('cellspacing', '0');
ChessTable.setAttribute('width', 'auto');
document.body.appendChild(container);
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

const addMove = (a, b, x, y, level) => {  //insert level; level says how many step take it 
  //console.log("board: "); 
  if ((x >= 0) && (x <= 7) && (y >= 0) && (y <= 7) && board[x][y] == null) {
    board[x][y] = level;
    boardMoves[z][0] = [a, b]; // fill the boardMoves with inicial and final square move
    boardMoves[z][1] = [x, y]; // every iteration 
    z++;
    //console.log("addmove z: " + z);
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
  //console.log("findpath z: " + z);
  addMove(startX, startY, startX, startY, 0); // call the function to insert initial position
  let index = 0;
  do {
    addAllPossible(index++); // start with 0
  } while (board[endX][endY] == null);
  //z = 0; bug
  return board[endX][endY];
}

//-------------------------------------------------------------------------------------------------------------
var allmoves = [];           // matriz to save moves connect to the last one, it'll save pairs 
const findMoves = (endX, endY) => { // this function will save and display every move from 
	var lastmove = [];                // the first one to the last one
	for (let i = 0; i < 40; i++) { // initialize a new matriz to help to compare every array inside boardMoves 
		lastmove[i] = [];
		for (let j = 0; j < 2; j++) {
			lastmove[i][j] = [];
		}
	}
	for (let i = z; i >=0 ; i--){
    //console.log("z: " + z);
		if (boardMoves[i][1][0] == endX && boardMoves[i][1][1] == endY){ // find and compare from the last move to the first one
			lastmove = boardMoves.slice(i, i + 1);                         //then add it to another array
			allmoves.push(boardMoves.slice(i, i + 1));
		}
		if (boardMoves[i][1][0] == lastmove[0][0][0] && boardMoves[i][1][1] == lastmove[0][0][1]){ //reassign to compare again and push last array pair
			lastmove = boardMoves.slice(i, i + 1);
			allmoves.push(boardMoves.slice(i, i + 1));
		}
	}
  //z = 0; bug
	var j = 1;
	for (let i = allmoves.length - 2; i > 0 ; i--){  // loop to display list move by console
    var infopath = document.createElement('div'); // move by move
    infopath.textContent = ("move  " + j++ + " :     " + allmoves[i][0][0] + "   to   " + allmoves[i][0][1]);
    info.appendChild(infopath);
    //console.log("move: " + j++);
		//console.log(allmoves[i][0][0] + " to " + allmoves[i][0][1]);
  }  
  //cellstore.lenght = 0;
	everymove();
}

function everymove () { // highlight every move
	let celllist = document.getElementsByTagName('td');    // <------------------------------------------------
	for (let i = 0; i < celllist.length; i++){
		for (k = allmoves.length - 2; k >= 0 ; k--){
      if (celllist[i].textContent == allmoves[k][0][0] || celllist[i].textContent == allmoves[k][0][1]){
        celllist[i].classList.add('red');
      }
    }
  }
  celllist.length = 0;  
  //cellstore.length = 0; 
  allmoves.length = 0;   
  z = 0;
//  board.length = 0;
  for (let i = 0; i < 8; i++) {
    board[i] = [];
  }
  // for (let i = 0; i < 8; i++) {
  //   console.log("board: " + " i: " + i +" content: " + board[i]);
  // }
}

function removered (){
  let celllist = document.getElementsByTagName('td');    // <------------------------------------------------
  	for (let i = 0; i < celllist.length; i++){
      celllist[i].classList.remove("red");
    }
  // allmoves.length = 0;  
  // celllist.length = 0;  
}

function removeblue (){
  let celllist = document.getElementsByTagName('td');    // <------------------------------------------------
  	for (let i = 0; i < celllist.length; i++){
      celllist[i].classList.remove("blue");
    }
}

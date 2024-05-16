
var center = document.createElement('div'); // Create a div to center all the elements
center.style.display = "flex";
center.style.alignItems = "center";
center.style.justifyContent = "center";
center.style.flexDirection = "column";

var ChessTable = document.createElement('table'); // Create a table element
for (var i = 0; i < 8; i++) {
    let tr = document.createElement('tr'); // Create a row
    for (var j = 0; j < 8; j++) {

        let td = document.createElement('td');// Create a cell
        td.textContent = [i, j]; //and fill every cell with tr and td

        if ((i + j) % 2 == 0) { // If the sum of cell coordinates is even then color the cell white
            //<td.setAttribute("class", "whitecell");
            td.classList.add('cell', 'whitecell');
            tr.appendChild(td);
        }
        else {  // If the sum of cell coordinates is odd the color the cell black
            //td.setAttribute('class', 'blackcell');
            td.classList.add('cell', 'blackcell');
            tr.appendChild(td);
        }
    //   var x = document.getElementsByTagName("td");
    //   console.log("cordenadas: " + x.sectionRowIndex)
    }
    ChessTable.appendChild(tr);
}
var cellstore = [];
var x = 0;
function getindex (){
    var tdcolor = document.getElementsByClassName('cell');
    for (var i = 0 ; i < tdcolor.length; i++) {
        tdcolor[i].addEventListener('click', function () { // create function calculator to recall it
            this.classList.add('blue');
            this.style.transform = "scale(1.08, 1.08)";
            var indexcell=this.innerHTML;
            if(x == 0){
                cellstore[0] = indexcell[0]; 
                cellstore[1] = indexcell[2];
                x++;
            }
            else{ 
                cellstore[2] = indexcell[0]; 
                cellstore[3] = indexcell[2];
                x = 0;
            }
            console.log("cellstore " + cellstore);
        });
    }
}

center.appendChild(ChessTable); // Modifying table attribute properties
ChessTable.setAttribute('cellspacing', '0');
ChessTable.setAttribute('width', 'auto');
document.body.appendChild(center);
getindex();
//console.log("prueba " + tdcolor.length)
// wymiary grida
let columns = 60;
let rows = 60;

// tablica która trzyma komórki
const grid = new Array(columns);
for(let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
}

// wirtualna tablica która przechowuje stan gry
const grid2 = new Array(columns);
for(let i = 0; i < grid2.length; i++) {
    grid2[i] = new Array(rows);
}

// domyślnie wszystkie komórki martwe
for (let i = 0; i < rows; i++) { 
    for (let j = 0; j < columns; j++) { 
        grid2[i][j] = false; 
    } 
} 

// rysowanie grida
function drawGrid(){
    let container = document.getElementById("container");
    container.innerHTML = ""
    for (let i = 0; i < rows; i++) { 
        for (let j = 0; j < columns; j++)    { 
            let cell = document.createElement("div");            
            if(grid2[i][j]) {
                cell.classList.add("alive");
            }
            cell.addEventListener("click", () => {
                cell.classList.toggle("alive");                
            });
            grid[i][j] = cell;
            container.append(cell);
        }     
    }
}

// liczenie zywych sąsiadów
function countLiveNeighbors(row, col) {
    let count = 0;
    for(let i = row - 1; i <= row + 1; i++) {
        if (i >= 0 && i < rows){
            for(let j = col - 1; j <= col + 1; j++) {
                if (j >= 0 && j < columns){
                    if (i != row || j != col) {
                        count += grid[i][j].classList.contains("alive") ? 1 : 0;                        
                    }                    
                }                
            }            
        }            
    }
    return count;
}


let go = document.getElementById("go");
let go2 = document.getElementById("go2");

// inicjalizacja pustego grida
drawGrid();

// zyćko
function life(){
    for (let i = 0; i < rows; i++) { 
        for (let j = 0; j < columns; j++) { 
            if(grid[i][j].classList.contains("alive")) {
                grid2[i][j] = true;
            }
            if(countLiveNeighbors(i, j) == 3) {
                grid2[i][j] = true;
            }  
            if(countLiveNeighbors(i, j) != 2 && countLiveNeighbors(i, j) != 3) {
                grid2[i][j] = false;
            }                      
        } 
    } 
    drawGrid();
}
go.addEventListener("click", ()=>{
    change();
    go.classList.toggle('off');
});

let alive;

function change() {
    if (!alive) {
        alive = window.setInterval(life,100);
    } else {
        window.clearInterval(alive);
        alive = null;
    }
}

go2.addEventListener("click", ()=>{
    for (let i = 0; i < rows; i++) { 
        for (let j = 0; j < columns; j++) { 
            grid2[i][j] = Math.random() > 0.5 ? true : false;
        } 
    } 
    drawGrid();
});

//make 16x16 grid
const board = document.getElementById('board');
const slider = document.getElementById('gridRange');
const output = document.getElementById('value');
const colorPicked = document.getElementById('input-color');
let drawState = false;
let eraserState = false;
let color = colorPicked.value;

createGrid(slider.value);

function createGrid(number) {
    removeGrids();
    board.style.gridTemplateColumns = (`repeat(${number},1fr)`);
    board.style.gridTemplateRows = (`repeat(${number}, 1fr)`);

    for (i = 0;i < number*number;i++) {
        const div = document.createElement('div');
        // div.textContent = `${i}`;
        div.style.border = "solid 1px rgb(0,0,0,0.1)";
        div.style.backgroundColor = "white"

        div.addEventListener('click', e => {
            drawState = !drawState;
            //if drawstate is toggled with on a grid, 
            //pointer enter is not triggered so color the grid ourselves
            if (drawState) {
                div.style.backgroundColor = `${color}`;
            }
        });

        div.addEventListener( 'pointerenter', (e) => {
            if (drawState)
                div.style.backgroundColor = `${color}`;
        });

        board.appendChild(div);
    }
}


const clearButton = document.getElementById('clear_btn');
clearButton.addEventListener('click', (e) => {
    clearGrid();
})

const eraser = document.getElementById('eraser');
eraser.addEventListener('click', (e) => {
    color = 'white';
    if (eraserState) {
        eraserState = false;
        eraser.innerHTML = 'eraser'
        color = colorPicked.value;
    } else {
        eraserState = true;
        eraser.innerHTML = 'eraser ON';

    }
})

function clearGrid() {
    const divs = board.querySelectorAll('div');
    divs.forEach( grid => {
        grid.style.backgroundColor = 'white';
    })
}

function removeGrids() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
}

output.innerHTML = `${slider.value}x${slider.value}`;

slider.oninput = function() {
    output.innerHTML = `${slider.value}x${slider.value}`;
    createGrid(slider.value);
}

colorPicked.oninput = function() {
    if (!eraserState) {
        color = colorPicked.value;
    }
}
function initGrid(rows,columns) {
    let grid = document.getElementById('gameMap');
    while(grid.rows.length>0){
        grid.deleteRow(0);
    }
    for (let i = 0; i < rows; i++) {
        let row = grid.insertRow();
        row.className = 'gridRow';
        for (let j = 0; j < columns; j++) {
            const td = row.insertCell();
            td.className = 'gridColumn';
        }
    }
    dimCells('100',columns);
    addToken(0,0,'https://media.52poke.com/wiki/thumb/f/f4/Dream_%E7%B2%BE%E7%81%B5%E7%90%83_Sprite.png/109px-Dream_%E7%B2%BE%E7%81%B5%E7%90%83_Sprite.png?20211205074228')
}

function dimCells(dim,columns){
    let elems = document.getElementsByClassName('gridColumn');
    for(let i =0;i<elems.length;i++){
        elems[i].style.height=dim+'px';
        elems[i].style.width=dim+'px';
    }
    dim =columns*dim;
    let el = document.getElementById('gameMap');
    el.style.width = dim + 'px';

}

function addToken(row,column,tokenUrl){
    let grid = document.getElementById('gameMap');
    let img = document.createElement('img');
    img.src = tokenUrl;
    img.className = 'token';
    grid.rows[row].cells[column].appendChild(img);
}



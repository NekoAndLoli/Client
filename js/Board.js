let dim = 50;

let tokenId = 0;

let tokens = [
    "https://archives.bulbagarden.net/media/upload/7/79/Dream_Pok%C3%A9_Ball_Sprite.png",
    "https://archives.bulbagarden.net/media/upload/b/bf/Dream_Great_Ball_Sprite.png",
    "https://archives.bulbagarden.net/media/upload/a/a8/Dream_Ultra_Ball_Sprite.png"];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    if(ev.target.parentElement.className == "gridColumn"){
        //move action
    }
    else if(ev.target.parentElement.id == "tokenList"){
        //add action
    }
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


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
            td.ondrop = drop;
            td.ondragover = allowDrop;
            td.className = 'gridColumn';
        }
    }
    dimCells(dim,columns);
    addToken(0,0,tokens[0]);
}

function dimCells(dim,columns){
    let elems = document.getElementsByClassName('gridColumn');
    for(let i =0;i<elems.length;i++){
        elems[i].style.height=dim+'px';
        elems[i].style.width=dim+'px';
    }
    dim =columns*(dim+0.8)+0.8;
    let el = document.getElementById('gameMap');
    el.style.width = dim + 'px';

}

function addToken(row,column,tokenUrl){
    let grid = document.getElementById('gameMap');
    let img = document.createElement('img');
    img.src = tokenUrl;
    img.className = 'token';
    img.style.height = (dim)+"px";
    img.style.width = (dim)+"px";
    img.id = "token"+tokenId;
    img.draggable = true;
    img.ondragstart = drag;
    grid.rows[row].cells[column].appendChild(img);
}

initGrid(10,15);



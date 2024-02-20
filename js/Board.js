let dim = 50;

let tokenId = 0;
let menuTokenId = 0;
let tokens = [
    "https://archives.bulbagarden.net/media/upload/7/79/Dream_Pok%C3%A9_Ball_Sprite.png",
    "https://archives.bulbagarden.net/media/upload/b/bf/Dream_Great_Ball_Sprite.png",
    "https://archives.bulbagarden.net/media/upload/a/a8/Dream_Ultra_Ball_Sprite.png"];

let backgroundUrl = "url('https://media.52poke.com/wiki/f/ff/%E9%87%91%E9%BB%83%E5%B8%82_HGSS.png')";
function allowDrop(ev) {
    ev.preventDefault();
}

let rowStart;
let columnStart;

let tempAction = "";

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    if(ev.target.parentElement.className == "gridColumn"){
        //move action

        columnStart = ev.target.parentElement.cellIndex;
        rowStart = ev.target.closest("tr").rowIndex;
        tempAction = "moveToken";
    }
    else if(ev.target.parentElement.id == "tokenList"){
        //add action
        tempAction = "addToken";
    }
}

let dropTarget;
let dropItem;
function drop(ev) {
    let data = ev.dataTransfer.getData("text");
    let column = ev.target.cellIndex;
    let row = ev.target.closest("tr").rowIndex;
    if(tempAction == "addToken"){
        let url = document.getElementById(data).src;
        socket.send("AddToken:\n-"+row+"\n-"+column+"\n-"+url);
    }else if(tempAction == "moveToken"){
        //TODO server check
        socket.send("MoveToken:\n-"+rowStart+"\n-"+columnStart+"\n-"+row+"\n-"+column);
    }
}
function dropRemove(ev) {
    let data = ev.dataTransfer.getData("text");
    //socket.send("");
    if (tempAction == "addToken"){
        let index = tokens.indexOf(document.getElementById(data).src);
        tokens.splice(index,1);
        document.getElementById(data).remove();
    }else if(tempAction == "moveToken"){
        socket.send("RemoveToken:\n-"+rowStart+"\n-"+columnStart);
    }
}

function initGrid(rows,columns) {
    let grid = document.getElementById('gameMap');
    //TODO persistency
    grid.style.backgroundImage = backgroundUrl;
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
}

function dimCells(dim,columns){
    let elems = document.getElementsByClassName('gridColumn');
    for(let i =0;i<elems.length;i++){
        elems[i].style.height=dim+'px';
        elems[i].style.width=dim+'px';
    }
    dim =columns*(parseInt(dim) +0.8)+0.8;
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
    img.id = "token"+tokenId++;
    img.draggable = true;
    img.ondragstart = drag;
    grid.rows[row].cells[column].appendChild(img);
}

function setTokenList(){
    let listDiv = document.getElementById("tokenList");
    for (let i = 0; i < tokens.length; i++) {
        let img = document.createElement('img');
        img.src = tokens[i];
        img.className = 'menuToken';
        img.id = "menuToken"+menuTokenId++;
        img.draggable = true;
        img.ondragstart = drag;
        listDiv.appendChild(img)
    }
}
initGrid(10,15);
setTokenList();

function addMenuToken(){
    let url = document.getElementById("newToken").value;
    if(url != ""){
       if(tokens.indexOf(url)==-1){
           let listDiv = document.getElementById("tokenList");
           let img = document.createElement('img');
           img.src = url;
           img.className = 'menuToken';
           img.id = "menuToken"+menuTokenId++;
           img.draggable = true;
           img.ondragstart = drag;
           listDiv.appendChild(img)
           tokens.push(url);
       }
    }
}

function changeBackGround() {
    let url = document.getElementById("newMap").value;
    if (url != "") {
        socket.send("ChangeBackGround:\n-"+url);
    }
}

function setbackGround(url){
    let gameMap = document.getElementById("gameMap");
    gameMap.style.backgroundImage = "url('"+url+"')";
    backgroundUrl = url;
}
function setGrid(rows,columns,d){
    if(d>0)dim = d;
    //server check
    if(true){
        initGrid(rows,columns)
    }
}

function addPlayer(playerId){
    let playerList = document.getElementById("playerList");
    let row = playerList.insertRow();
    const td = row.insertCell();
    td.className = "playerCell";
    td.innerText = playerId;

}

function sendMessage(){
    let text = document.getElementById("chatInput").value;
    if (text != "") {
        socket.send("message:\n"+text);
    }
}

function moveToken(startRow,startColumn,endRow,endColumn){
    let grid = document.getElementById("gameMap");
    alert(grid.rows[endRow].cells.length);
    grid.rows[endRow].cells[endColumn].appendChild(grid.rows[startRow].cells[startColumn].firstChild);
}

function removeToken(row, column){
    let grid = document.getElementById("gameMap");
    grid.rows[row].cells[column].firstChild.remove();
}

function newPlayer(username){
    addPlayer(username);
}

function chatMessage(text){
    let p =document.createElement("p");
    p.innerText = text;
    p.className = "chatMessage";
    document.getElementById("chatDiv").appendChild(p);
}
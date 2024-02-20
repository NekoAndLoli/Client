

function create(roomName, password){
    socket.send("create:\n-"+roomName+"\n-"+password);
    lastAction = "create";
}

function createOk(){
    loginDiv.style.display="none";
    homeDiv.style.display="none";
    gameDiv.style.display="block";
}

function join(roomId, password){
    socket.send("join:\n-"+roomId+"\n-"+password);
    lastAction = "join";
}

function joinOk(){
    loginDiv.style.display="none";
    homeDiv.style.display="none";
    gameDiv.style.display="block";
}

function freePlayers(){
    let grid = document.getElementById('playerList');
    while(grid.rows.length>0){
        grid.deleteRow(0);
    }
}

function clearChatRoom(){
    let messages = document.getElementsByClassName("chatMessage");
    for (let i = 0; i < messages.length; i++) {
        messages[i].remove();
    }
}

function info(data){//players | tokens | background | rows | columns| dm | roomName | roomId
    let i = 0;
    let strings = data.split("|");
    let players = strings[i++].split(" ");
    let tokens = strings[i++].split(" ");
    let background = strings[i++];
    let rows = strings[i++];
    let columns = strings[i++];
    let dm = strings[i++];
    let roomId = strings[i++];
    let roomName = strings[i++];
    document.getElementById("newRows").value = rows;
    document.getElementById("newColumns").value = columns;
    initGrid(rows,columns);
    freePlayers();
    clearChatRoom();
    for (let i = 0; i < players.length; i++) {
        addPlayer(players[i]);
    }
    if(tokens.length>=3){
        for (let i = 0; i < tokens.length; i++) {
            addToken(tokens[i++],tokens[i++],tokens[i]);
        }
    }
    setbackGround(background);

    document.getElementById("room_info").innerText ="Dungeon Master:"+dm+"\nRoom name:"+roomName+ "\nRoomId:"+roomId;
}


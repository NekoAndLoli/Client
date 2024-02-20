

function create(roomName, password){
    alert("sent: " + roomName+password);
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

function info(data){//players | tokens | background
    let strings = data.split("|");
    let players = strings[0].split(" ");
    let tokens = strings[1].split(" ");
    let background = strings[2];
    let dm = strings[3];
    let roomId = strings[4];
    let roomName = strings[5];
    alert(background);
    for (let i = 0; i < players.length; i++) {
        addPlayer(players[i]);
    }
    if(tokens>=3){
        for (let i = 0; i < tokens.length; i++) {
            addToken(tokens[i++],tokens[i++],tokens[i]);
        }
    }
    setbackGround(background);

    document.getElementById("room_info").innerText ="Dungeon Master:"+dm+"\nRoom name:"+roomName+ "\nRoomId:"+roomId;
}


function create(roomName, password){
    alert("sent: " + roomName+password);
    socket.send("create:\n"+roomName+"\n"+password);
    lastAction = "create";
}

function createOk(){
    loginDiv.style.display="none";
    homeDiv.style.display="none";
    gameDiv.style.display="block";
}

function join(roomId, password){
    alert(roomId+password);
    socket.send("join:\n"+roomId+"\n"+password);
    lastAction = "join";
}

function joinOk(){
    loginDiv.style.display="none";
    homeDiv.style.display="none";
    gameDiv.style.display="block";
}
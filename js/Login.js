
let loginDiv = document.getElementById("loginDiv");
let homeDiv = document.getElementById("homeDiv");
let gameDiv = document.getElementById("gameDiv");


loginDiv.style.display="block";
homeDiv.style.display="block";
gameDiv.style.display="block";

function login(userId, password, server){
    alert(userId+password+server);
    //loginDiv.style.display="none";
    homeDiv.style.display="block";

    initGrid(10,15);
}


let socket = new WebSocket("ws://localhost:5555");
socket.onopen = function (e){
    alert("sent prova");
    socket.send("prova");
}

socket.onclose = function (event){
    if (event.wasClean) {
        alert(`[close] Connessione chiusa con successo, code=${event.code} reason=${event.reason}`);
    } else {
        alert('[close] Connection morta.');
    }
}

socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
};

socket.onmessage = function(event) {
    alert(`[message] Ricezione dati dal server: ${event.data}`);
};

let loginDiv = document.getElementById("loginDiv");
let homeDiv = document.getElementById("homeDiv");
let gameDiv = document.getElementById("gameDiv");

loginDiv.style.display="block";
homeDiv.style.display="block";
gameDiv.style.display="block";

let lastAction="";

let socket = null;

let manageMessage = new Array();
initManage();

function login(userId, password, server){
    if(server =="")server="localhost";

    if(socket == null){
        socket = new WebSocket("ws://"+server+":5555");
        socket.onopen = function (e){
            alert("[Info] Connected to: "+server);
            alert("sent "+userId+password);
            socket.send("login:\n"+userId+"\n"+password);
            lastAction = "login";
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
            manageMessage[lastAction](event.data);
        };
    }
    else{
        alert("sent "+userId+password);
        socket.send("login:\n"+userId+"\n"+password);
        lastAction = "login";
    }
}

function initManage(){
    manageMessage["login"] = function (reply){
        if(reply == "Success"){
            loginOk();
        }
        else{
            alert("Login failed, please try again.");
        }
    };
    manageMessage["join"] = function (reply){
        if(reply == "Success"){
            joinOk();
        }
        else{
            alert("Join failed, please check and try again.");
        }
    };
    manageMessage["create"] = function (reply){
        if(reply == "Success"){
            createOk();
        }
        else{
            alert("Create failed, please check and try again.");
        }
    };
    manageMessage["moveToken"] = function (reply){

    };
    manageMessage["addToken"] = function (reply){

    };
    manageMessage["removeToken"] = function (reply){

    };
    manageMessage["changeBackground"] = function (reply){

    };
    manageMessage["setGrid"] = function (reply){

    }
}

function loginOk(){
    loginDiv.style.display="none";
    homeDiv.style.display="block";
}

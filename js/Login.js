
let loginDiv = document.getElementById("loginDiv");
let homeDiv = document.getElementById("homeDiv");
let gameDiv = document.getElementById("gameDiv");

let username = "";
let lastAction="";

let socket = null;

let manageMessage = new Array();
initManage();

function login(userId, password, server){
    if(server =="")server="localhost";
    username = userId;
    if(socket == null){
        socket = new WebSocket("ws://"+server+":5555");
        socket.onopen = function (e){
            alert("[Info] Connected to: "+server);
            socket.send("login:\n-"+userId+"\n-"+password);
            lastAction = "login";
        }
        socket.onclose = function (event){
            if (event.wasClean) {
                alert(`[close] Connection closed, code=${event.code} reason=${event.reason}`);
            } else {
                alert('[close] Connection dead.');
            }
            loginDiv.style.display="block";
            homeDiv.style.display="none";
            gameDiv.style.display="none";
            socket = null;
            lastAction = "";
        }

        socket.onerror = function(error) {
            alert(`[error] ${error.message}`);
        };

        socket.onmessage = function(event) {
            let string = event.data.toString();
            let data = string.substring(1);
            try{
                manageMessage[string[0]](data);
            }catch (e) {
                alert(string);
            }
        };
    }
    else{
        socket.send("login:\n-"+userId+"\n-"+password);
        lastAction = "login";
    }
}

function initManage(){
    manageMessage["l"] = function (reply){//login
        if(reply.indexOf("Success")==0){
            loginOk();
        }
        else{
            alert("Login failed, please try again.");
        }
    };
    manageMessage["j"] = function (reply){//join
        if(reply.indexOf("Success")==0){
            joinOk();
        }
        else{
            alert("Join failed, please check and try again.");
        }
    };
    manageMessage["c"] = function (reply){//create
        if(reply.indexOf("Success")==0){
            createOk();
        }
        else{
            alert("Create failed, please check and try again.");
        }
    };
    manageMessage["m"] = function (reply){//moveToken
        let strings = reply.split(" ");
        moveToken(strings[0],strings[1],strings[2],strings[3])
    };
    manageMessage["a"] = function (reply){//addToken
        let strings = reply.split(" ");
        addToken(strings[0],strings[1],strings[2]);
    };
    manageMessage["r"] = function (reply){//remove token
        let strings = reply.split(" ");
        removeToken(strings[0],strings[1]);
    };
    manageMessage["b"] = function (reply){//change b
        setbackGround(reply);
    };
    manageMessage["s"] = function (reply){//set grid
        let strings = reply.split(" ");
        initGrid(strings[0],strings[1]);
    };
    manageMessage["n"] = function (reply){//new player joined
        newPlayer(reply);
    };
    manageMessage[" "] = function (reply){//chat, username:text
        chatMessage(reply);
    };
    manageMessage["i"] = function (reply){//info, information of the grid at join
        info(reply);
    };
    manageMessage["o"] = function (reply){
        offline(reply);
    };
}

function loginOk(){
    loginDiv.style.display="none";
    homeDiv.style.display="block";
    document.getElementById("username").innerText = username;
}

function logOut(){
    socket.close(1000,"logout");
}

function offline(username){
    let player = document.getElementById("player:"+username);
    chatMessage("[info]"+username+" has gone offline.")
    player.remove();
}
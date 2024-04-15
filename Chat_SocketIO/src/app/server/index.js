var express = require('express');
const helpers = require('../../Helpers/helpers');
var app = express();
const path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Chats
const openAI = require('../../Chats/OpenAI/index');
const respuestaAutomatica = require('../../Chats/RespuestaAutomatica/index');

// Config Server
var serverConfig = helpers.readFile(path.join(__dirname, 'configAPI'), "JSON");

var chatSource = null;
defineChatSource(serverConfig.source);

app.use(express.static('client'));

var messages = [serverConfig.firstMessage];

io.on('connection', function (socket) {
    socket.emit("messages", messages);
    socket.on('add-message', function (data) {
        addMessage(data);
    });
});

server.listen(6677, function () {
    console.log("Server funcionando");
});

async function addMessage(message) {
    messages.push(message);
    io.sockets.emit("messages", [message]);

    let answer = await chatSource.sendMsg(message.text);

    answer = {
        nickname: "SoyElBot",
        text: answer
    };
    
    messages.push(answer);

    console.log("MESSAGES", messages);

    io.sockets.emit("messages", [answer]);
}

function defineChatSource(source) {
    switch(source){
        case "OpenAI":
            {
                chatSource = openAI;
                break;
            }
        default:
            {
                chatSource = respuestaAutomatica;
                break;
            }
    }
}

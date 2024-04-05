var express = require('express');
const fetch = require('node-fetch');
const helpers = require('../../Helpers/helpers');
const { posix } = require('path');
var app = express();
var server = require('http').Server(app);
const openAI = require('../../Chats/OpenAI/index');

var io = require('socket.io')(server);

// Config Server
var serverConfig = helpers.readFile("configAPI", "JSON");

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
    res.status(200).send("Hola mundo soy el get");
});

var messages = [];

io.on('connection', function(socket) {
    console.log("El nodo de socket es un socket del nodo" + socket.handshake.address);

    socket.emit("messages", messages);
    socket.on('add-message', function(data){
        addMessage(data);
    });
});

server.listen(6677, function(){
    console.log("Server funcionando");
});

function addMessage(message) {
    messages.push(message);
    io.sockets.emit("messages", [message]);

    let answer = openAI.sendMsg(message);

    answer = {
        nickname: "SoyElBot",
        texto: possibleAnswers[answerPos]
    };
    messages.push(answer);

    io.sockets.emit("messages", [answer]);
}

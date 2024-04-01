var express = require('express');
const { posix } = require('path');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res) {
    res.status(200).send("Hola mundo soy el get");
});

var messages = [{
    id: 1,
    texto: "El Bot te da la bienvenida",
    nickname: "SoyElBot"
}];

var possibleAnswers = [
    "No te contesto",
    "Te contesto",
    "Pah mono, ni idea man",
    "Creo que te desubicaste",
    "Esto es Peñarol",
    "Marchanta",
    "Comprate un choripán",
    "¿Vos sacaste a bailar a la Morocha?",
    "¿Y si te callás un poco?",
    "Fah no, ni ahí loca",
    "Mirá, ni idea, ChatGPT te puede ayudar",
    "¿En serio sos tan pelotude?",
    "Daaaa media pilaaa",
    "Qué paja estarte contestando"
];

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
    
    answerMessage(message);
}

function answerMessage(message){
    let answer;
    let answerPos = getRandomNumber();

    answer = {
        nickname: "SoyElBot",
        texto: possibleAnswers[answerPos]
    };
    messages.push(answer);

    io.sockets.emit("messages", [answer]);
}

function getRandomNumber(){
    return Math.floor(Math.random() * possibleAnswers.length);
}
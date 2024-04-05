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


/* - Interfaz - */
async function sendMsg(msg) {
    let answer = await askChatGPT(msg);
    console.log(answer);

    return answer;
}

function answerMessage(message){
    let answer;
    let answerPos = getRandomNumber();

    // answer = {
    //     nickname: "SoyElBot",
    //     texto: possibleAnswers[answerPos]
    // };
    // messages.push(answer);

    // io.sockets.emit("messages", [answer]);
}


function getRandomNumber(){
    return Math.floor(Math.random() * possibleAnswers.length);
}


module.exports = { sendMsg };
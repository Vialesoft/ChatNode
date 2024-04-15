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

/* - Interface - */
async function sendMsg(msg) {
    let answer = answerMessage(msg);
    console.log(answer);

    return answer;
}

function answerMessage(message) {
    /*
    To-Do: now answers are completely random, we're not using the message
    But in the future we can add some logic to answer, with or without using AI and we'll need the message
    */
    
    let answerPos = getRandomNumber();

    let answer = possibleAnswers[answerPos];
    
    return answer;
}

function getRandomNumber(){
    return Math.floor(Math.random() * possibleAnswers.length);
}

module.exports = { sendMsg };
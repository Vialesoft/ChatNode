//const fetch = require('node-fetch');
const helpers = require('../../Helpers/helpers');
const path = require("path");

// Config for OpenAI Chat
var openAIConfig = helpers.readFile(path.join(__dirname, 'configAPI'), "JSON");

/* - Interface - */
async function sendMsg(msg) {
    let answer = await askChatGPT(msg);
    console.log(answer);

    return answer;
}

/* OPEN AI LOGIC */

// Sending messages to Chat GPT
async function askChatGPT(question) {
    try {
        const response = await fetch(openAIConfig.urlFetch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAIConfig.openAIApiKey}`
            },
            body: JSON.stringify({
                model: openAIConfig.model,
                messages: [
                    { "role": "system", "content": openAIConfig.chatRole },
                    { "role": "user", "content": question }
                ],
                temperature: 0.7,
                max_tokens: 150,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0
            })
        });

        const data = await response.json();

        // If data.choices do exists and has at least one element
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content.trim();
        } else {
            console.error('No se recibieron choices en la respuesta:', data);

            return "Lo siento, no pude obtener una respuesta. Inténtalo de nuevo.";
        }
    } catch (err) {
        console.error('Error al hacer la solicitud a la API de OpenAI:', err);

        return "Ocurrió un error al procesar tu solicitud.";
    }
}

//Testing OpenAI
//sendMsg("HOLA DOCTOR CÓMO ESTÁ?")

module.exports = { sendMsg };
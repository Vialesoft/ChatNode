const fetch = require('node-fetch');
const helpers = require('../../Helpers/helpers');

// Tu API key de OpenAI
var openAIConfig = helpers.readFile("configAPI", "JSON");

/* - Interfaz - */
async function sendMsg(msg) {
    let answer = await askChatGPT(msg);
    console.log(answer);

    return answer;
}

/* LÓGICA OPEN AI */

// Función para enviar preguntas a la API de ChatGPT
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

        // Comprobar si data.choices existe y tiene al menos un elemento
        if (data.choices && data.choices.length > 0) {
            //console.log(JSON.stringify(data.choices[0], null, 2));
            return data.choices[0].message.content.trim();

        } else {
            console.error('No se recibieron choices en la respuesta:', data);
            return "Lo siento, no pude obtener una respuesta. Inténtalo de nuevo.";
        }
    } catch (error) {
        console.error('Error al hacer la solicitud a la API de OpenAI:', error);
        return "Ocurrió un error al procesar tu solicitud.";
    }
}

sendMsg("HOLA DOCTOR CÓMO ESTÁ?")

module.exports = { sendMsg };
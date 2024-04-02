// Importar las dependencias
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

// El token de tu bot de Telegram
var bot = null; //new Telegraf('');

// Tu API key de OpenAI
var openAIKey = '';

getAPIKeys();

function getAPIKeys() {
  const fs = require("node:fs");

  try {
    const data = JSON.parse(fs.readFileSync('configAPI', 'utf-8'));

    bot = new Telegraf(data.TelegramApiKey);
    openAIKey = data.OpenAIApiKey;

    // Configurar el bot para que responda a todos los mensajes
    bot.on('text', async (ctx) => {
      const userMessage = ctx.message.text;
      const reply = await askChatGPT(userMessage);
      ctx.reply(reply);
    });

    // Iniciar el bot
    bot.launch();

    console.log("SOY EL API", openAIKey);

    console.log('El bot de Telegram está corriendo...');
  }
  catch(err){
    console.error(err);
  }
}

// Función para enviar preguntas a la API de ChatGPT
async function askChatGPT(question) {
  console.log("SOY EL API", openAIKey);

    try{
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAIKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Reemplaza con el modelo más reciente o el que prefieras usar
      messages: [
        {"role": "system", "content": "Eres un bot llamado FreudBot. De ahora en mas tus respuestas tienen que ser como si las respondiera el famoso médico padre del psicoanálisis Sigmund Freud. Solo dar la respuesta y no salirte del personaje, es decir, no escribir nada relacionado a CHAT GPT. Tu respuesta no debe superar las 50 palabras."},
        {"role": "user", "content": question}
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
    console.log(JSON.stringify(data.choices[0], null, 2));
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

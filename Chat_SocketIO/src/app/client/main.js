var socket = io.connect('http://localhost:6677', {
    "forceNew": true
});

socket.on("messages", function(data){
    console.log(data);

    render(data);
});

function render(data) {
    var html = data.map(function(message, index){
        let retorno = "<div class='message'>";
        retorno += "<strong>" + message.nickname + "</strong> dice:";
        retorno += "<p>" + message.text + "</p>";
        retorno += "</div>";

        return (retorno);
    }).join(' ');

    var div_msgs = document.getElementById("messages");
    div_msgs.innerHTML = div_msgs.innerHTML + html;

    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
    var mensaje = {
        nickname: document.getElementById("nickname").value,
        text: document.getElementById("text").value
    }

    document.getElementById("nickname").disabled = true;
    socket.emit('add-message', mensaje);

    return false;
}
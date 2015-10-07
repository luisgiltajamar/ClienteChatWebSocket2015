var socket = new WebSocket("ws://localhost:54611/socket.ashx");
var usu;
socket.onopen = function(evt) {
    console.log(evt);
};
socket.onclose = function(evt) {
    console.log(evt);
    alert("Conexion finalizada");
}

socket.onerror=function(evt) {
    alert("Error");
    console.log(evt);
}

socket.onmessage = function (evt) {

    var datos = JSON.parse(evt.data);
    for (var i = 0; i < datos.questions.length; i++) {
        var texto = datos.questions[i].remitente + " dice -->" +
            datos.questions[i].text+"<br />";
        document.getElementById("ventanachat").innerHTML += texto;
    }
    
    console.log(evt);
}

function usuario() {
    usu = document.getElementById("txtNom").value;
    document.getElementById("divChat").style.display = "block";
    document.getElementById("divNombre").style.display = "none";
}
function enviar() {
    var texto = document.getElementById("txt").value;
    var obj= {
        text: texto,
        remitente: usu
    }
    socket.send(JSON.stringify(obj));
}

document.getElementById("btnEnviar")
    .addEventListener("click", enviar);
document.getElementById("btnNom")
    .addEventListener("click", usuario);
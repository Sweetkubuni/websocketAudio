
function ChatSystem () {
  var socket = new WebSocket("ws://ip/recieve:8080");
  socket.binaryType = 'blob';

  socket.onmessage = function(event){
    var audioBlob = event.data;
    var audioURL  = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);
    audio.play();
  }
}

function ChatSystem () {
  var socket = new WebSocket("ws://162.245.217.17:8080/recieve");
  socket.binaryType = 'blob';

  socket.onmessage = function(event){
    console.log('receive data');
    var audioBlob = event.data;
    var audioURL  = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);
    audio.play();
  }
}
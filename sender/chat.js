

function ChatSystem(){
  socket = new WebSocket('ws://ip/send:8080')
  socket.binaryType = 'blob';

  if(navigator.mediaDevices){
    console.log('getUserMedia support');

    var constraints = {audio: true};

    navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    var mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable = function(e) {
      var blob = new Blob(e.data, { 'type' : 'audio/ogg; codecs=opus' });
      socket.send(blob);
    }
  }).catch(function(err){
    console.log('The following error occurred: ' + err);
  });

  }
}


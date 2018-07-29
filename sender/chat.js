
var mediaRecorder = null;

function ChatSystem(){
  socket = new WebSocket('ws://162.245.217.17:8080/send')
  socket.binaryType = 'blob';

  if(navigator.mediaDevices){
    console.log('getUserMedia support');

    var constraints = {audio: true};
    var chunks = [];

    navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    mediaRecorder = new MediaRecorder(stream);


    mediaRecorder.ondataavailable = function(e) {
        console.log('sending data')
        //chunks.push(e.data);
        var blob = new Blob(e.data, { 'type' : 'audio/ogg; codecs=opus' });
        socket.send(blob);
    }

    //mediaRecorder.onstop = function(e) {
      //console.log('sending off data\n')
      //var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      //socket.send(blob);
    //};
  }).catch(function(err){
    console.log('The following error occurred: ' + err);
  });

  }
}


function startRecording() {
  mediaRecorder.start(100);
  console.log("recorder started");
}
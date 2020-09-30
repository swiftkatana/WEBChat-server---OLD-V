var videoArea = document.querySelector("video");
var videoSelect = document.querySelector('#camera');






if (typeof MediaStreamTrack === 'undefined' || typeof MediaStreamTrack.getSources === 'undefined') {
   document.querySelector("#cameraSelector").style.visibility="hidden";
} else {
   MediaStreamTrack.getSources(getCameras);
}

videoSelect.onchange = startStream;

startStream();

function getCameras(sourceInfos) {
   for (var i = 0; i !== sourceInfos.length; ++i) {
      var sourceInfo = sourceInfos[i];
      var option = document.createElement('option');
      option.value = sourceInfo.id;
      if (sourceInfo.kind === 'video') {
         option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
         videoSelect.appendChild(option);
      }
   }
}

function startStream() {
   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
   var videoSource = videoSelect.value;
   var constraints = {
      audio: false, 
      video: false
      
   };
   
   navigator.getUserMedia(constraints, onSuccess, onError);
}

function onSuccess(stream) {
   console.log("Success! We have a stream!");
   videoArea.srcObject = stream;

   videoArea.play();
}

function onError(error) {
   console.log("Error with getUserMedia: ", error);
}


let constraintsA = {audio:true,video:false};
let videoArea = document.querySelector("video");
let audioArea = document.querySelector("audio");
let videoSelect = document.querySelector("#camera");

videoSelect.onchange = startStream


function startStream(){
   navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia); 
      let videoSource = videoSelect.value;
      let constraintsV = 
      {
         audio:true,
         video:{
            mandatory:{
               minWidth:640,
               maxWidth:640,
               minHeight:360,
               maxHeight:480
            },
            optional:[{
               sourceId:videoSource
            }]
         },
         
      };
      
      if (navigator.getUserMedia) {
         navigator.getUserMedia(constraintsV,onSuccessV,onError);
         
      } else { 
         alert("WebRTC is not supported"); 
    }
    
    
   }
   function getCameras(sourceInfos){

      for (let i = 0; i < sourceInfos.length; i++) {
            let sourceInfo = sourceInfos[i];
            var option = document.createElement('option')
            option.value = sourceInfo.id;
            if(sourceInfo.kind==='video'){
               option.text=sourceInfo.label ||'camera'+(videoSelect.length+1);
               videoSelect.appendChild(option);
            }



      }

   }
   
   function onSuccessV(stream){
      console.log('success Video');
      videoArea.srcObject=stream;
      videoArea.play();
   }
   function onSuccessA(stream){
      console.log('success audioArea');
      
      audioArea.srcObject=stream;
      
      audioArea.play();
   }
   function onError(e){
      console.log(e)
      navigator.getUserMedia(constraintsA,onSuccessA,onError);
   }
   
   
   startStream()
   MediaStreamTrack.getSources(getCameras)
   
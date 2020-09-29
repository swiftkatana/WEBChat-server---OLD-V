navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || 
   navigator.mozGetUserMedia); 
let constraintsA = {audio:true,video:false};
let videoArea = document.querySelector("video");
let audioArea = document.querySelector("audio");
let constraintsV = {audio:true,video:true};

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

  
if (navigator.getUserMedia) {
  navigator.getUserMedia(constraintsV,onSuccessV,onError);
 navigator.getUserMedia(constraintsA,onSuccessA,onError);

} else { 
   alert("WebRTC is not supported"); 
}

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || 
   navigator.mozGetUserMedia); 
let constraintsA = {audio:true,video:false};
let videoArea = document.querySelector("video");
let audioArea = document.querySelector("audio");
let constraintsV = 
{
   audio:true,
   video:{
      mandatory:{
         minWidth:640,
         maxWidth:640,
         minHeight:360,
         maxHeight:480
      }
   },

};

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

} else { 
   alert("WebRTC is not supported"); 
}

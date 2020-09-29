
  function onSuccess(stream){
   console.log('success connect');
   videoArea.src=window.URL.createObjectURL(stream);
   videoArea.play();
   }
     
   function onError(e){
      console.log(e)
   
   }

  
   navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia); 
let constraints = {audio:true,video:false};
let videoArea = document.querySelector("video");
 
if (navigator.getUserMedia) {
  navigator.getUserMedia(constraints,onSuccess,onError);

} else { 
   alert("WebRTC is not supported"); 
}

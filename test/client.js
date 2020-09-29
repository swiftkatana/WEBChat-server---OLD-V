
  

  
   navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || 
      navigator.mozGetUserMedia); 
let constraints = {audio:true,video:true};
let videoArea = document.querySelector("video");
 
if (navigator.getUserMedia) {
  navigator.getUserMedia(constraints,onSuccess,onError);

} else { 
   alert("WebRTC is not supported"); 
}
onSuccess=(stream)=>{
console.log('success connect');
videoArea.src=window.URL.createObjectURL(stream);
videoArea.play();
}
  
onError=(e)=>{
   console.log(e)

}
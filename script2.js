// Balloons PNGs
const balloonImages = ["balloon1.png","balloon2.png"];
let balloonInterval;

// Function to create balloons with smooth float & fade
function createBalloons(){
  const img = document.createElement("img");
  img.src = "assets/balloons/" + balloonImages[Math.floor(Math.random()*balloonImages.length)];
  img.classList.add("cute-balloon");
  
  // Random horizontal start
  img.style.left = Math.random()*window.innerWidth + "px";
  img.style.bottom = "-100px";
  img.style.opacity = 1;
  document.getElementById("balloons").appendChild(img);

  // Animation parameters
  let start = Date.now();
  let duration = Math.random()*3000 + 7000; // 7-10s
  let sway = Math.random()*50 - 25; // side sway

  function animate(){
    let elapsed = Date.now() - start;
    let progress = elapsed/duration;
    if(progress>=1){
      img.remove();
      return;
    }
    // vertical float
    img.style.bottom = (-100 + progress*1000) + "px";
    // horizontal sway
    img.style.transform = `translateX(${Math.sin(progress*Math.PI*2)*sway}px)`;
    // fade out
    img.style.opacity = 1-progress;
    requestAnimationFrame(animate);
  }
  animate();
}

// Candle blow logic
const candles = document.querySelectorAll(".candle");
const music = document.getElementById("birthday-music");
const wishNote = document.getElementById("wish-note");

function blowCandles() {
  candles.forEach(candle => candle.classList.add("blown"));
  music.play();
  wishNote.style.right = "20px";
  balloonInterval = setInterval(createBalloons, 500);
}

// **Click / touch event removed**
// candles.forEach(candle => {
//   candle.addEventListener('click', blowCandles);
// });

// Microphone detection to blow
navigator.mediaDevices.getUserMedia({audio:true})
.then(stream=>{
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  source.connect(analyser);
  analyser.fftSize = 256;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function detectBlow(){
    analyser.getByteFrequencyData(dataArray);
    let sum = dataArray.reduce((a,b)=>a+b,0)/dataArray.length;
    if(sum>100){ // threshold for blow
      blowCandles();
      return;
    }
    requestAnimationFrame(detectBlow);
  }
  detectBlow();
})
.catch(err=>{console.log("Microphone access denied");});

// Next button
function goNext(){
  window.location.href="gallery3d.html"; // page 3
}

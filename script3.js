const scene = document.getElementById('scene');
let rotateX = 0, rotateY = 0, rotateZ = 0;
let targetX = 0, targetY = 0, targetZ = 0;
let isDragging = false;
let startX, startY;

// Smooth rotation function
function updateRotation() {
  // Lerping for smooth movement
  rotateX += (targetX - rotateX) * 0.1;
  rotateY += (targetY - rotateY) * 0.1;
  rotateZ += (targetZ - rotateZ) * 0.05; // subtle Z rotation for 3D depth
  scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  requestAnimationFrame(updateRotation);
}
updateRotation();

// Mouse events
scene.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
});
scene.addEventListener('mouseup', () => { isDragging = false; });
scene.addEventListener('mouseleave', () => { isDragging = false; });
scene.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  targetY += dx * 0.3;
  targetX -= dy * 0.3;
  targetZ = Math.sin(targetY/100) * 5; // subtle Z-axis tilt
  startX = e.clientX;
  startY = e.clientY;
});

// Touch events
scene.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
scene.addEventListener('touchend', () => { isDragging = false; });
scene.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;
  targetY += dx * 0.3;
  targetX -= dy * 0.3;
  targetZ = Math.sin(targetY/100) * 5;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  e.preventDefault(); // prevent scrolling
});

// Confetti effect
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#ff79c6','#ffb3c1','#ffd1dc','#ff2d84','#ff7b9c'];

for (let i=0;i<150;i++){
  confettiPieces.push({
    x: Math.random()*confettiCanvas.width,
    y: Math.random()*confettiCanvas.height,
    size: Math.random()*7+3,
    speed: Math.random()*2+1,
    color: colors[Math.floor(Math.random()*colors.length)],
    tilt: Math.random()*10-5
  });
}

function drawConfetti(){
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiPieces.forEach(p=>{
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.size);
    ctx.lineTo(p.x - p.tilt, p.y + p.size);
    ctx.closePath();
    ctx.fill();
    p.y += p.speed;
    if(p.y > confettiCanvas.height){
      p.y = -10;
      p.x = Math.random()*confettiCanvas.width;
    }
  });
  requestAnimationFrame(drawConfetti);
}

drawConfetti();

// Adjust canvas on resize
window.addEventListener('resize', ()=>{
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

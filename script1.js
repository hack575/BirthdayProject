const nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', () => {
  window.location.href = 'cake.html';
});

// Floating hearts generator
const heartsContainer = document.querySelector('.hearts-container');
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random()*90 + '%';
  heart.style.animationDuration = (5 + Math.random()*3) + 's';
  heart.style.width = heart.style.height = (20 + Math.random()*20) + 'px';
  heartsContainer.appendChild(heart);

  setTimeout(()=> heart.remove(), 8000);
}
setInterval(createHeart, 500);

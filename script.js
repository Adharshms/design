const cards = [
  document.querySelector('.card1'),
  document.querySelector('.card2'),
  document.querySelector('.card3')
];

const cardContents = [
  {
    html: `<h2>Custom Web Applications</h2>
           <p>From dashboards to platforms, we build scalable, secure, and fully tailored web solutions that power your business forward.</p>`,
    color: '#fff'
  },
  {
    html: `<h2>Mobile App Development</h2>
           <p>User-first mobile apps built with performance and usability in mind — for iOS, Android, or cross-platform.</p>`,
    color: '#fff'
  },
  {
    html: `<h2>UI/UX & Product Design</h2>
           <p>We design digital experiences that feel as good as they look — intuitive, elegant, and built for conversion.</p>`,
    color: '#fff'
  }
];

let index = 0;  
const flexValues = [7.5, 1.5, 1];
let isScrolling = false;

function rotateCards(direction) {
  if (isScrolling) return;
  isScrolling = true;

  if (direction === 'down') index = (index + 1) % 3;
  else if (direction === 'up') index = (index + 2) % 3;

  for (let i = 0; i < 3; i++) {
    const card = cards[(i + index) % 3];
    card.style.flex = flexValues[i];
    if (i === 0) {
      const contentIndex = (i + index) % 3;
      card.innerHTML = cardContents[contentIndex].html + `<span class="number">${contentIndex+1}</span>`;
    } else {
      card.innerHTML = `<span class="number">${((i+index)%3)+1}</span>`;
    }
  }

  setTimeout(() => { isScrolling = false; }, 600);
}

// Mouse wheel scroll event when scrolling the screen dont scroll down 
window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) rotateCards('down');
  else if (e.deltaY < 0) rotateCards('up');
});

 
let touchStartY = 0;
window.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
window.addEventListener('touchend', e => {
  const deltaY = touchStartY - e.changedTouches[0].clientY;
  if (deltaY > 30) rotateCards('down');
  else if (deltaY < -30) rotateCards('up');
});

 
rotateCards('down');

const cards = [
  document.querySelector('.card1'),
  document.querySelector('.card2'),
  document.querySelector('.card3')
];

let index = 0; // current largest card
const flexValues = [7.5, 1.5, 1]; // largest, medium, smallest
let isScrolling = false; // prevent multiple triggers during transition

function rotateCards(direction) {
  if (isScrolling) return; // ignore while animating

  isScrolling = true;

  if(direction === 'down'){
    index = (index + 1) % 3; // next card
  } else if(direction === 'up'){
    index = (index + 2) % 3; // previous card
  }

  for(let i=0; i<3; i++){
    cards[(i + index) % 3].style.flex = flexValues[i];
  }

  // allow next scroll after transition ends
  setTimeout(() => {
    isScrolling = false;
  }, 600); // slightly longer than CSS transition (flex 0.5s)
}

// Mouse wheel / touchpad scroll
window.addEventListener('wheel', (e) => {
  if(e.deltaY > 0){
    rotateCards('down');
  } else if(e.deltaY < 0){
    rotateCards('up');
  }
});

// Touch events for mobile
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if(deltaY > 30){ // swipe up → move forward
    rotateCards('down');
  } else if(deltaY < -30){ // swipe down → move backward
    rotateCards('up');
  }
});

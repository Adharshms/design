const cards = document.querySelectorAll(".card");
const totalCards = cards.length;
const container = document.querySelector(".cards");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // calculate which card should be active
  const index = Math.min(
    Math.floor(scrollY / viewportHeight),
    totalCards - 1
  );

  // shift the whole row left depending on active index
  container.style.transform = `translateX(-${index * 84}vw)`; // 80vw card + 2vw margin both sides

  // set active / inactive styles
  cards.forEach((card, i) => {
    if (i === index) {
      card.classList.add("active");
      card.classList.remove("inactive");
    } else {
      card.classList.add("inactive");
      card.classList.remove("active");
    }
  });
});

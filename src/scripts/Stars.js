const MAX_RATING = 5;
const STARS_CLASS = 'stars';

const setRating = (stars, rating) => stars.style.setProperty(
  '--bright-offset',
  `${stars.offsetWidth * (1 - (rating / MAX_RATING))}px`,
);

window.addEventListener('load', () => {
  document
    .querySelectorAll(`.${STARS_CLASS}`)
    .forEach(stars => setRating(stars, stars.dataset.rating));

  document.addEventListener('mousedown', e => {
    if (!e.target.classList.contains(STARS_CLASS)) return;

    setRating(e.target, e.offsetX / e.target.offsetWidth * MAX_RATING);

    const handleMouseMove = event => setRating(e.target, event.offsetX / e.target.offsetWidth * MAX_RATING);
    e.target.addEventListener('mousemove', handleMouseMove);

    const handleMouseUp = () => {
      e.target.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    document.addEventListener('mouseup', handleMouseUp);
  })
});

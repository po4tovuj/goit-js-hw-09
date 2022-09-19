function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;
const changeBodyBgColor = () => {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
};
startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    changeBodyBgColor();
    startBtn.setAttribute('disabled', '');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
});

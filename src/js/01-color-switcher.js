function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bodyColor: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const changeBtnStatus = (remove, add) => {
  refs.startBtn.disabled = add;
  refs.stopBtn.disabled = remove;
};

// function changeBackground(color) {
//     refs.bodyColor.style.backgroundColor = color;
// }

let colorSwitch = null;
refs.startBtn.addEventListener('click', () => {
  changeBtnStatus(false, true);
  colorSwitch = setInterval(() => {
    refs.bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(colorSwitch);
  changeBtnStatus(true, false);
});

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]')
const body = document.querySelector('body')

let timer = null;

btnStart.addEventListener('click', startBtn);
btnStop.addEventListener('click', stopBtn);

function startBtn(evt) {
    evt.target.disabled = true;
    timer = setInterval(() => {
         body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopBtn() {
    btnStart.disabled = false;
    clearInterval(timer);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


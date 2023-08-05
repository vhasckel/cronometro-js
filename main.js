const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const millisecondsEl = document.querySelector(".milliseconds");
const startBtn = document.querySelector(".startButton");
const pauseBtn = document.querySelector(".pauseButton");
const resetBtn = document.querySelector(".resetButton");

//let interval irá armazenar o intervalo retornado pela função setInterval()
let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isRunning = false;

const startTimer = () => {
  if (!isRunning) {
    isRunning = true;

    //setInterval() é usada para repetir uma ação (a callback) em um intervalo determinado de tempo
    interval = setInterval(() => {
      milliseconds += 10;

      if (milliseconds === 1000) {
        seconds++;
        milliseconds = 0;
      }

      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      updateDisplay();
    }, 10);

    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
    resetBtn.style.display = "block";
  }
};

const pauseTimer = () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    pauseBtn.textContent = "continuar";
  } else {
    startTimer();
    pauseBtn.textContent = "pausar";
  }
};

const resetTimer = () => {
  clearInterval(interval);
  isRunning = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();

  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  resetBtn.style.display = "none";
};

const updateDisplay = () => {
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
  millisecondsEl.textContent = formatMilliseconds(milliseconds);
};

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const formatMilliseconds = (time) => {
  return time < 100 ? `${time}`.padStart(3, "0") : time;
};

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Ocultar o botão de pausa no início e exibir apenas o botão de início
pauseBtn.style.display = "none";

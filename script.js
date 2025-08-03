const startBtn = document.querySelector("#Start");
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");
const timeDisplay = document.querySelector("#time");
const intervalInput = document.querySelector("#interval");
const pauseInput = document.querySelector("#pause-input");
const statusDisplay = document.querySelector("#status");
const TaskList = document.getElementById("List");
const Input = document.getElementById("Input02");
const Add = document.getElementById("AddQuest");
let totalSeconds = 0;
let timer = null;
let isPaused = false;
let isOnBreak = false;

function AddList() {
  const InputValue = Input.value.trim();
  if (InputValue !== "" && TaskList.children.length < 10) {
    const checkbox = document.createElement("input");
    const li = document.createElement("li");
    li.classList.add("task-item");
    const span = document.createElement("span");
    span.textContent = Input.value;
    checkbox.textContent = "✅";
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    TaskList.appendChild(li);
    li.appendChild(checkbox);
    li.appendChild(span);
    Input.value = "";
  } else {
  }
}

Add.addEventListener("click", AddList);

function formatingTime() {
  //PREMENA SEKUND NA MINUTY
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function updateDisplay() {
  //POP-UP PRI SPUSTENÍ, PAUZNUTÍ, NA PAUZE
  formatingTime();
}

function startTimer() {
  //SUPSTENIE ČASOVAČA
  if (timer) return;

  const minutes = isOnBreak
    ? parseInt(pauseInput.value) || 5
    : parseInt(intervalInput.value) || 30;
  totalSeconds = minutes * 60;
  updateDisplay();

  timer = setInterval(() => {
    //SPUSTI SA ODPOČITAVANIE KAŽDU SEKUNDU O -1 (prvý blok kodu if)
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      //INAK AK JE CELY INTERVAL/CASOVAČ MENŠÍ ALEBO ROVNÝ 0 ČASOVAČ PRRSTANE ODPOČÍTAVAŤ
      clearInterval(timer);
      timer = null;
      updateDisplay();

      if (!isOnBreak) {
        isOnBreak = true;
        alert("Pracovný interval skončil! Teraz začína pauza.");
        startTimer();
      } else {
        isOnBreak = false;
        alert("Pauza skončila!"); //čas sa úplne zastaví
      }
    }
  }, 1000);
}

function pauseTimer() {
  //FUNKCIA - PAUZA
  if (timer) {
    clearInterval(timer);
    timer = null;
    isPaused = true;
    updateDisplay();
  }
}

function resetTimer() {
  //FUNKCIA - RESET
  clearInterval(timer);
  timer = null;
  isPaused = false;
  isOnBreak = false;
  totalSeconds = parseInt(intervalInput.value) * 60;
  updateDisplay();
}

startBtn.addEventListener("click", function () {
  if (isPaused) {
    isPaused = false;
    updateDisplay();
    timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        updateDisplay();

        if (!isOnBreak) {
          isOnBreak = true;
          alert("Pracovný interval skončil! Začína pauza.");
          startTimer();
        } else {
          isOnBreak = false;
          alert("Pauza skončila.");
        }
      }
    }, 1000);
  } else {
    startTimer();
  }
});
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

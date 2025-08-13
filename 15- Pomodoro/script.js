
let minute = parseInt(localStorage.getItem("minute")) || 25;
let second = parseInt(localStorage.getItem("second")) || 0;
let pomosCount = parseInt(localStorage.getItem("pomosCount")) || 0;
let totalMinutes = parseInt(localStorage.getItem("totalMinutes")) || 0;

let timer = null;
let currentMode = localStorage.getItem("currentMode") || "pomodoro";

const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const pomosCountEl = document.getElementById("pomos-count");
const pomosTimeEl = document.getElementById("pomos-time");

function updateDisplay() {
  minuteEl.textContent = minute.toString().padStart(2, "0");
  secondEl.textContent = second.toString().padStart(2, "0");
}

const optionLinks = document.querySelectorAll(".option ul li");

function saveToLocalStorage() {
  localStorage.setItem("minute", minute);
  localStorage.setItem("second", second);
  localStorage.setItem("pomosCount", pomosCount);
  localStorage.setItem("totalMinutes", totalMinutes);
  localStorage.setItem("currentMode", currentMode);
}

optionLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    optionLinks.forEach((li) => li.classList.remove("active"));

    link.classList.add("active");

    const selected = link.textContent.trim().toLowerCase();
    if (selected === "pomodoro") {
      minute = 25;
      currentMode = "pomodoro";
    } else if (selected === "short break") {
      minute = 5;
      currentMode = "short";
    } else if (selected === "long break") {
      minute = 15;
      currentMode = "long";
    }
    second = 0;
    updateDisplay();
     saveToLocalStorage();
  });
});

function updateStats() {
  pomosCountEl.textContent = pomosCount;
  pomosTimeEl.textContent = totalMinutes;
}

function startTimer() {
  if (timer === null) {
    timer = setInterval(() => {
      if (second === 0) {
        if (minute === 0) {
          clearInterval(timer);
          timer = null;
          startBtn.innerHTML = `<span class="material-icons">play_arrow</span>`;
          pomosCount++;
          totalMinutes += 25;
          updateStats();
           saveToLocalStorage();
          alert("Süre Bitti");
          return;
        }
        minute--;
        second = 59;
      } else {
        second--;
      }
      updateDisplay();
       saveToLocalStorage();
    }, 1000);
    startBtn.innerHTML = `<span class="material-icons">pause</span>`;
  } else {
    clearInterval(timer);
    timer = null;
    startBtn.innerHTML = `<span class="material-icons">play_arrow</span>`;
     saveToLocalStorage();
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  if (currentMode === "pomodoro") {
    minute = 25;
  } else if (currentMode === "short") {
    minute = 5;
  } else if (currentMode === "long") {
    minute = 15;
  }
  second = 0;
  updateDisplay();
  startBtn.innerHTML = `<span class="material-icons">play_arrow</span>`;
    saveToLocalStorage();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
updateStats();


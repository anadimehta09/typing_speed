const quotes = [
  "Thala for a Reason.",
  "Created by Adamya.",
  "Crafted by Adamya.",
  "Keep calm and type on.",
  "Speed and accuracy go hand in hand.",
];

const quoteDisplay = document.getElementById("quote");
const inputArea = document.getElementById("input");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const progressBar = document.getElementById("progress-bar");
const gifOverlay = document.getElementById("fullscreen-gif");
const darkToggle = document.getElementById("darkToggle");
const themeIcon = document.getElementById("theme-icon");

let timer;
let timeLeft = 60;
let isRunning = false;

const sound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-bonus-earned-in-video-game-2058.mp3");

function pickQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function showGifOverlay() {
  gifOverlay.classList.add("active");
  setTimeout(() => gifOverlay.classList.remove("active"), 3000);
}

function updateStats() {
  timeDisplay.textContent = timeLeft;
}

function updateProgress() {
  progressBar.style.width = `${(timeLeft / 60) * 100}%`;
}

function startTest() {
  if (isRunning) return;
  isRunning = true;
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  quoteDisplay.textContent = pickQuote();
  timeLeft = 60;
  updateStats();
  updateProgress();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  showGifOverlay();

  timer = setInterval(() => {
    timeLeft--;
    updateStats();
    updateProgress();
    if (timeLeft <= 0) stopTest();
  }, 1000);
}

function stopTest() {
  clearInterval(timer);
  isRunning = false;
  inputArea.disabled = true;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  const text = inputArea.value.trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const timeUsed = (60 - timeLeft) / 60;
  wpmDisplay.textContent = timeUsed > 0 ? Math.round(wordCount / timeUsed) : 0;
  sound.play();
}

function resetTest() {
  clearInterval(timer);
  isRunning = false;
  inputArea.disabled = true;
  inputArea.value = "";
  quoteDisplay.textContent = 'Press "Start" to begin the test!';
  timeLeft = 60;
  updateStats();
  updateProgress();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  wpmDisplay.textContent = 0;
}

inputArea.addEventListener("input", () => {
  const expected = quoteDisplay.textContent;
  inputArea.classList.toggle("correct", expected.startsWith(inputArea.value));
});
startBtn.addEventListener("click", startTest);
stopBtn.addEventListener("click", stopTest);
resetBtn.addEventListener("click", resetTest);

// Dark Mode Setup
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}
darkToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  themeIcon.classList.replace(isDark ? "fa-moon" : "fa-sun", isDark ? "fa-sun" : "fa-moon");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

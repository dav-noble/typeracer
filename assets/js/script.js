// Sample texts for each difficulty level
const sampleTexts = {
    easy: [
        "The cat sat on the mat.",
        "Dogs bark at night.",
        "I love sunny days.",
    ],
    medium: [
        "Typing quickly takes practice and patience.",
        "The quick brown fox jumps over the lazy dog.",
        "Learning to code opens many doors.",
    ],
    hard: [
        "She sells seashells by the seashore, where the waves whisper secrets.",
        "A journey of a thousand miles begins with a single step, but perseverance is key.",
        "Complex algorithms require careful planning and precise execution.",
    ],
};

// Function to get a random text based on difficulty
function getRandomText(difficulty) {
    const texts = sampleTexts[difficulty];
    return texts[Math.floor(Math.random() * texts.length)];
}

// DOM elements
const difficultySelect = document.getElementById("difficulty");
const sampleTextDiv = document.getElementById("sample-text");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const timeSpan = document.getElementById("time");
const userInput = document.getElementById("user-input");

// Timer variables
let startTime = null;
let endTime = null;
let timerRunning = false;

// Function to update the sample text
function updateSampleText() {
    const selectedDifficulty = difficultySelect.value;
    sampleTextDiv.textContent = getRandomText(selectedDifficulty);
}

// Function to update sample text with real-time feedback
function updateSampleTextHighlight() {
    const sampleText = sampleTextDiv.textContent.trim();
    const userText = userInput.value.trim();

    const sampleWords = sampleText.split(/\s+/);
    const userWords = userText.split(/\s+/);

    let highlighted = sampleWords.map((word, idx) => {
        if (userWords[idx] === undefined) {
            return `<span>${word}</span>`;
        } else if (userWords[idx] === word) {
            return `<span style="color: #007bff; font-weight: bold;">${word}</span>`; // blue for correct
        } else {
            return `<span style="color: #dc3545; font-weight: bold;">${word}</span>`; // red for incorrect
        }
    });

    sampleTextDiv.innerHTML = highlighted.join(" ");
}

// Listen for input changes to provide real-time feedback
userInput.addEventListener("input", updateSampleTextHighlight);

function startTest() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startTime = performance.now();
    endTime = null;
    timerRunning = true;
    timeSpan.textContent = "0.00";
    userInput.value = ""; // Clear the textarea
    userInput.disabled = false; // Enable textarea
    userInput.focus(); // Optional: focus for convenience
}

function stopTest() {
    if (!timerRunning) return;
    endTime = performance.now();
    timerRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
    timeSpan.textContent = elapsedSeconds;
    userInput.disabled = true; // Disable textarea

    // Calculate WPM
    const sampleText = sampleTextDiv.textContent.trim();
    const userText = userInput.value.trim();

    const sampleWords = sampleText.split(/\s+/);
    const userWords = userText.split(/\s+/);

    let correctWords = 0;
    for (let i = 0; i < Math.min(sampleWords.length, userWords.length); i++) {
        if (sampleWords[i] === userWords[i]) {
            correctWords++;
        }
    }

    const minutes = (endTime - startTime) / 1000 / 60;
    const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0;

    // Display WPM and difficulty level
    document.getElementById("wpm").textContent = wpm;
    document.getElementById("level").textContent =
        difficultySelect.options[difficultySelect.selectedIndex].text;
}

function initializeButtons() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    userInput.disabled = true; // Disable textarea on load
}

// Event listener for difficulty change
difficultySelect.addEventListener("change", updateSampleText);

// Optionally, set a random text on page load
document.addEventListener("DOMContentLoaded", updateSampleText);

// Event listeners for start and stop buttons
startBtn.addEventListener("click", startTest);
stopBtn.addEventListener("click", stopTest);

document.addEventListener("DOMContentLoaded", function () {
    updateSampleText();
    initializeButtons();
});

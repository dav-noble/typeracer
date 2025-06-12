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

// Function to update the sample text
function updateSampleText() {
    const selectedDifficulty = difficultySelect.value;
    sampleTextDiv.textContent = getRandomText(selectedDifficulty);
}

// Event listener for difficulty change
difficultySelect.addEventListener("change", updateSampleText);

// Optionally, set a random text on page load
document.addEventListener("DOMContentLoaded", updateSampleText);

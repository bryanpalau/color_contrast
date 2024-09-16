let score = 0;
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF'];
const background = document.getElementById('background');
const optionButtons = document.querySelectorAll('.color-option');
const scoreDisplay = document.getElementById('score');
const feedback = document.getElementById('feedback');

function generateRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function setNewChallenge() {
    const bgColor = generateRandomColor();
    background.style.backgroundColor = bgColor;

    // Get contrasting color (use a very simplified contrast check for fun purposes)
    const correctColor = (bgColor === '#000000' || bgColor === '#FFFFFF') ? (bgColor === '#000000' ? '#FFFFFF' : '#000000') : '#000000';

    const options = [...optionButtons];
    const correctOption = Math.floor(Math.random() * options.length);
    
    // Assign correct option
    options[correctOption].style.backgroundColor = correctColor;
    options[correctOption].onclick = () => correctAnswer();

    // Assign wrong options
    options.forEach((button, index) => {
        if (index !== correctOption) {
            let wrongColor;
            do {
                wrongColor = generateRandomColor();
            } while (wrongColor === correctColor || wrongColor === bgColor);
            button.style.backgroundColor = wrongColor;
            button.onclick = () => wrongAnswer(correctColor);
        }
    });
}

function correctAnswer() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    feedback.textContent = "Correct! Great job!";
    setNewChallenge();
}

function wrongAnswer(correctColor) {
    feedback.textContent = `Wrong! The correct answer was ${correctColor}.`;
    setNewChallenge();
}

// Initialize first challenge
setNewChallenge();

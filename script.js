const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let birdY = canvas.height / 2;
let birdVelocity = 0;
let gravity = 0.5;
let isGameOver = false;

const gateWidth = 100;
const gateHeight = 200;
const gateGap = 150;
let gateX = canvas.width;
let gateColor1 = '#000'; // Color of gate 1 (top)
let gateColor2 = '#FFF'; // Color of gate 2 (bottom)
let backgroundColor = '#888'; // Background color

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(100, birdY, 20, 0, Math.PI * 2);
    ctx.fill();
}

function drawGates() {
    // Draw top gate
    ctx.fillStyle = gateColor1;
    ctx.fillRect(gateX, 0, gateWidth, canvas.height / 2 - gateGap / 2);
    
    // Draw bottom gate
    ctx.fillStyle = gateColor2;
    ctx.fillRect(gateX, canvas.height / 2 + gateGap / 2, gateWidth, canvas.height);
}

function gameLoop() {
    if (isGameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity to bird
    birdVelocity += gravity;
    birdY += birdVelocity;

    // Move the gates
    gateX -= 3;
    if (gateX < -gateWidth) {
        gateX = canvas.width;
        // Randomize new gate colors
        gateColor1 = Math.random() > 0.5 ? '#000' : '#FFF';
        gateColor2 = Math.random() > 0.5 ? '#FFF' : '#000';
        backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16); // Random background
    }

    // Check for collisions
    if (birdY < 0 || birdY > canvas.height || (birdY < canvas.height / 2 - gateGap / 2 && gateX < 120 && gateX > 80)) {
        isGameOver = true;
        alert("Game Over!");
    }

    // Draw everything
    drawBird();
    drawGates();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function() {
    birdVelocity = -10; // Bird jumps up
});

// Start the game
gameLoop();

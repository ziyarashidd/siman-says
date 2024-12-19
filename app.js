let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start the game on click
document.addEventListener("click", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

// Flash the game button
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash the user's pressed button
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Handle level up and add a new button to the sequence
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Get a random color from the btns array (fixed random index range from 0 to 3)
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    console.log(gameSeq);
    gameFlash(randBtn);
}

// Check the user's answer and handle game over
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If the user sequence length matches the game sequence, move to the next level
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Level up after a short delay
        }
    } else {
        // Game Over condition
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Click any button to restart.`;
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        // After the game over message, allow clicking any button to restart the game
        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("click", startGameAfterGameOver);
        });
    }
}

// Handle button press by the user
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1); // Check if the last user input is correct
}

// Add event listeners for all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset the game after a game over (when any button is clicked)
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = `Press any key or click the button to start the game!`; // Prompt to start the game again
}

// Start the game after game over when any button is clicked
function startGameAfterGameOver() {
    reset(); // Reset the game
    document.querySelectorAll(".btn").forEach(btn => {
        btn.removeEventListener("click", startGameAfterGameOver); // Remove the click event listener to prevent multiple starts
    });
    started = true; // Start the game
    levelUp(); // Start from level 1
}

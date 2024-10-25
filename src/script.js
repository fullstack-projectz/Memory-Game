
const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍋", "🍑", "🍍"];

let shuffledCards, firstCard, secondCard, lockBoard, matchesFound, score;


// getelement by id
const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");


/**
 * function to shuffle cards
 */
function shuffleCards() {
    shuffledCards = [...symbols, ...symbols].sort(() => 0.5 - Math.random())
        .map((symbol) => createCardElement(symbol));
    gameBoard.innerHTML = "";
    shuffledCards.forEach(card => gameBoard.appendChild(card));
    console.log("Shuffled Cards: ", shuffledCards);
}


// create a new card 
function createCardElement(symbol) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="front">?</div>
    <div class="back">${symbol}</div>`;

    card.addEventListener("click", flipCard);

    console.log("Card: ", card);
    return card;
}


// flip the card function

function flipCard() {

    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();

}

// check if two cards are match 
function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;
    console.log(firstCard.innerHTML);

    isMatch ? disableCards() : unflipCards();

}

// Disable matching cards 

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchesFound += 1;

    updateScore();
    resetBoard();

    if (matchesFound === symbols.length) {
        setTimeout(() => alert("Congratulations! You've matched all pairs!"), 300);
    }
}


// update the score display
function updateScore() {
    score += 10;
    scoreDisplay.textContent = score;
}


//Unflip cards if they don’t match

function unflipCards() {

    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Reset board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// rest game function

function restartGame() {
    matchesFound = 0;
    score = 0;
    scoreDisplay.textContent = score;

    shuffleCards();
    resetBoard();
}


// Initialize game
restartButton.addEventListener('click', restartGame);
document.addEventListener('DOMContentLoaded', restartGame);









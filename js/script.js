const guessedLetters = document.querySelector(".guessed-letters");
// Holds already guessed letters
const guessButton = document.querySelector(".guess");
// Submits a guess
const inputBox = document.querySelector(".letter");
// Takes the letter for player's guess
const wordInProgress = document.querySelector(".word-in-progress");
// Correctly guessed letters
const remainingGuesses = document.querySelector(".remaining");
// Message informing player of remaining guesses
const numGuesses = document.querySelector(".remaining span");
// Number of guesses remaining
const messageToPlayer = document.querySelector(".message");
// Message informing player if guess was correct
const playAgainButton = document.querySelector(".play-again");
// Restarts game

const word = "magnolia";

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const playerGuess = inputBox.value;
    let listItem = document.createElement("li");
    listItem.innerText = playerGuess;
    guessedLetters.append(listItem);
    inputBox.value = "";

});

function hideWord (word){
    let letters = word.split("");
    letters.forEach(function (letter, index){
        letters.splice(index, 1, "●");
    });
    let hiddenWord = letters.join("");
    console.log(hiddenWord);
    wordInProgress.innerText = hiddenWord;
};


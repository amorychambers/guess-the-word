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
const arrayGuessedLetters = [];

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const playerEntry = inputBox.value;
    messageToPlayer.innerText = "";
    checkInput(playerEntry);
    const playerGuess = (checkInput(playerEntry)).toUpperCase();
    makeGuess(playerGuess);
});

function hideWord (word){
    let letters = word.split("");
    letters.forEach(function (letter, index){
        letters.splice(index, 1, "●");
    });
    let hiddenWord = letters.join("");
    wordInProgress.innerText = hiddenWord;
};
// Hides the new word from player until letters are guessed

hideWord(word);

function checkInput(input){
    const acceptedLetter = /[a-zA-Z]/g;
    const found = input.match(acceptedLetter);
    if (found === null) {
        messageToPlayer.innerText = "Please go right ahead and pop a letter in that box there. Go ahead, it's free. Just one please. Any letter, really! Oh LORD not that one though, are you trying to- *ahem*, excuse me, I meant to say, of course you can enter any one letter, I respect the way you want to play the game.";
        clearInput();
    } else if (found.length === 26) {
        messageToPlayer.innerText = "I like you. You're an out of the box thinker and I respect that. Sadly your genius 'enter the entire alphabet' plan is exactly the sort of cunning clownery I would have attempted. Let's chalk it up to a loss for the game and possibly your dignity, but a huge win for your problem solving skills and our interpersonal relationship. Maybe that's the true win.";        
        clearInput();
    } else if (found.length > 1) {
        messageToPlayer.innerText = "Slow down Moriarty. Cunning plan, but please only enter one letter at a time. Two letters? No dice. Three? Also no. Four, five, six?! That way madness lies. I think we'll both have a better time if you just enter one letter at a time.";
        clearInput();
    } else {
    clearInput();
    return found[0];
    }
};
// Checks to make sure player only inputs one letter

function clearInput(){
    inputBox.value = "";
};
// Removes letter from the input box


function makeGuess(e){
    const guess = e.toUpperCase();
    const alreadyGuessed = arrayGuessedLetters.includes(guess);
    if (alreadyGuessed === true){
        messageToPlayer.innerText = "You've already guessed that letter. Don't you think it's been through enough already?!"
    } else {
        addToGuessed(guess);
        updateWord(arrayGuessedLetters);
    }
};
// Checks if player has already submitted the letter, and if not adds to the guessed letter display

function addToGuessed(letter){
    arrayGuessedLetters.push(letter);
    let listItem = document.createElement("li");
    listItem.innerText = letter;
    guessedLetters.append(listItem);
};
// Displays already guessed letters on the screen

function updateWord(arrayGuessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const currentState = wordInProgress.innerText.split("");
    wordArray.forEach(function (letter, index){
        if (arrayGuessedLetters.includes(letter)) {
            currentState.splice(index, 1, letter);
        }
    });
    wordInProgress.innerText = currentState.join("");
};
const guessedLetters = document.querySelector(".guessed-letters");
// Holds already guessed letters
const guessButton = document.querySelector(".guess");
// Submits a guess
const inputBox = document.querySelector(".letter");
// Takes the letter for player's guess
const wordInProgress = document.querySelector(".word-in-progress");
// Correctly guessed letters
const allowedGuesses = document.querySelector(".remaining");
// Message informing player of remaining guesses
const numGuesses = document.querySelector(".remaining span");
// Number of guesses remaining
const messageToPlayer = document.querySelector(".message");
// Message informing player if guess was correct
const playAgainButton = document.querySelector(".play-again");
// Restarts game

let word = "magnolia";
const arrayGuessedLetters = [];
let remainingGuesses = 8;

async function getWord(){
    const data = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const wordList = await data.text();
    const wordListArray = wordList.split("\n");
    const randomIndex = Math.floor((Math.random() * wordListArray.length));
    const wordSelection = wordListArray[randomIndex];
    const newWord = wordSelection.trim();
    word = newWord;
    hideWord(word);
    console.log(word);
};
// Gets a new random word

getWord();

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
        countdownGuesses(guess);
        if (!messageToPlayer.classList.contains("lose")){
        updateWord(arrayGuessedLetters);
        }
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

function countdownGuesses(guess){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    if (!wordArray.includes(guess)){
        if (remainingGuesses > 1){
            remainingGuesses -= 1;
            numGuesses.innerHTML = `${remainingGuesses} guesses`;
        } else {
            remainingGuesses -= 1;
            numGuesses.innerHTML = `no guesses`;
            messageToPlayer.classList.add("lose")
            messageToPlayer.innerHTML = `<p class="lose-highlight">There are only around 170,000 words in the English language and this one managed to elude you. Did you try 'swordfish'? It's usually 'swordfish'</p>`;
            wordInProgress.innerText = word.toUpperCase();
        }
    }
};
// Counts down the player's remaining guesses upon incorrect guess until lose condition

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
    winCondition(wordInProgress);
};
// Updates the hidden word with correctly guessed letters

function winCondition(wordInProgress){
    const correctWord = word.toUpperCase();
    if (wordInProgress.innerText === correctWord){
        messageToPlayer.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats! Have a biscuit. Note that I am doing you the good grace of assuming your fine taste in biscuits and imagining a custard cream or perhaps a HobNob. If it's some kind of coconutty NICE bullshit or a garibaldi you keep that to yourself.</p>`;
        messageToPlayer.classList.add("win");
    }
};
// Checks if the player has correctly guessed the word
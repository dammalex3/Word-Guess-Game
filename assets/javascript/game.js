//Takes in a blankWordArray (dashed version of the magic word) and adds the letters are passed to the correct position
function buildWord(blankWordArray, letter, word) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            blankWordArray[i] = letter;
        }
    }
    return blankWordArray;
}

//check if a given letter is in a given array
function inWord(letter, wordArray) {
    for (var i = 0; i < wordArray.length; i++) {
        if (wordArray.indexOf(letter) >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

function addWrongGuess(arr, letter) {
    arr.push(letter);
    return arr;
}

function stringToArray(string) {
    var arr = [];
    for (var i = 0; i < string.length; i++) {
        arr[i] = string.charAt(i);
    }
    return arr;
}

function decrement(startValue) {
    return startValue - 1;
}

//set the magic word
function pickWord(words) {
    var word = stringToArray(words[Math.floor((Math.random() * words.length) + 0)]);
    return word;
}

//create dashed word
function generateDashed(word) {
    var dashedArray = [];
    for (var i = 0; i < word.length; i++) {
        dashedArray.push("_  ");
    }
    return dashedArray;
}

//set variables
var words = ["cardinals","falcons","ravens","bills","panthers","bears","bengals","browns","cowboys","broncos","lions","packers","texans","colts","jaguars","chiefs","chargers","rams","dolphins","vikings","patriots","saints","giants","jets","raiders","eagles","steelers","forty-niners","seahawks","buccaneers","titans","redskins",];
var wrongGuesses = [];
var guessesRemaining = 10;

//Set the "magic word". Pick a random word from the list of words and turn it into array
var magicWord = pickWord(words);

//Generate the array with dashes as a placeholder for the guessed word
var guessedWord = generateDashed(magicWord);

//Dispay
var guessedWordText = document.getElementById("guessedword-text");
guessedWordText.textContent = guessedWord.join("  ");

var guessesRemainingText = document.getElementById("guesses-remaining-text");
guessesRemainingText.textContent = "Guesses Remaining: " + guessesRemaining;


//call this function whenever a key is pressed
document.onkeyup = function(event) {

    //take the input and assign to variable
    var userGuess = event.key.toLowerCase();

    //check if word is correct and reset the game if it is
    if (guessedWord.join("") === magicWord.join("")) {

        //reset the game
        magicWord = pickWord(words);
        guessedWord = generateDashed(magicWord);
        wrongGuesses = [];
        guessesRemaining = 10;
        document.getElementById("win-loss").textContent = "";
        document.getElementById("instructions").textContent = "";
    }

    else {
        //check if user has already guessed that letter and alert them
        if (inWord(userGuess, wrongGuesses) || inWord(userGuess, guessedWord)) {
            alert("You already guess that!");
        }

        //if the letter has not been guessed yet
        else {

            //check if the guessed letter is in the word
            if (inWord(userGuess, magicWord)) {

                //if the guessed letter is in the word then call buildWord to add it to the word the user is building with their guesses
                guessedWord = buildWord(guessedWord, userGuess, magicWord);

                //check if word is complete
                if (guessedWord.join("") === magicWord.join("")) {

                    //tell the user they won and reset the game
                    var guessedWordText = document.getElementById("guessedword-text");
                    guessedWordText.textContent = guessedWord.join("  ");
                    document.getElementById("win-loss").textContent = "YOU WIN!";
                    document.getElementById("instructions").textContent = "Press any key to play again.";
                    guessedWord = magicWord;
                }
            }
        
            //if the guessed letter is not in the word
            else {
                
                //add it to the list of wrong guesses 
                wrongGuesses = addWrongGuess(wrongGuesses, userGuess);

                //decrement guesses remaining
                guessesRemaining = decrement(guessesRemaining)

                //when the user is out of guesses alert them and reset the game
                if (guessesRemaining === 0) {
                    document.getElementById("win-loss").textContent = "You Lose!";
                    document.getElementById("instructions").textContent = "Press any key to play again.";
                    guessedWord = magicWord;
                }
            }
        }

    }
    
    // Create variables that hold references to the places in the HTML where we want to display things.
    var guessedWordText = document.getElementById("guessedword-text");
    var wrongGuessText = document.getElementById("wrong-guess-text");
    var guessesRemainingText = document.getElementById("guesses-remaining-text");
    
    // Display
    guessedWordText.textContent = guessedWord.join("  ");
    wrongGuessText.textContent = wrongGuesses.join("  ");
    guessesRemainingText.textContent = "Guesses Remaining: " + guessesRemaining;
  };


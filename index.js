let inquirer = require('inquirer');
let Word = require('./word');

const wordChoices = ["washington", "adams", "jefferson", "madison", "monroe", "jackson", "harrison", "tyler", "polk", "taylor", "fillmore", "pierce", "buchanan", "lincoln", "johnson", "grant", "hayes", "garfield", "arthur", "cleveland", "mckinley", "roosevelt", "taft", "wilson", "harding", "coolidge", "hoover", "truman", "eisenhower", "kennedy", "nixon", "ford", "carter", "reagan", "bush", "clinton", "obama", "trump"];

let word = "";
let wordObj = {};
let remainingGuesses = 6;
let displayedWord = "";

//selects a new answer word
function chooseWord(){
    let randomIndex = Math.floor(Math.random() * wordChoices.length);
    word = wordChoices[randomIndex];
}

//resets and starts a new game
function newGame(){
    remainingGuesses = 6;
    chooseWord();
    console.log(word);
    wordObj = new Word(word);
    wordObj.makeArr();
    displayedWord = wordObj.wordDisplay();
    console.log("Your word is: " + displayedWord);
    promptGuess();
}

//starts the prompts for user guesses
function promptGuess(){
    //checks if the word is already complete - then you win
    if(displayedWord.indexOf("_") === -1){
        win();
    //checks if you're out of lives - then you lose
    }else if(remainingGuesses === 0){
        lose();
    }else{
        inquirer.prompt([
            {
                name: "userGuess",
                message: "Guess a letter:",
                type: "input",
                validate: function(name){
                    //user must enter 1 letter (or special character[which will be wrong])
                    if (!name){
                        return false;
                    }else if (name.length > 1){
                        return false;
                    }else if (!isNaN(parseInt(name))){
                        return false;
                    }else{
                        return true;
                    };
                }
            }
        ]).then(function(answer){
            wordObj.guess(answer.userGuess.toLowerCase());
            //saves the new display string to compare it to the previous one
            let newDisplayedWord = wordObj.wordDisplay();
            //checks if there were any changes (if not, you guessed incorrectly)
            checkChanges(newDisplayedWord, displayedWord);
            console.log("Your word is: " + displayedWord);
            //keeps calling itself until a win or lose occurs
            promptGuess();
        })
    };
}

//checks how many _'s appear in the display to see if you made any progress with your guess
function checkChanges(newStr, oldStr){
    let oldDashCount = 0;
    let newDashCount = 0;
    for (let i = 0; i < oldStr.length; i++){
        if (oldStr[i] === "_"){
            oldDashCount ++;
        };
    };
    for (let j = 0; j < newStr.length; j++){
        if (newStr[j] === "_"){
            newDashCount ++;
        };
    };
    //if you made progress (guessed correctly), then update the display to new string
    if (newDashCount < oldDashCount){
        displayedWord = newStr;
    }else{
    //if you did not make any progress (guessed incorrectly), then display is NOT updated and you lose a life
        remainingGuesses --;
        console.log("Incorrect, remaining guesses: "+ remainingGuesses);
    }
}

function win(){
    console.log('Congratulations, you win!');
    playAgainQuestion();
}

function lose(){
    console.log("Sorry, you lose...\n The correct answer was: "+ word);
    playAgainQuestion();
}

//after each round, prompt user if they want to keep playing
function playAgainQuestion(){
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to play again?',
            name: "playAgain",
            default: false
        }
    ]).then(function(answer){
        if (answer.playAgain){
            newGame();
        }else{
            console.log("Goodbye!")
        };
    });
}

//only displays upon first launch
console.log("Welcome to Presidential Hangman");
console.log("-------------------------------------------");
console.log("**Instructions**-\n    -all the answers are presidents' last names\n    -guess one letter at a time when prompted");
console.log("-------------------------------------------");

//initialize game
newGame();
let inquirer = require('inquirer');

let Word = require('./word');

const wordChoices = ["washington", "adams", "jefferson", "madison", "monroe", "jackson", "harrison", "tyler", "polk", "taylor", "fillmore", "pierce", "buchanan", "lincoln", "johnson", "grant", "hayes", "garfield", "arthur", "cleveland", "mckinley", "roosevelt", "taft", "wilson", "harding", "coolidge", "hoover", "truman", "eisenhower", "kennedy", "nixon", "ford", "carter", "reagan", "bush", "clinton", "obama", "trump"];

let word = "";

let wordObj = {};

let remainingGuesses = 6;

let displayedWord = "";

function chooseWord(){
    let randomIndex = Math.floor(Math.random() * wordChoices.length);
    word = wordChoices[randomIndex];
}

function newGame(){
    remainingGuesses = 6;
    chooseWord();
    console.log(word);
    wordObj = new Word(word);
    wordObj.makeArr();
    displayedWord = wordObj.wordDisplay();
    console.log("your word is " + displayedWord);
    promptGuess();
}

function promptGuess(){
    if (displayedWord.indexOf("_") === -1){
        win();
    }
    if (remainingGuesses === 0){
        lose();
    }
    inquirer.prompt([
        {
            name: "userGuess",
            message: "Guess a letter:",
            type: "input",
            // validate: function(input){
            //     if (!input){
            //         return false;
            //     }else if (input.length > 1){
            //         return false;
            //     }else if (typeof parseInt(input) === "number"){
            //         return false;
            //     }else{
            //         return true;
            //     };
            // }
        }
    ]).then(function(answer){
        wordObj.guess(answer.userGuess);
        displayedWord = wordObj.wordDisplay();
        console.log("your word is " + displayedWord);
        promptGuess();
    })
}

function win(){
    console.log('Congratulations, you win!');
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

console.log("Welcome to Presidential Hangman");
console.log("--------------------------------------");

newGame();
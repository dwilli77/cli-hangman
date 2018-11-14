let inquirer = require('inquirer');

let Word = require('./word');

const wordChoices = ["washington", "adams", "jefferson", "madison", "monroe", "jackson", "harrison", "tyler", "polk", "taylor", "fillmore", "pierce", "buchanan", "lincoln", "johnson", "grant", "hayes", "garfield", "arthur", "cleveland", "mckinley", "roosevelt", "taft", "wilson", "harding", "coolidge", "hoover", "truman", "eisenhower", "kennedy", "nixon", "ford", "carter", "reagan", "bush", "clinton", "obama", "trump"];

let word = "";

let remainingGuesses = 6;

function chooseWord(){
    let randomIndex = Math.floor(Math.random() * wordChoices.length);
    word = wordChoices[randomIndex];
}

function newGame(){
    remainingGuesses = 6;
    chooseWord();
    let wordObj = new Word(word);
    wordObj.makeArr();
}

console.log("Welcome to Presidential Hangman");
console.log("--------------------------------------");


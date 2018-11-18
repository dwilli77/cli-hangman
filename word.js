let Letter = require('./letter');

function Word(word){
    this.word = word;
    //array of letter objects representing the letters of the word
    this.letterArr = [];
    //fills the above array
    this.makeArr = function(){
        for(let i = 0; i < this.word.length; i++){
            let letterObj = new Letter(word.charAt(i));
            this.letterArr.push(letterObj);
        };
    };
    //returns a string representing the word
    this.wordDisplay = function(){
        let myString = "";
        for(let i = 0; i <this.letterArr.length;i++){
            myString += this.letterArr[i].charDisplay();
        };
        return myString;
    };
    //game functionality that checks if the user's guess is in the word
    this.guess = function(char){
        for(let i = 0; i<this.letterArr.length;i++){
            this.letterArr[i].checkLetter(char);
        };
    };
}


module.exports = Word;
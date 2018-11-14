let Letter = require('./letter');

function Word(word){
    this.word = word;
    //array of letter objects representing the letters of the word
    this.letterArr = [];
    //fills the above array
    this.makeArr = function(){
        for(let i = 0; i < word.length; i++){
            let letterObj = new Letter(word.charAt(i));
            letterArr.push(letterObj);
        };
    };
    //returns a string representing the word
    this.wordDisplay = function(){
        let myString = "";
        for(let i = 0; i <letterArr.length;i++){
            myString += letterArr[i].charDisplay();
        };
        return myString;
    };
    this.guess = function(char){
        for(let i = 0; i<letterArr.length;i++){
            letterArr[i].checkLetter();
        };
    };
}

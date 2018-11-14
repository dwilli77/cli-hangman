function Letter(letter){
    //underlying character
    this.letter = letter;
    //boolean storing whether the letter has been guessed
    this.guessed = false;
    //returns underlying letter if it has been guessed, and a placeholder if not
    this.charDisplay = function(){
        if(this.guessed){
            return this.letter;
        }else{
            return "_";
        };
    };
    //checks if a given character matches the underlying character and updated boolean if matches
    this.checkLetter = function(char){
        if(char === this.letter){
            this.guessed = true;
        }
    };
}

module.exports = Letter;

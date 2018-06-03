// GLOBAL VARIABLES
var words = ["captain", "cannon", "cutlass", "galleon", "maroon", 
"mutiny", "parrot", "pistol", "rum", "scurvy", "treasure"]

var winsText = document.getElementById("wins");
var currentWordText = document.getElementById("currentWord");
var guessesRemainingText = document.getElementById("guessesRemaining");
var lettersGuessedText = document.getElementById("lettersGuessed");

//GLOBAL FUNCTIONS


//OBJECTS
var game = {
    wins: 0,
    word: "",
    wordArray: [],
    currentWord: [],
    currentWordIsSet: false,
    guessesRemaining: 0,
    currentLetter: "",
    lettersGuessed: [],

    initializeGame: function(){
        this.guessesRemaining = 12;
        this.currentWord = [];
        this.chooseWord();
        this.setCurrentWord();
    },
    
    chooseWord: function(){
        this.word = words[Math.floor(Math.random() * words.length)];
        console.log(this.word);
    },

    setCurrentWord: function(){
        this.wordArray = this.word.split("");
        console.log(this.wordArray);

        for(i=0; i < this.wordArray.length; i++){
            if(i == this.wordArray.length-1){
                this.currentWord[i] = "_";
            }
            else{
                this.currentWord[i] = "_ ";
            } 
        }

        this.currentWord = this.currentWord.join("");
        console.log(this.currentWord);
        currentWordText.textContent = this.currentWord;
    },

    letterCheck: function(input){

    },

    updateCurrentWord: function(index){

    },

    updateGuesses: function(){
        this.guessesRemaining -= 1;
        guessesRemainingText.textContent = this.guessesRemaining;
    },

    win: function(){
        this.wins += 1;
        winsText.textContent = this.wins;
        this.initializeGame();
    },


}

//LOGIC

game.chooseWord();
game.setCurrentWord();

document.onkeyup = function(event){
    var userGuess = event.key;

    game.letterCheck(letterCheck);
}



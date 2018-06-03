// GLOBAL VARIABLES
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", 
"L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

var words = ["BOOTY", "CAPTAIN", "CANNON", "CUTLASS", "GALLEON", "HOOK", "KEELHAUL", 
"MAROON", "MAST", "MUTINY", "PARROT", "PISTOL", "PLANK", "PLUNDER", "RUM", "SCURVY", "TREASURE"]

var winsText = document.getElementById("wins");
var currentWordText = document.getElementById("currentWord");
var guessesRemainingText = document.getElementById("guessesRemaining");
var lettersGuessedText = document.getElementById("lettersGuessed");

//GLOBAL FUNCTIONS

//GAME OBJECT
var game = {
    wins: 0,
    word: "",
    wordArray: [],
    currentWord: [],
    guessesRemaining: 0,
    lettersGuessed: [],
    guessWasCorrect: false,
    gameOver: false,

    initializeGame: function(){
        this.guessesRemaining = 12;
        guessesRemainingText.textContent = this.guessesRemaining;
        this.lettersGuessed = [];
        lettersGuessedText.textContent = this.lettersGuessed;
        this.chooseWord();
        this.setCurrentWord();
    },
    
    chooseWord: function(){
        this.word = words[Math.floor(Math.random() * words.length)];
    },

    setCurrentWord: function(){
        this.wordArray = this.word.split("");
        this.currentWord = [];

        for(i=0; i < this.wordArray.length; i++){
            this.currentWord[i] = "_";
        }

        this.updateCurrentWordText();
    },

    updateCurrentWordText: function(index){
        currentWordText.textContent = this.currentWord.join(" ");
    },

    letterCheck: function(input){
        var letter = input;
        for(i = 0; i <= this.wordArray.length; i++){
            if(letter === this.wordArray[i]){
                this.currentWord[i] = this.wordArray[i];
                this.updateCurrentWordText();
                this.guessWasCorrect = true;             
            }
        }
        
        this.updateGuesses(letter);
    },

    updateGuesses: function(guess){
        if(this.guessWasCorrect === false){
            for(i = 0; i <= this.lettersGuessed.length + 1; i++)
            {
                if(guess === this.lettersGuessed[i]){
                    break;
                }
                else if(i === this.lettersGuessed.length + 1){
                    this.lettersGuessed.push(guess);
                    this.guessesRemaining -= 1;
                    guessesRemainingText.textContent = this.guessesRemaining;
                    lettersGuessedText.textContent= this.lettersGuessed.join(" ");
                    break;
                }
            }
            
            this.loseCheck();
        }
        else{
            this.guessWasCorrect = false;
            this.winCheck();
        }
    },

    winCheck: function(){
        for(i = 0; i <= this.wordArray.length; i++)
        {
            if(this.currentWord[i] !== this.wordArray[i]){
                break;
            }
            else if(i === this.wordArray.length){
                this.wins += 1;
                winsText.textContent = this.wins;
                alert("X marks the spot. You won!");
                this.initializeGame(); 
            } 
        }
    },

    loseCheck: function(){
        if(this.guessesRemaining === 0){
            alert("You walked the plank. Try again!");
            this.initializeGame();
        }  
    }
}

//INITIALIZE GAME AND READ USER INPUT

game.initializeGame();

document.onkeyup = function(event){
    var userInput = event.key;
    userInput = userInput.toUpperCase();

    for(i = 0; i < alphabet.length; i++)
    {
        if(userInput === alphabet[i]){
            game.letterCheck(userInput);
            break;
        }
    }
}



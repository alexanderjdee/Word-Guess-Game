// Array to story alphabet
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", 
"L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// Array to store words for game
var words = ["BOOTY", "CAPTAIN", "CANNON", "CUTLASS", "GALLEON", "HOOK", "KEELHAUL", 
"MAROON", "MAST", "MUTINY", "PARROT", "PISTOL", "PLANK", "PLUNDER", "RUM", "SCURVY", "TREASURE"]

//HTML spans to modify
var gameAnnouncementText = document.getElementById("gameAnnouncement");
var winsText = document.getElementById("wins");
var currentWordText = document.getElementById("currentWord");
var guessesRemainingText = document.getElementById("guessesRemaining");
var lettersGuessedText = document.getElementById("lettersGuessed");


//GAME OBJECT
var game = {
    wins: 0,
    word: "",
    currentWord: [],
    guessesRemaining: 0,
    lettersGuessed: [],
    guessWasCorrect: false,
    gameOver: false,

    // Set up a new game
    initializeGame: function(){
        this.gameOver = false;
        gameAnnouncementText.textContent = "Press any letter to get started!";
        this.guessesRemaining = 12;
        guessesRemainingText.textContent = this.guessesRemaining;
        this.lettersGuessed = [];
        lettersGuessedText.textContent = this.lettersGuessed;
        this.chooseWord();
        this.setCurrentWord();
    },
    
    // The game choose a new word
    chooseWord: function(){
        this.word = words[Math.floor(Math.random() * words.length)];
    },

    // Set the current word in an array and replace with '_'
    setCurrentWord: function(){
        this.currentWord = [];

        for(i=0; i < this.word.length; i++){
            this.currentWord[i] = "_";
        }

        this.updateCurrentWordText();
    },

    //Add a space between the blanks for each letter in the selected word
    updateCurrentWordText: function(){
        currentWordText.textContent = this.currentWord.join(" ");
    },

    // Check if the letter guessed was correct
    letterCheck: function(input){
        var letter = input;
        for(i = 0; i <= this.word.length; i++){
            if(letter === this.word.charAt(i)){
                this.currentWord[i] = this.word.charAt(i);
                this.updateCurrentWordText();
                this.guessWasCorrect = true;             
            }
        }
        
        this.updateGuesses(letter);
    },

    // Update the number of guesses
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

    // Check if the user won
    // If they won, reset the game
    winCheck: function(){
        for(i = 0; i < this.word.length; i++)
        {
            if(this.currentWord[i] !== this.word.charAt(i)){
                break;
            }
            else if(i === this.word.length - 1){
                this.gameOver = true;
                this.wins += 1;
                winsText.textContent = this.wins;
                gameAnnouncementText.textContent = "X marks the spot. You won! Press 'Enter' to continue.";
            } 
        }
    },

    // Check if the user lost
    // If the user lost, notify them and reset the game
    loseCheck: function(){
        if(this.guessesRemaining === 0){
            this.gameOver = true;
            gameAnnouncementText.textContent = "You walked the plank! Press 'Enter' to try again.";
        }  
    }
}

//INITIALIZE GAME AND READ USER INPUT

game.initializeGame();

document.onkeyup = function(event){
    var userInput = event.key;
    userInput = userInput.toUpperCase();

    if(game.gameOver === false){
        for(i = 0; i < alphabet.length; i++)
        {
            if(userInput === alphabet[i]){
                game.letterCheck(userInput);
                break;
            }
        }
    }
    else{
        if(event.key == "Enter"){
            game.initializeGame();
            return;
        }
    } 
}



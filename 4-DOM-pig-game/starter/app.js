/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* function btn(){//do something here}
btn(); //to call a function

document.querySelector('.btn-roll').addEventListener('click', btn); //eventListener calls the function */

// declaring variables
let scores, roundScore, activePlayer, gamePlaying, gameScore, lastDice;

init();

//Roll Dice Button Functionality
document.querySelector('.btn-roll').addEventListener('click', function(){ //call an anonymus function
    
    if(gamePlaying){ //Checks if game is playing
        //1. Random number
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        
        //2. Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;

        let diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = `dice-${dice2}.png`;
        
        //3. Updated the round score IF the rolled number is NOT a 1
        if ((dice === 6 || dice2 === 6) && lastDice === 6){ //Challenge 1
            //Player looses score
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = '0';
            nextPlayer();
        }else if (dice !== 1 && dice2 !== 1){ //Challenge 3
            //Add Score
            roundScore += dice + dice2; /* ALT: roundScore = roundScore + dice; */
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }else{
            //Next Player
            nextPlayer();
        }

        lastDice = dice; //stored variable
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying){ //Checks if game is playing

        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        // Game Score Value
        gameScore = document.getElementById('winScore').value;
        let finalScore;

        // FALSE = undefined, 0, null or ""
        // TRUE = Anything else
        if (gameScore){ //check if a score was entered (This is FALSE)
            finalScore = gameScore;
        }else{
            finalScore = 100;
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= finalScore){
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false; //Game is NOT playing
        } else {
            //Next Player
            nextPlayer();
        }
    }

});

function nextPlayer(){
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    //players scorces
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true; //Game is playing

    document.getElementById('winScore').value = '100';
    
    //Hiding the Dice
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    //making values 0 (using an Array)
    /* let ids = ['score-0','score-1','current-0','current-1'];
    for (let i = 0; i < ids.length; i++){
        document.getElementById(ids[i]).textContent = '0';
    } */
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //removing classes (using querySelectorAll)
    /* let reSet = document.querySelectorAll('.player-0-panel, .player-1-panel');
    for (let i = 0; i < reSet.length; i++){
        reSet[i].classList.remove('winner','active');
    } */
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}
/* Alternative way to write it
if(activePlayer === 0){
    activePlayer = 1;
}else{
    activePlayer = 0;
} */


/*-----------------------------------------------------------------------------
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winnning score, so that they can change the
predefined score of 100.
(Hint: you can read that value with the .value proerty in Javascript. This is a good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
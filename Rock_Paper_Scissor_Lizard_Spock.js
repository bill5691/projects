// William Skiles
// ITEC 345

let get = id => document.getElementById(id);

// "Global" Game information.  
// (More values are added to this object in the "startGame()" function.)
var gameData = {
	roundsToPlay: 0,
	roundsRemaining: 0,
	userWins: 0,
	compWins: 0
};


// Called by the BODY's "onLoad" event to finish initializing the game elements.
function initGame() {
	get("START_BUTTON").disabled = false;
	get("USER_CHOICE_BUTTONS").hidden = true;
	get("GAME_DATA").hidden = true;
}


// Called when the user clicks the "Start" button to set up the actual game.
function startGame() {
	var choicesArea = get("USER_CHOICE_BUTTONS");
	var rtp = get("ROUNDS_TO_PLAY");
	var roundsToPlay = parseInt(rtp.value);

	if (isNaN(roundsToPlay)) {
		alert("Select number of rounds");
	} else {
		choicesArea.hidden = false;
		get("START_BUTTON").disabled = true;
		get("ROUNDS_TO_PLAY").disabled = true;
		get("GAME_DATA").hidden = false;

		gameData.roundsToPlay = roundsToPlay;
		gameData.roundsRemaining = roundsToPlay;
		get("ROUNDS_REMAINING_TEXT").innerHTML = " " + gameData.roundsRemaining;
	}
}


// Called whenever a "user choice" button is clicked.
function userChoice(buttonObj) {
	// Decrement the rounds remaining
	var cChoice = compChoice();
    gameData.roundsRemaining--;
	get("ROUNDS_REMAINING_TEXT").innerHTML = " " + gameData.roundsRemaining;
	
    console.log("Rounds Remaining: " + gameData.roundsRemaining);
	console.log("You selected: " + buttonObj.id);
	console.log("Computer selected: " + cChoice);
	
	getWinner(buttonObj.id, cChoice);
	get("USER_CHOICE_TEXT").innerHTML = " " + buttonObj.id;
	get("COMP_CHOICE_TEXT").innerHTML = " " + cChoice;
	get("USER_SCORE_TEXT").innerHTML = " " + gameData.userWins;
	get("COMP_SCORE_TEXT").innerHTML = " " + gameData.compWins;
	
	console.log("User wins: " + gameData.userWins);
	console.log("Comp wins: " + gameData.compWins);

	if (gameData.roundsRemaining <= 0) endGame();
}


// Called by the userChoice() function to get the computer's choice.
function compChoice() {
	var choiceArray = ["ROCK", "SCIS", "PAPR", "LZRD", "SPOK"];
	
	return choiceArray[getRandomInt(0,5)];
}

function getWinner(humanChoice, computerChoice) {
	var uChoice = humanChoice;
	var cChoice = computerChoice;
	
	if (testTie(uChoice, cChoice) == false) {
		switch (uChoice) {
			case "ROCK": if (cChoice == "LZRD" || cChoice == "SCIS") {
			gameData.userWins++;
			alert("You win! " + uChoice + " beats " + cChoice);
			} else {
			gameData.compWins++;
			alert("Computer wins! " + cChoice + " beats " + uChoice);
			}
			break;
			case "PAPR": if (cChoice == "ROCK" || cChoice == "SPOK") {
			gameData.userWins++;
			alert("You win! " + uChoice + " beats " + cChoice);
			} else {
			gameData.compWins++;
			alert("Computer wins! " + cChoice + " beats " + uChoice);
			}
			break;
			case "SCIS": if (cChoice == "PAPR" || cChoice == "LZRD") {
			gameData.userWins++;
			alert("You win! " + uChoice + " beats " + cChoice);
			} else {
			gameData.compWins++;
			alert("Computer wins! " + cChoice + " beats " + uChoice);
			}
			break;
			case "LZRD": if (cChoice == "SPOK" || cChoice == "PAPR") {
			gameData.userWins++;
			alert("You win! " + uChoice + " beats " + cChoice);
			} else {
			gameData.compWins++;
			alert("Computer wins! " + cChoice + " beats " + uChoice);
			}
			break;
			case "SPOK": if (cChoice == "ROCK" || cChoice == "SCIS") {
			gameData.userWins++;
			alert("You win! " + uChoice + " beats " + cChoice);
			} else {
			gameData.compWins++;
			alert("Computer wins! " + cChoice + " beats " + uChoice);
			}
			break;
		}
	} else {
		alert("It's a tie!");
	}
}

function testTie(humanChoice, computerChoice) {
	var uChoice = humanChoice;
	var cChoice = computerChoice;
	
	if (uChoice == cChoice) {
		return true;
	} else {
		return false;
	}
}

function endGame() {
	get("START_BUTTON").disabled = false;
	get("ROUNDS_TO_PLAY").disabled = false;
	get("USER_CHOICE_BUTTONS").hidden = true;
	get("GAME_DATA").hidden = true;
	
	if (gameData.userWins > gameData.compWins) {
		alert("Winner: You!\nResults: You - " + gameData.userWins + " Computer - " + gameData.compWins);
	} else if (gameData.userWins == gameData.compWins) {
		alert("It's a tie!\nResults: You - " + gameData.userWins + " Computer - " + gameData.compWins);
	} else {
		alert("Winner: Computer!\nResults: You - " + gameData.userWins + " Computer - " + gameData.compWins);
	}
	
	gameData.userWins = 0;
	gameData.compWins = 0;
}


// Random integer generator from: 
// FROM: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


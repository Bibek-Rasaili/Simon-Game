var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var first = false;
var level = 0;

var gameRunning = false;
var countClick = 0;
var countingClick = 0;


function gameOver() {
  var wrong = new Audio('sounds/wrong.mp3');
  wrong.play();
  //Game Over sound
  $('#level-title').text("Game Over, Press Any Key to Restart"); //Game Over visual //heading
  $('body').addClass("game-over"); //background
  setTimeout(function() {
    $('body').removeClass("game-over");
  }, 100);

  //Restarting the Game (reinitialising the game variables - first, level, userClickPattern)
  first = false;
  gameRunning = false;
  level = 0;
  countClick = 0;

  //Emptying both patterns
  console.log("Game Over \n");
  console.log("User Pattern: " + userClickPattern + " \n");
  userClickPattern.length = 0; //this empties array
  console.log("User Pattern now: " + userClickPattern + "\n");

  console.log("Game Pattern: " + gamePattern + " \n");
  gamePattern = []; //This empties array
  console.log("Game Pattern now: " + gamePattern + " \n");
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed'); //adds clicked effect
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}

function implementChosenSound(randomChosenColour) {
  var sound = new Audio('sounds/' + randomChosenColour + '.mp3');
  sound.play();
}

//This function animates the randomChosenColour to the screen
function implementDivColour(randomChosenColour) {
  $('#' + randomChosenColour).fadeOut(150).fadeIn(150);
  //Fade Out, Fade In - chained together creates a 'flash' effect.

  implementChosenSound(randomChosenColour);
}




function comparePatterns(user, game) {
  var same = true;

  console.log("Comparing... ");

  //changed this to user.length from game.length
  //as userClickedPattern is clearn after every successive "level"
  //therefore if we had game.length, it would be comparing against null
  //hence returning false.
  for (var i = 0; i < user.length; i++) {
    if (user[i] === game[i]) {
      //same
      console.log(user[i] + " U Same G " + game[i]);
      //no need to set to true as it starts with true
      //and will only return false if conflict.
    } else {
      console.log(user[i] + " U NOTSAME G " + game[i]);
      same = false //if conflict.
    }
  }

  return same; //returns true is same, false is conflict
  //return true of false
}






function nextSequence() {

  // level++; //every new seq is new/next level
  $('#level-title').text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //Generate number 0 - 3
  var randomChosenColour = buttonColours[randomNumber]; //the random number chooses color

  gamePattern.push(randomChosenColour);
  //the chosen color is added to Game Pattern,
  //which will hold the sequence of the game
  console.log("No: " + randomNumber + "random color " + randomChosenColour + " game pattern " + gamePattern);

  implementDivColour(randomChosenColour);
}

function flashHeading() {
  $('#level-title').fadeOut(200).fadeIn(200);

  //Unfortunately have to access CSS Directly.
  //instead of adding a class to change style.
  //This is because the original style was added to ID.
  // and.. ID overrules all. Therefore direct access was needed.
  $('#level-title').css("color", "red");
  setTimeout(function() {
    $('#level-title').css("color", "#FEF2BF");
  }, 200);
}

function nextRound() {
  if (gameRunning) {
    console.log("I'm in!");
    level++;
    nextSequence();
    userClickPattern = [];

    countClick = 0;
  }
} //REDUNDANT


// Click Event Listeners
$('div[type="button"]').click(function() {

  if (gameRunning) {
    console.log("listener COUNT click\n " + countClick);
    countClick++; //or ++countClick ?
    console.log(countClick);
    //gets user input
    var userChosenColour = this.id; //stores the id (color) of the user input
    console.log(this.id);

    userClickPattern.push(userChosenColour);
    console.log("user pattern: " + userClickPattern);


    //Implement user input sounds and visuals
    implementChosenSound(userChosenColour);
    //this will go above sound but stays here for now
    animatePress(userChosenColour);



    //---- under review
    console.log("solving double click bug");
    console.log(gamePattern.length);
    console.log(countClick);
    console.log(level);
    if (countClick > gamePattern.length) {
      return gameOver();
    } else {
      //may need mouseClick > level ? gameover()

      //If the user has clicked more than needed than game over.
      //else proceede with process

      //check and compare user input
      var same = comparePatterns(userClickPattern, gamePattern);
    }
    console.log("Same is NOW set to: \n" + same);

    console.log("Past Compare Pattern, - into if same check");

    console.log("same , click , level \n" + same + " " + countClick + " " + level);
    //if same continue (nextSequence())
    if (same) { // maybe && countClick < level
      console.log("countClick + level \n" + countClick + " " + level);

      //Do nothing untill all input taken. Validation still enforced by same variable
      if (countClick === level) {


        setTimeout(nextRound, 500);
        //this instead of next seq as it was skipping next seq but initliainsing the other 2 variable


        //if user and game pattern same then carry on to nextSequence

        console.log("Seems fine..");
        //Clear the user Pattern so they have to do whole pattern again not 1
      }

    } else {
      gameOver();
      //if conflict then game over
    }

  } else {
    flashHeading();
  }
})




//Main - Starter function
$(document).keydown(function() {
  if (!first) {
    //Level++ can be here - possibilty - BUT
    level++ //will also have to be added end of each round/level
    nextSequence();
    first = true;
    gameRunning = true;
    //ANNSWE HERE?

  } else {

    console.log("stop PRESSING!");

  }
});

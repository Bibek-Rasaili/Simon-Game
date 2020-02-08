var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var first = false;
var level = 0;

var gameRunning = false;
var countClick = 0;

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


function gameOver() {
  //Game Over sound
  var wrong = new Audio('sounds/wrong.mp3');
  wrong.play();

  //Game Over visual
  //heading
  $('#level-title').text("Game Over, Press Any Key to Restart");

  //background
  $('body').addClass("game-over");

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
  // for (var i = 0; i < userClickPattern.length; i++) {
  //   userClickPattern.pop();
  //   console.log(userClickPattern + ". i is: "+i);
  // }
  userClickPattern.length = 0; //this empties array
  console.log("User Pattern now: " + userClickPattern + "\n");


  console.log("Game Pattern: " + gamePattern + " \n");
  // for(var i=0; i<gamePattern.length; i++) {
  //   gamePattern.pop();
  //   console.log(gamePattern);
  // }
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


function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4); //Generate number 0 - 3
  var randomChosenColour = buttonColours[randomNumber]; //the random number chooses color

  gamePattern.push(randomChosenColour);
  //the chosen color is added to Game Pattern,
  //which will hold the sequence of the game

  console.log("No: " + randomNumber + "random color " + randomChosenColour + " game pattern " + gamePattern);

  implementDivColour(randomChosenColour);
  level++; //every new seq is new/next level
  $('#level-title').text("Level " + level);
}



// Click Event Listeners
$('div[type="button"]').click(function() {
  if (gameRunning) {
    countClick++; //or ++countClick ?

    //gets user input
    var userChosenColour = this.id; //stores the id (color) of the user input
    console.log(this.id);

    userClickPattern.push(userChosenColour);
    console.log("user pattern: " + userClickPattern);


    //Implement user input sounds and visuals
    implementChosenSound(userChosenColour);
    //this will go above sound but stays here for now
    animatePress(userChosenColour);



    //check and compare user input
    var same = comparePatterns(userClickPattern, gamePattern);

    //if same continue (nextSequence())
    if (same) {
      //Do nothing untill all input taken. Validation still enforced by same variable
      if (countClick === level) {
        setTimeout(nextSequence, 800);
        //if user and game pattern same then carry on to nextSequence
        userClickPattern = [];
        countClick = 0;
        //Clear the user Pattern so they have to do whole pattern again not 1
      }
    } else {
      gameOver();
      //if conflict then game over
    }


  } else {
    alert("start the game first by pressing down any key on your keyboard");
  }
})

//Main - Starter function
$(document).keydown(function() {
  if (!first) {
    nextSequence();
    first = true;
    gameRunning = true;
  } else {
    console.log("stop PRESSING!");
  }

});

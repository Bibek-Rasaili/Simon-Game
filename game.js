var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var first = false;
var level = 0;

var gameRunning = false;
var countClick = 0;
var countingClick = 0;


function gameOver() {
  var wrong = new Audio('sounds/wrong.mp3');   //Game Over sound
  wrong.play();

  $('#level-title').text("Game Over, Press Any Key to Restart"); //Game Over visual - heading
  $('body').addClass("game-over"); //- background
  setTimeout(function() {
    $('body').removeClass("game-over");
  }, 100);

  //Restarting the Game (reinitialising the game variables - first, level, userClickPattern)
  first = false;
  gameRunning = false;
  level = 0;
  countClick = 0;

  //Emptying both patterns
  userClickPattern.length = 0; //this empties array
  gamePattern = []; //This empties array


  // For Mobile / smaller screen - device-width: (x)px ONLY.
  $('button[type="button"]').attr("disabled", false);
  $('button[type="button"]').addClass('btnStart');
  $('button[type="button"]').removeClass('disabledBtn');
  //REenable Start Button
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

  //user.length used instead of game.length as, userClickPattern is initialised after every successive "level"
  //therefore if we had game.length, it would be comparing against null
  //potential error/unnecessarily long code run
  for (var i = 0; i < user.length; i++) {
    if (user[i] === game[i]) {
      //same
      //no need to set to true as it starts with true

    } else {
      same = false //if conflict.
    }
  }
  return same; //returns true is same, false is conflict
}


//Game starts or next round, this function gets the next sequence.
function nextSequence() {

  $('#level-title').text("Level " + level);  //Changes heading after "game over" heading

  var randomNumber = Math.floor(Math.random() * 4); //Generate number 0 - 3
  var randomChosenColour = buttonColours[randomNumber]; //the random number chooses color

  gamePattern.push(randomChosenColour); //add the new sequence to gamePattern

  implementDivColour(randomChosenColour);
}


function flashHeading() {
  $('#level-title').fadeOut(200).fadeIn(200); //Fades out and in - impersonates flashing

  $('#level-title').css("color", "red"); //Heading color to red, timeout - imitiates flashing
  setTimeout(function() {
    $('#level-title').css("color", "#FEF2BF");
  }, 200);
}


function nextRound() {
  if (gameRunning) { //This was added to negate "double click bug",
                    // where the next seq would be affected - see Github commits on "own-spec" branch

    level++;

    nextSequence();

    userClickPattern = [];
    countClick = 0;
  }
}


// Click Event Listeners
$('div[type="button"]').click(function() {

  if (gameRunning) {

    countClick++;

    //gets user input
    var userChosenColour = this.id;
    userClickPattern.push(userChosenColour);

    //Implement user input sounds and visuals
    implementChosenSound(userChosenColour);
    animatePress(userChosenColour);

    if (countClick > gamePattern.length) {
      //This was introduced to solve double click bug
      //See github commits - on own-spec
      return gameOver();

    } else {
      //compare input to gamePattern
      var same = comparePatterns(userClickPattern, gamePattern);
    }

    if (same) {
      //if its same, it passes.
      //if its same and = level, go to next round
      if (countClick === level) {
        setTimeout(nextRound, 500);
      }

    } else {
      gameOver();
      //if conflict then game over
    }
  } else {
    flashHeading();
  }
});



function startGame(){

  level++ //will also have to be added end of each round/level
  nextSequence();
  gameRunning = true;

  first = true;
// first also set here because, game should only start once, by clicking or keydown
}

//Main - Game starts when keydown event occurs
$(document).keydown(function() {

  if (!first) {

    if($('.btnContainer').css('display') === 'block'){
      //if its small screen, class btnContainer will have display:block;
      disableStartButton();
    }

    startGame(); //moved to this function

  } else {
    console.log("Game is already underway.");
  }
});

function disableStartButton() {
  $('button[type="button"]').attr("disabled", true);
  $('button[type="button"]').addClass('disabledBtn');
  $('button[type="button"]').removeClass('btnStart');
}

// For Mobile / smaller screen - device-width: (x)px ONLY.
$('button[type="button"]').on("click",function(){
  //$('#btnStart') only allowing 1 click for some reason.
  //Then does all the adding and removing class in gameOver()
  //BUT doesn't register a click...

  disableStartButton();
  // had to be removeClass because it was still doing hover effect - 'lighting up'
  startGame();
});

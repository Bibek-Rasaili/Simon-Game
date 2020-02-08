var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var first = false;
var level = 0;

function animatePress(currentColour){
  $('#'+currentColour).addClass('pressed'); //adds clicked effect
  setTimeout(function(){
    $('#'+currentColour).removeClass("pressed");
  },100);
}

function implementChosenSound(randomChosenColour) {
  var sound = new Audio('sounds/'+randomChosenColour+'.mp3');
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

  console.log("No: "+randomNumber+"random color "+randomChosenColour+ " game pattern "+gamePattern);

  implementDivColour(randomChosenColour);
  level++; //every new seq is new/next level
  $('#level-title').text("Level "+level);
}



// Click Event Listeners
$('div[type="button"]').click(function(){
  var userChosenColour = this.id; //stores the id (color) of the user input
  console.log(this.id);

  userClickPattern.push(userChosenColour);
  console.log("user pattern: "+userClickPattern);

  implementChosenSound(userChosenColour);
  //this will go above sound but stays here for now
  animatePress(userChosenColour);
})


//Main for now.
$(document).keydown(function(){
  if(!first){
      nextSequence();
      first = true;

    }
  else
  {
    console.log("stop PRESSING!");
  }

});

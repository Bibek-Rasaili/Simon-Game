var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];


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

}



// Click Event Listeners
$('div[type="button"]').click(function(){
  var userChosenColour = this.id; //stores the id (color) of the user input
  console.log(this.id);

  userClickPattern.push(userChosenColour);
  console.log("user pattern: "+userClickPattern);

  implementChosenSound(userChosenColour);
})


//Main for now.
$(document).keydown(function(){
  nextSequence();
});

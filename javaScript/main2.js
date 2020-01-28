var redirect1 = document.querySelector(".begin-the-game1");
var redirect2 = document.querySelector(".begin-the-game2");

//event listner to redirect to the game page
redirect1.addEventListener("click", startTheGame);
redirect2.addEventListener("click", startTheGame);
function startTheGame(){
    location.replace("../html/index.html");
}

var howToPlay = document.querySelector(".how-to-play");
var playingNotes = document.querySelector(".playing-notes");

//event listner to show "how to play" notes
howToPlay.addEventListener("click", function(){
    console.log("1");
    playingNotes.style.visibility = "visible";
});

const inst=document.querySelector(".instructions-btn");
var check=0;
inst.addEventListener("click",()=>{
        if(check%2==0){
        document.querySelector("#level-title").style.display = "none";
        document.querySelector(".container").style.display="none";
        document.querySelector("#instructions").style.display="flex";
        inst.innerHTML="Back";
    }
    else{
        document.querySelector("#level-title").style.display = "block";
        document.querySelector(".container").style.display = "flex";
        document.querySelector("#instructions").style.display = "none";
        inst.innerHTML="Instructions";
    }
    check++;
});

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
document.addEventListener('keydown', (event)=>{
    if(!started){
        if(event.key=='A' || event.key=='a'){
            started = true;
            nextSequence();
        }
    }
});
var hashMap={
    'Player1':0,
    'Player2':0
};

$(".btn").click(function () {
    if(started){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress2(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    }
});

function checkAnswer(currentLevel) {
    if(started){

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }
    }
}


function nextSequence() {
    if(started){
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        animatePress1(randomChosenColour);
        playSound(randomChosenColour);
    }
}

function animatePress1(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 200);
}
function animatePress2(currentColor){
    $("#" + currentColor).removeClass(currentColor);
    setTimeout(function () {
        $("#" + currentColor).addClass(currentColor);
    }, 250);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
var flag=0;
function startOver() {
    if(flag==0){
        flag=1;
        hashMap['Player1']=level;
        $("#level-title").text("Player 2's turn, press A key to continue.");
    }
    else{
        flag=0;
        hashMap['Player2']=level;
        if(hashMap['Player2']>hashMap['Player1']){
            $("#level-title").text("Player 2 won, press A key to continue.");
        }
        else if(hashMap['Player1']>hashMap['Player2']){
            $("#level-title").text("Player 1 won, press A key to continue.");
        }
        else $("#level-title").text("Draw, press A key to continue.");
        
        hashMap['Player1']=0;
        hashMap['Player2']=0;
    }
    level = 0;
    gamePattern = [];
    started = false;
}


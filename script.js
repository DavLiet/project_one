var x;
var y;
var gameBoard = document.getElementById("board");
var hits = 0;
var highScore = 0;
var person;



/**
 * Prompts user for username and loads their previous scores from firebase
 */
function init(){
    person = prompt("Enter a name to save your game", "");

    if (person == null || person == "") { //nothing entered in prompt
        person = null;
        alert("You can still play, but your high score won't be saved.")
    } else {
    //grab user's high score
    firebase.database().ref(person).once('value').then(function(snapshot) {
      var scoreFromDatabase = (snapshot.val());
        //set highscore in the div
        if (scoreFromDatabase == null) { //nothing in DB for this player
             document.getElementById("hScore").innerHTML = 0;
        } else {
            document.getElementById("hScore").innerHTML = scoreFromDatabase.score;
        }
        
    });
}
//get the game goin'
randomRectangle();
}

/**
 * Calculates random x-coordinate
 */
 function randomX(){
    let x = Math.floor((Math.random()*450));    
    return x;
}

/**
 * Calculates random y-coordinate
 */
 function randomY(){
    let y = Math.floor((Math.random()*450));
    return y;
}

/**
 * Draws random rectangle
 */
 function randomRectangle(){
    let rectangle = gameBoard.getContext("2d");
    rectangle.clearRect(0,0,500,500);
    rectangle.beginPath();
    x = randomX();
    y = randomY();
    rectangle.rect(x,y,50,50);
    rectangle.fillStyle="#000000";
    rectangle.fill();
    rectangle.closePath();
}

gameBoard.addEventListener('click',(event)=>{
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    if((mouseX > x && mouseX < x + 50) && (mouseY > y && mouseY < y + 50)){
        hits++;
        document.getElementById("score").innerHTML = hits;
        randomRectangle();
    }
    else{
        alert("You missed! Score: " + hits);
        if (person != null) { //if logged in
            if (hits > highScore) { //if new highscore
                highScore = hits;
                console.log("saving new score");
                //set new highscore in database
                firebase.database().ref(person).set({
                    score: hits,
                });
                document.getElementById("hScore").innerHTML = hits;
            }
        }
        hits = 0; //reset hits
        document.getElementById("score").innerHTML = 0;
    }
});
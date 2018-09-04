
var gameBoard = document.getElementById("board");
var hits = 0;

class Rectangle {

    constructor() {
        this.x = this.genRandomCoord();
        this.y = this.genRandomCoord();
        let board = gameBoard.getContext("2d");
        board.clearRect(0,0,500,500);
        board.beginPath();
        board.rect(this.x,this.y,50,50);
        board.fillStyle="#000000";
        board.fill();
        board.closePath();
    }

    genRandomCoord() {
        return Math.floor((Math.random()*450));
    }

};
var highScore = 0;

class User {

    constructor() {
        this.name = prompt("Enter a name to save your game", "");
        if (this.name == null || this.name == "") { //nothing entered in prompt
            this.name = null;
            alert("You can still play, but your high score won't be saved.")
        } else {
            this.setHighScore();
            
        }
    }
    setHighScore() {
        firebase.database().ref(this.name).once('value').then(function(snapshot) {
            if (snapshot.val() != null) {
                console.log(snapshot.val().score);
                highScore = snapshot.val().score;
            }
            console.log(snapshot.val());
            console.log(highScore);
            document.getElementById("hScore").innerHTML = highScore;
        });
    }
};

var rect;
var player;

/**
 * Prompts user for username and loads their previous scores from firebase
 */
 function init(){
    rect = new Rectangle();
    player = new User();
rect = new Rectangle();
}


gameBoard.addEventListener('click',(event)=>{
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    if((mouseX > rect.x && mouseX < rect.x + 50) && (mouseY > rect.y && mouseY < rect.y + 50)){
        hits++;
        document.getElementById("score").innerHTML = hits;
        //rect.randomRectangle();
        rect = new Rectangle();
    }
    else{
        alert("You missed! Score: " + hits);
        if (player.name != null) { //if logged in
            if (hits > highScore) { //if new highscore
                highScore = hits;
                console.log("saving new score");
                //set new highscore in database
                firebase.database().ref(player.name).set({
                    score: hits,
                });
                document.getElementById("hScore").innerHTML = hits;
            }
        }
        hits = 0; //reset hits
        document.getElementById("score").innerHTML = 0;
    }
});
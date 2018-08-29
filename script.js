var x;
var y;
var gameBoard = document.getElementById("board");


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
        alert("YES!");
        randomRectangle();
    }
    else{
        alert("NOOOOO");
    }
});


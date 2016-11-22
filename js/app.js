/*
 * Javascript for Tic Tac Toe Game
 * Author: Umair Ahmed Khan
 */

/* Initilizatiion of properties */
var thisTile, tileCanvas, context;
var filled = [];
var turn = 0;
var tilesFilled = 0;
var board = 3*3;
var tileSize = 70;
var offset = 15;

/* Draws the tic tac toe board. */
function drawCanvas(){
  container = document.getElementById("container");

    /* Function reference for tile onclick event */
   	var tileClickEvent = function(index){
      return function(){
        tileClicked(index);
      };
    };

     /* Creates empty tiles */
  	for (var i = 0; i < board; i ++){
  		filled[i] = false;
	    var tile = document.createElement("canvas");
	    tile.height = tile.width = tileSize;
	    tile.id = "tile_" + i;
	    tile.onclick = tileClickEvent(i);

	    container.appendChild(tile);
	    if (i == 2 || i == 5){
	      	var br = document.createElement("br");
	      	container.appendChild(br);
	    }
  	}
}

/**
 * Called when a tile is clicked on the board.
 * @param {number} tileNumber - ID of the tile selected.
 */
function tileClicked(tileNumber){
    thisTile = "tile_"+tileNumber;
    tileCanvas = document.getElementById(thisTile);
    context = tileCanvas.getContext("2d");
    context.lineWidth = 5;
    context.beginPath();
    context.fillStyle = "#fff";

    /* Draws a shape if the tile if empty */
    if(filled[tileNumber] == false){
        if(turn%2==0){  /* Draws X */
        	context.strokeStyle = "#f1be32";
            context.moveTo(offset,offset);
            context.lineTo(tileSize-offset, tileSize-offset);
            context.moveTo(tileSize-offset, offset);
            context.lineTo(offset, tileSize-offset);
        }
        else{ /* Draws O */
        	context.strokeStyle = "#01bBC2";
          	context.arc(tileSize/2, tileSize/2, (tileSize/2) - offset,0,Math.PI*2,true);
        }
        context.stroke();
        context.closePath();

        turn++;
        filled[tileNumber] = true;

        tilesFilled++;

        /* Finishes the game if the board is full */
        if(tilesFilled == 9){
            setTimeout(gameOver, 250);
        }
    }
    else{  /* Alerts the user if the tile is not empty */
        alert("This spot's taken!");
    }
}

/* Represents games over event */
function gameOver(){
    if(confirm("Game Over! Play again?")){
        clearTiles();
    }
}

/* Clears the borad for a new game */
function clearTiles(){
	for (var i = 0; i < board; i++) {
		thisTile = "tile_"+i;
    	tileCanvas = document.getElementById(thisTile);
    	context = tileCanvas.getContext("2d");
		context.clearRect(0, 0, tileCanvas.width, tileCanvas.height);
		filled[i] =  false; 
		tilesFilled = 0;
        turn = 0;
	}
}

/* Displays the game screen */
function startGame(){
	document.getElementById("start").className = 'hide';
	document.getElementById("game").className = "animated fadeInRight";
    drawCanvas();
	myShakeEvent.start();
}

/* Triggered on the shake event */
function shakeEventDidOccur () {
    clearTiles();
}

/* Initilization of shake event */
var myShakeEvent = new Shake({
	threshold: 5
});

/* Shake event listener */
window.addEventListener('shake', shakeEventDidOccur, false);

/* Logs the device orientation angle on orientation change */
document.addEventListener('orientationchange', function() {
    console.log('New orientation: ' + window.orientation + ' degrees');
});
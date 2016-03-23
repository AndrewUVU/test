var hextiles = [];
var locations = [];

var hexXPosition = 200;
var hexYPosition = 400;
var hexXOrigionPosition = hexXPosition;
var hexYOrigionPosition = hexYPosition;

var amountOfHex = 3;
var resetHex = true;

var hexTileX = 0;
var hexTileXReset = 0;
var hexTileY = 0;
var hexTileZ = 0;


var GameMap = function() {
	for (var i = 0; i < amountOfHex; i++) {
		hextiles[i] = [];
		for (var j = 0; j < amountOfHex; j++) {

			var hextile = game.add.sprite(0, 0, 'hextile');
			hextiles[i][j] = hextile;
			hextiles[i][j].anchor.setTo(0.5, 0.5);
			hextiles[i][j].inputEnabled = true;

			//enable click input
			hextiles[i][j].events.onInputDown.add(hexClicked, this);
			
			hextiles[i][j].reset(hexXPosition, hexYPosition);

			hextiles[i][j].hexTileX = hexTileX;
			hextiles[i][j].hexTileY = hexTileY;
			hextiles[i][j].hexTileZ = hexTileZ;
			socket.emit('map setup', {hexTileX,hexTileY,hexTileZ});
			hextiles[i][j].name = hexTileX.toString()+hexTileY.toString()+hexTileZ.toString();

			var style = { font: "32px Arial", fill: "#ffffff", align: "center", id: 'hexTileX, + hexTileY, +hexTileZ' };
			text = game.add.text(0, 0, hexTileX+", "+hexTileY+", "+ hexTileZ, style);
			text.anchor.set(0.5, 0.5);
			
			hextiles[i][j].addChild(text);

			hexXPosition = hexXPosition + hextiles[i][j].width*(3/4);
			hexYPosition = hexYPosition - hextiles[i][j].width*(1/2);

			hexTileX = hexTileX + 1;
			hexTileZ = hexTileZ - 1;
		};
		hexTileXReset = hexTileXReset + 1;
		hexTileX = hexTileXReset;
		hexTileY = hexTileY - 1;
		hexTileZ = 0;
		hexXPosition = hexXOrigionPosition + hextile.width*(3/4);
		hexYPosition = hexYOrigionPosition + hextile.width*(1/2);
		hexXOrigionPosition = hexXPosition;
		hexYOrigionPosition = hexYPosition;
	};
	//console.log(hextiles);
	//var rowIndex = Math.floor(Math.random()*hextiles.length);
	//var colIndex = Math.floor(Math.random()*hextiles.length);
	//var sendX = hextiles[rowIndex][colIndex].hexTileX;
	//var sendY = hextiles[rowIndex][colIndex].hexTileY;
	//var sendZ = hextiles[rowIndex][colIndex].hexTileZ;

	//socket.emit('map setup', {x:sendX,y:sendY,z:sendZ});
}

var getHexArray = function() {
	return hextiles;
}


//exports.hextiles = hextiles;
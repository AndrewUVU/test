var game = new Phaser.Game(1100, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var hextiles = [];
var redShip;
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

var socket = io.connect();

function preload() {
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.refresh();
	game.load.image('hextile', 'assets/hexagon-blue.png');
	game.load.image('RedShip', 'assets/RedShip.png')
}

function create() {
	
	for (var i = 0; i < amountOfHex; i++) {
		hextiles[i] = [];
		for (var j = 0; j < amountOfHex; j++) {

			var hextile = game.add.sprite(0, 0, 'hextile');
			hextiles[i][j] = hextile;
			hextiles[i][j].anchor.setTo(0.5, 0.5);
			hextiles[i][j].inputEnabled = true;
			hextiles[i][j].events.onInputDown.add(clickTest, this);
			
			hextiles[i][j].reset(hexXPosition, hexYPosition);

			hextiles[i][j].hexTileX = hexTileX;
			hextiles[i][j].hexTileY = hexTileY;
			hextiles[i][j].hexTileZ = hexTileZ;
			hextiles[i][j].name = hexTileX+", "+hexTileY+", "+hexTileZ;

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
	var rowIndex = Math.floor(Math.random()*hextiles.length);
	var colIndex = Math.floor(Math.random()*hextiles.length);
	
	redShip = game.add.sprite(-1000, -1000, 'RedShip');
	setShipLocation(redShip, hextiles[rowIndex][colIndex].x, hextiles[rowIndex][colIndex].y, hextiles[rowIndex][colIndex].hexTileX, hextiles[rowIndex][colIndex].hexTileY, hextiles[rowIndex][colIndex].hexTileZ);

	
	
}

function update() {
}

function clickTest(sprite, pointer) {
	if (checkDistance(sprite) == 1) {
		setShipLocation(redShip, sprite.x, sprite.y, sprite.hexTileX, sprite.hexTileY, sprite.hexTileZ);
	};
	socket.emit('client_data', {'Hex Tile': sprite.name});
}

function checkDistance(clickedHexTile) {
	var val = (Math.abs(clickedHexTile.hexTileX - redShip.XLocation) + Math.abs(clickedHexTile.hexTileY - redShip.YLocation) + Math.abs(clickedHexTile.hexTileZ - redShip.ZLocation)) / 2;
	return val;
}

function setShipLocation(shipSprite, xLocationOnHex, yLocationOnHex, hexTileX, hexTileY, hexTileZ) {
	shipSprite.reset(xLocationOnHex, yLocationOnHex);
	shipSprite.XLocation = hexTileX;
	shipSprite.YLocation = hexTileY;
	shipSprite.ZLocation = hexTileZ;
	socket.emit('ship_location', {
		'shipsXLocation': hexTileX,
		'shipsYLocation': hexTileY,
		'shipsZLocation': hexTileZ
	});
}
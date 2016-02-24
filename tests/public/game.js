var game = new Phaser.Game(1100, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var redShip, blueShip;
var socket = io.connect();

function preload() {
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.refresh();
	game.load.image('hextile', 'assets/hexagon-blue.png');
	game.load.image('RedShip', 'assets/RedShip.png')
	game.load.image('BlueShip', 'assets/BlueShip.png')
}

function create() {
	
	GameMap();
	
	redShip = game.add.sprite(-10000, -10000, 'RedShip');
	blueShip = game.add.sprite(-10000, -10000, 'RedShip');
	//setShipLocation(redShip, hextiles[rowIndex][colIndex].x, hextiles[rowIndex][colIndex].y, hextiles[rowIndex][colIndex].hexTileX, hextiles[rowIndex][colIndex].hexTileY, hextiles[rowIndex][colIndex].hexTileZ);
}

function update() {
}
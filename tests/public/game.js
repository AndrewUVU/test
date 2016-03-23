var game = new Phaser.Game(1100, 900, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });
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
	
	//redShip = game.add.sprite(-10000, -10000, 'RedShip');
	//blueShip = game.add.sprite(-10000, -10000, 'RedShip');
	//setShipLocation(redShip, hextiles[rowIndex][colIndex].x, hextiles[rowIndex][colIndex].y, hextiles[rowIndex][colIndex].hexTileX, hextiles[rowIndex][colIndex].hexTileY, hextiles[rowIndex][colIndex].hexTileZ);
}

function update() {
	
}

function setStartStationLocation() {

}

function lightUpCurrentLocations() {
	console.log("location");
}

socket.on('update what player can see', function(data) {
	for (var k = 0; k < data.locations.length; k++) {
		addShip(data.locations[k]);
	};
});

function addShip(data) {
	var tempShip = game.add.sprite(-10000, -10000, 'RedShip');
	for (var i = 0; i < hextiles.length; i++) {
		for (var j = 0; j < hextiles.length; j++) {
			currentHexTile = hextiles[i][j];
			if (currentHexTile.name === data) {
				tempShip.reset(currentHexTile.x, currentHexTile.y);
			};
		};
	};
};
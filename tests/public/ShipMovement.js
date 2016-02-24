function clickTest(sprite, pointer) {
	if (checkDistance(sprite) == 1) {
		setShipLocation(redShip, sprite.x, sprite.y, sprite.hexTileX, sprite.hexTileY, sprite.hexTileZ);
	};
	socket.emit('client_data', {'Hex Tile': sprite.name});
}

function checkDistance(clickedHexTile) {
	console.log('...');
	//var val = (Math.abs(clickedHexTile.hexTileX - redShip.XLocation) + Math.abs(clickedHexTile.hexTileY - redShip.YLocation) + Math.abs(clickedHexTile.hexTileZ - redShip.ZLocation)) / 2;
	//return val;
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
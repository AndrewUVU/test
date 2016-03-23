function hexClicked(sprite, pointer) {
	//if (checkDistance(sprite) == 1) {
		//setShipLocation(redShip, sprite.x, sprite.y, sprite.hexTileX, sprite.hexTileY, sprite.hexTileZ);
	//};
	socket.emit('hex tile clicked', {'Hex Tile': sprite.name});
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
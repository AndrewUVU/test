//var socket = io.connect();

//socket.emit('send init for player on server');

var Player = function() {
	var id;
	var stationLocationX;
	var stationLocationY;
	var stationLocationZ;

	var setStationLocation = function(x, y, z) {
		this.stationLocationX = x;
		this.stationLocationY = y;
		this.stationLocationZ = z;
	};

	var setPlayerId = function(playerId) {
		this.id = playerId;
	};

	return {
		setStationLocation: setStationLocation,
		stationLocationX: stationLocationX,
		stationLocationY: stationLocationY,
		stationLocationZ: stationLocationZ,
		setPlayerId: setPlayerId
	}
}

socket.on('init players on client', function(data) {
	var newPlayer = new Player();
	playerInfo = Object.keys(data).map(function(k) { return data[k] });
	newPlayer.setPlayerId(playerInfo[0]);
	newPlayer.setStationLocation(playerInfo[1], playerInfo[2], playerInfo[3]);
	console.log(newPlayer);
});


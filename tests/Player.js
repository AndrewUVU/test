var Player = function() {
	var id;
	var stationLocationX = 0;
	var stationLocationY = 0;
	var stationLocationZ = 0;

	var setStationLocation = function(x, y, z) {
		this.stationLocationX = x;
		this.stationLocationY = y;
		this.stationLocationZ = z;
	};

	return {
		setStationLocation: setStationLocation,
		stationLocationX: stationLocationX,
		stationLocationY: stationLocationY,
		stationLocationZ: stationLocationZ,
		id: id
	}
}

exports.Player = Player;
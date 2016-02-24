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

	var getPlayerId = function() {
		return this.id;
	};

	var getStationLocationX = function() {
		return this.stationLocationX;
	};

	var getStationLocationY = function() {
		return this.stationLocationY;
	};

	var getStationLocationZ = function() {
		return this.stationLocationZ;
	};

	return {
		setStationLocation: setStationLocation,
		getStationLocationX: getStationLocationX,
		getStationLocationY: getStationLocationY,
		getStationLocationZ: getStationLocationZ,
		getPlayerId: getPlayerId
	}
}

exports.Player = Player;
var Player = function() {
	var id;
	var stationLocationX;
	var stationLocationY;
	var stationLocationZ;
	var currentPlayer = false;

	var setStationLocation = function(x, y, z) {
		this.stationLocationX = x;
		this.stationLocationY = y;
		this.stationLocationZ = z;
	};

	var setCurrentPlayer = function() {
		if (currentPlayer) {
			currentPlayer = false;
		} else {
			currentPlayer = true;
		};
	}

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
		setCurrentPlayer: setCurrentPlayer,
		getStationLocationX: getStationLocationX,
		getStationLocationY: getStationLocationY,
		getStationLocationZ: getStationLocationZ,
		getPlayerId: getPlayerId
	}
}

exports.Player = Player;
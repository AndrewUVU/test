var Player = function() {
	var id;
	var locationsPlayerControls = [];
	var stationLocationX;
	var stationLocationY;
	var stationLocationZ;
	var currentPlayer = false;
	var playerFormation = "A";

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
	};
	var getCurrentPlayer = function() {
		return currentPlayer;
	};

	var getPlayerId = function() {
		return this.id;
	};

	var setPlayerFormation = function(newFormation) {
		playerFormation = newFormation;
	};

	var getPlayerFormation = function() {
		return playerFormation;
	};

	var addLocationToPlayerControl = function(location) {
		locationsPlayerControls.push(location);
	};

	var getLocationsOfPlayerControl = function() {
		return locationsPlayerControls;
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
		getCurrentPlayer: getCurrentPlayer,
		setPlayerFormation: setPlayerFormation,
		getPlayerFormation: getPlayerFormation,
		getStationLocationX: getStationLocationX,
		getStationLocationY: getStationLocationY,
		getStationLocationZ: getStationLocationZ,
		getPlayerId: getPlayerId,
		addLocationToPlayerControl: addLocationToPlayerControl,
		getLocationsOfPlayerControl: getLocationsOfPlayerControl
	}
}

exports.Player = Player;
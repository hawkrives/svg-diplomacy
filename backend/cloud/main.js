var _ = require('underscore');

Parse.Cloud.beforeSave('Game', function(request, response) {
	if (request.object.get('status') === undefined) {
		// The game was just created
		request.object.set('status', 'preGame');

		response.success();
		return;
	}
	else if (request.object.get('status') === 'preGame') {
		// Users are joining the Game
		var Map = Parse.Object.extend('Map');
		var query = new Parse.Query(Map);

		query.get(request.object.get('mapId').id, {
			success: function(map) {
				if (request.object.get('players').length == map.get('players')) {
					request.object.set('status', 'active');

					buildGame(request, map);
				}

				response.success();
				return;
			},
			error: function(error) {
				response.error('Query failed. Error: ' + error.message);
				return;
			}
		})
	}
	else if (request.object.get('status') === 'active') {
		response.success();
	}
	else if (request.object.get('status') === 'completed') {
		response.success();
	}
});

function buildGame(request, map) {
	// First assign each player a country
	var settings = request.object.get('settings');

	var countriesToPlayers = [];

	if (settings.countries === 'random') {
		// Randomly assign countries to players

		var countries = map.get('countries').map(function (country) {
			return country.name;
		});

		var players = request.object.get('players');

		if (players.length != countries.length) {
			console.log('Error: Number of players (' + players.length + ') does not match number of countries (' + countries.length + ')');
			return;
		}

		for (var i = 0; i < players.length; i++) {
			var player = players.splice(Math.floor(Math.random() * players.length), 1);
			var country = countries.splice(Math.floor(Math.random() * countries.length), 1);

			countriesToPlayers.push({country: country, player: player});
		}

		request.object.set('countriesToPlayers', countriesToPlayers);
	}
	else {
		// Players get to choose their countries
	}

	if (settings.preGameBuild) {
		request.object.set('armies', []);
		request.object.set('currentMovePhase', {year: null, season: null, phase: 'build'});
		request.object.set('turnPhases', []);
	}
	else {
		// Construct the armies array for the game from the map's defaultUnits
		var armies = [];
		var defaultUnits = map.get('defaultUnits');

		defaultUnits.forEach(function(unit, index) {
			var army = {
				armyId: unit.armyId,
				player: _.find(countriesToPlayers, function(assignment) {return assignment.country == unit.country;}).player,
				location: unit.location,
				type: unit.type,
				created: 'pregame-build',
				destroyed: null
			};
			armies.push(army);
		});

		request.object.set('armies', armies);
		request.object.set('currentMovePhase', {year: 1901, season: 'spring', phase: 'order'});

		// Also set the turnPhases pregame-build phase
		var turnPhases = [];



		request.object.set('turnPhases', turnPhases);
	}
}

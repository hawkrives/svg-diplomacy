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
		// Users are submitting orders

		var turnPhases = request.object.get('turnPhases');
		var newPhase = turnPhases.pop();
		var curPhase = request.object.get('currentMovePhase');

		newPhase.phase = curPhase.season + ' ' + curPhase.year + '-' + curPhase.phase;

		var mergePhase = _.find(turnPhases, {phase: newPhase.phase, player: newPhase.player});
		_.keys(mergePhase).forEach(function(key) {
			newPhase[key] = mergePhase.key;
		})

		// replace mergePhase with newPhase
		turnPhases.splice(_.indexOf(turnPhases, mergePhase), 1, newPhase);

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

		var players = request.object.get('players').map(function (player) {
			return player;
		});

		if (players.length != countries.length) {
			console.log('Error: Number of players (' + players.length + ') does not match number of countries (' + countries.length + ')');
			return;
		}

		var numMatches = players.length;
		for (var i = 0; i < numMatches; i++) {
			var player = players.splice(Math.floor(Math.random() * players.length), 1);
			var country = countries.splice(Math.floor(Math.random() * countries.length), 1);

			countriesToPlayers.push({country: country[0], player: player[0]});
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
		// Also set the turnPhases pregame-build phase
		var turnOrders = {};
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
			var order = {
				armyId: unit.armyId,
				type: 'build',
				at: unit.location
			};
			turnOrders[army.player] = turnOrders[army.player] || [];
			turnOrders[army.player].push(order);
		});

		console.log('turnOrders');
		console.log(turnOrders);

		var turnPhases = [];

		request.object.set('armies', armies);
		request.object.set('currentMovePhase', {year: 1901, season: 'spring', phase: 'order'});


		request.object.set('turnPhases', turnPhases);
	}
	return
}

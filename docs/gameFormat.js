// Game Format Style
{
	"id": Parse.Object.Game.id
	"title": String,
	"owner": Parse.User.id,
	"status": String,		// "preGame", "active", "completed"
	"players": [
		Parse.User.id
	],
	"mapId": Parse.Object.Map.id,
	"settings": Object({
		turnLength: Number,		// time for each player to submit orders
		supplyToWin: Number,		// ranges from 50% to 100% of map's supply centers
		countries: String,		// "random", "choose"
		preGameBuild: Boolean,		// true means players choose which units to build, false means use map DefaultUnits
		fogOfWar: Boolean,
	})
	"countriesToPlayers": [
		Object({
			country: String,		// Matches country.name in the map
			player: Parse.User.id
		})
	],
	"currentMovePhase": Object({		// This object can be used to auto-generate the key for the turnPhases object
		year: Number,
		season: String,		// "spring", "fall"
		phase: String,		// "order", "retreat", "build"
	}),
	"armies": [
		Object({
			armyId: Number,
			player: Parse.User.id,
			location: Number,
			type: String,		// "army", "navy"
			created: String, 		// Representation of turn phase
			destroyed: String || null,		// Representation of turn phase
		})
	]
	"turnPhases": [
		{
			player: Parse.User.id,
			phase: String,		// Representation of turn phase
			spaces: [Number],
			orders: [Object({
				orderId: Number,		// Used to reference orders to provide more detailed feedback
				armyId: Number,
				type: String,		// "move", "supportMove", "hold", "supportHold", "convoy", "retreat", "build", "destroy"
				at: Number,
				from: Number,
				to: Number,
				result: Object({
					code: String,		// "success", "blocked", with room for more codes in the future
					blockedBy: [Number]		// Array of other orderIds that caused this order to fail
				})
			})],
		},
		"..."
	]
}

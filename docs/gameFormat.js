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
			type: String
		})
	]
	"turnPhases": {
		"Spring 1901-Order": [
			{
				player: Parse.User.id,
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
			{ player: Parse.User.id, spaces: [Number], orders: [...] },
			"..."
		],
		"Spring 1901-Retreat": ["..."],
		"Fall 1901-Order": ["..."],
		"Fall 1901-Retreat": ["..."],
		"Fall 1901-Build": ["..."],
		"..."
	}
}

// Game Format Style
{
	"id": Parse.Object.Game.id
	"title": String,
	"owner": Parse.User.id,
	"players": [
		Parse.User.id
	],
	"mapId": Parse.Object.Map.id,
	"countriesToPlayers": [
		Object({
			country: String,
			player: Parse.User.id
		})
	],
	"currentMovePhase": Object({
		year: Number,
		season: Number
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
		"Spring 1901": [
			{
				player: Parse.User.id, 
				orders: [
					armyId: Number,
					type: String,
					at: Number,
					from: Number,
					to: Number
				],
			},
			{ player: Parse.User.id, orders: [...] },
			"..."
		],
		"Fall 1901": ["..."],
	}
}

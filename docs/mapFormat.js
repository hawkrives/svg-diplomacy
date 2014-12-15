// Specification of a Map Format, version 1.
{
	"name": "Classic",		// Title of the map
	"width": 0,				// Width in pixels
	"height": 0,			// Height in pixels
	"players": 7,			// Number of Players
	"countries": [],		// Array of Country data. See Country Format below
	"spaces": [],			// Array of Space data. See Space Format below
	"defaultUnits": [		// Array of army objects that mirrors the armies in the game format
		Object({
			"armyId": Number,
			"country": String,
			"location": Number,
			"type": String
		})
	],
}

// Specification of a Country Format, version 1.
{
	"name": "Germany",
	"vacantColor": "#123456",
	"occupiedColor": "#987654",
	"startSpaces": [],
}

// Specification of a Space Format, version 1.
{
	"id": Number,
	"name": String,
	"abbrev": String,
	"type": String,
	"naval": Boolean,
	"moveTo": [Object{"land": [Number], "sea": [Number]},
	"territory": [Number] || null,
	"path": String || Number(/*id of territory's path to render*/),
	"supply": Object{x,y} || null,
	"drawUnit": Object{x,y} || null,
	"label": String || Number(/*id of territory's label to render*/),
}

let obj = Parse.Object

class Map extends obj {
	constructor() {
		this.name = ''
		this.width = 0
		this.height = 0
		this.players = 0
		this.countries = []
		this.spaces = []
	}
}

class Country {
	constructor() {
		this.name = ''
		this.vacantColor = ''
		this.occupiedColor = ''
		this.startingSpaces = []
	}
}

class Space {
	constructor() {
		this.id = 0
		this.name = 0
		this.abbrev = ''
		this.type = ''
		this.naval = false
		this.moveTo = []
		this.territory = [] || null
		this.path = ''
		this.supply = {x:0, y:0}
		this.drawUnit = {x:0, y:0}
	}
}

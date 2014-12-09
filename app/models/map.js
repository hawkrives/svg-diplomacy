let PlayableMap = Parse.Object.extend('Map')
let LocalMap = (map) => {
	map.get = (key) => map[key];
	return map;
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

export {PlayableMap, LocalMap}

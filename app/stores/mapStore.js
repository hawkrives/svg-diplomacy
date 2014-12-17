import * as Reflux from 'reflux'
import * as _ from 'lodash'
import mapActions from '../actions/mapActions'
import userStore from './userStore'
import {PlayableMap, LocalMap} from '../models/map'

import * as classicMap from '../data/maps/classic.json'
import * as northfieldMap from '../data/maps/northfield.json'

let mapStore = Reflux.createStore({
	listenables: mapActions,

	init() {
		this.maps = [];

		this.parseMaps = [];
		this.localMaps = [
			new LocalMap(classicMap),
			new LocalMap(northfieldMap),
		];

		this.listenTo(userStore, this._updateDataFromParse, this._updateDataFromParse);
	},

	_updateDataFromParse() {
		let allMaps = new Parse.Query(PlayableMap)
		allMaps.find()
			.then(results => {
				this.parseMaps = results;
				this.maps = _.uniq(this.localMaps.concat(this.parseMaps), (map) => map.id)
				console.log('maps', this.maps, this.parseMaps)
				this.trigger(this.maps)
			})
	},

	getInitialState() {
		return this.maps;
	},

	updateMapList() {
		console.log('updateMapList')
		this._updateDataFromParse()
	},

	createMap(options) {
		let map = new PlayableMap()
		map.set('name', options.name || 'Untitled Map')
		map.set('players', options.players || 2)
		map.set('width', options.width || 'auto')
		map.set('height', options.height || 'auto')
		map.set('countries', options.countries || [])
		map.set('spaces', options.spaces || [])

		map.save()
			.then(this._updateDataFromParse)
	},

	updateMap(options) {
		let map = _.find(this.parseMaps, {id: options.mapId})
		console.log(map, options.mapId)

		map.set('name', options.name || map.get('name'))
		map.set('players', options.players || map.get('players'))
		map.set('width', options.width || map.get('width'))
		map.set('height', options.height || map.get('height'))
		map.set('countries', options.countries || map.get('countries'))
		map.set('spaces', options.spaces || map.get('spaces'))
		console.log(options, map)

		map.save()
			.then(this._updateDataFromParse)
	},

	destroyMap(mapId) {
		let mapToDestroy = _.find(this.maps, {id: mapId})
		mapToDestroy.destroy()
			.then(this._updateDataFromParse)
	},
})

export default mapStore

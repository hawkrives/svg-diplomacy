import * as Reflux from 'reflux'
import * as _ from 'lodash'
import mapActions from '../actions/mapActions'
import userStore from './userStore'
import {PlayableMap, LocalMap} from '../models/map'

import * as classicMap from '../data/maps/classic.json'

let mapStore = Reflux.createStore({
	listenables: mapActions,

	init() {
		this.maps = [];

		let classic = new LocalMap(classicMap);
		this.localMaps = [classic];
		console.log(this.localMaps)

		this.listenTo(userStore, this._updateDataFromParse, this._updateDataFromParse);
	},

	_updateDataFromParse() {
		let allMaps = new Parse.Query(PlayableMap)
		allMaps.find()
			.then(results => {
				this.maps = _.uniq(this.localMaps.concat(results), (map) => map.id)
				console.log('maps', this.maps)
				this.trigger(this.maps)
			})
	},

	getInitialState() {
		return this.maps;
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

	destroyMap(mapId) {
		let mapToDestroy = _.find(this.maps, {id: mapId})
		mapToDestroy.destroy()
			.then(this._updateDataFromParse)
	},
})

export default mapStore

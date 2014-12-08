import * as Reflux from 'reflux'
import mapActions from '../actions/mapActions'
import userStore from './userStore'

let mapStore = Reflux.createStore({
	listenables: mapActions,

	init() {
		this.maps = [];
		this.listenTo(userStore, this._updateMapListFromParse, this._updateMapListFromParse);
	},

	_updateMapListFromParse(user) {
		let PlayableMap = Parse.Object.extend('Map')
		let allMaps = new Parse.Query(PlayableMap)
		allMaps.find()
			.then(results => {
				console.log(results)
				this.maps = results
				this.trigger(this.maps)
			})
	},

	getInitialState() {
		return this.maps;
	},

	createMap() {},
})

export default mapStore

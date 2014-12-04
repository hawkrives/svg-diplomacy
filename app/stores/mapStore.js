import * as Reflux from 'reflux'
import mapActions from '../actions/mapActions'

let mapStore = Reflux.createStore({
	listenables: mapActions,

	init() {
		this.maps = [];
	},

	getInitialState() {
		return this.maps;
	},
})

export default mapStore

import * as Reflux from 'reflux'

let mapActions = Reflux.createActions([
	'createMap',
	'destroyMap',
	'updateMapList',
])

window.actions = window.actions || {}
window.actions.mapActions = mapActions

export default mapActions

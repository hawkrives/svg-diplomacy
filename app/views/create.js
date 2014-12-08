import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import Toolbar from '../components/toolbar'
import mapStore from '../stores/mapStore'

let Create = React.createClass({
	mixins: [Reflux.listenTo(mapStore, 'onMapsChanged', 'onMapsChanged')],
	getInitialState() {
		return {
			maps: []
		}
	},
	onMapsChanged(newMaps) {
		this.setState({maps: newMaps})
	},
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create New ...')

		let listOfMaps = React.createElement('ul', null, _.map(this.state.maps, map =>
			React.createElement('li', null, JSON.stringify(map))))

		return React.createElement('div',
			{id: 'create'},
			title,
			listOfMaps,
			React.createElement(Toolbar, {tools: ['Create new Game', 'Create new Map']}))
	},
})

export default Create

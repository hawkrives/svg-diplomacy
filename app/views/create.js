import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import Toolbar from '../components/toolbar'
import mapStore from '../stores/mapStore'
import mapActions from '../actions/mapActions'

let MapListItem = React.createClass({
	destroyMap(ev) {
		ev.preventDefault()
		mapActions.destroyMap(this.props.map.id)
	},
	render() {
		let components = _.map(this.props.map.attributes, (value, key) => {
			return React.createElement('div', {className: `map-part-${key}`, key: key},
				React.createElement('span', {className: 'key'}, key, ': '), JSON.stringify(value, null, 2))
		})
		components.unshift(React.createElement('div', {className: 'map-part-id', key: 'id'},
			React.createElement('span', {className: 'key'}, 'id: '), this.props.map.id))
		components.push(React.createElement('button', {onClick: this.destroyMap, key: 'deleteButton'}, 'Delete Map'))
		return React.createElement('div', null,
			components)
	},
})

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
	createMap(ev) {
		ev.preventDefault()
		mapActions.createMap({
			name: this.refs.name.getDOMNode().value,
			players: parseInt(this.refs.players.getDOMNode().value, 10),
			width: parseInt(this.refs.width.getDOMNode().value, 10),
			height: parseInt(this.refs.height.getDOMNode().value, 10),
			countries: this.refs.countries.getDOMNode().value,
			spaces: this.refs.spaces.getDOMNode().value,
		})
	},
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create New ...')

		let listOfMaps = React.createElement('ul', {className: 'raw-map-list'}, _.map(this.state.maps, map =>
			React.createElement('li', {key: map.id}, React.createElement(MapListItem, {map: map}))))

		let mapCreationForm = React.createElement('form', {className: 'map-creation-form', onSubmit: this.createMap},
			React.createElement('label', null, 'Name ', React.createElement('input', {type: 'text', ref: 'name', placeholder: 'Map Name'})),
			React.createElement('label', null, 'Width ', React.createElement('input', {type: 'text', ref: 'width', placeholder: 'Map Width (in pixels)'})),
			React.createElement('label', null, 'Height ', React.createElement('input', {type: 'text', ref: 'height', placeholder: 'Map Height (in pixels)'})),
			React.createElement('label', null, 'Number of Players ', React.createElement('input', {type: 'number', ref: 'players', placeholder: '2'})),
			React.createElement('label', null, 'Countries ', React.createElement('input', {type: 'text', ref: 'countries', placeholder: '[{/*CountryObjects*/}]'})),
			React.createElement('label', null, 'Spaces ', React.createElement('input', {type: 'text', ref: 'spaces', placeholder: '[{/*SpaceObjects*/}]'})),
			React.createElement('input', {type: 'submit', value: 'Create new map'}))

		return React.createElement('div',
			{id: 'create'},
			title,
			listOfMaps,
			mapCreationForm,
			React.createElement(Toolbar, {tools: ['Create new Game', 'Create new Map']}))
	},
})

export default Create

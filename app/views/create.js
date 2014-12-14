import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import {Link} from 'react-router'
import Toolbar from '../components/toolbar'
import mapActions from '../actions/mapActions'

let Create = React.createClass({
	createMap(ev) {
		ev.preventDefault()

		let name = this.refs.name.getDOMNode().value
		let players = this.refs.players.getDOMNode().value
		let width = this.refs.width.getDOMNode().value
		let height = this.refs.height.getDOMNode().value
		let countries = this.refs.countries.getDOMNode().value
		let spaces = this.refs.spaces.getDOMNode().value

		let pixelReplace = /(\d*?) *px$/;
		width = width.replace(pixelReplace, '$1')
		height = height.replace(pixelReplace, '$1')

		width = parseInt(width, 10)
		height = parseInt(height, 10)
		players = parseInt(players, 10)

		mapActions.createMap({name, players, width, height, countries, spaces})
	},
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create New ...')

		let mapCreationForm = React.createElement('form', {className: 'map-creation-form', onSubmit: this.createMap},
			React.createElement('label', null, 'Name: ', React.createElement('input', {type: 'text', ref: 'name', placeholder: 'Map Name'})),
			React.createElement('label', null, 'Width: ', React.createElement('input', {type: 'text', ref: 'width', placeholder: 'Map Width (in pixels)'})),
			React.createElement('label', null, 'Height: ', React.createElement('input', {type: 'text', ref: 'height', placeholder: 'Map Height (in pixels)'})),
			React.createElement('label', null, 'Player Count: ', React.createElement('input', {type: 'number', ref: 'players', placeholder: '2'})),
			React.createElement('label', null, 'Countries: ', React.createElement('input', {type: 'text', ref: 'countries', placeholder: '[{/*CountryObjects*/}]'})),
			React.createElement('label', null, 'Spaces: ', React.createElement('input', {type: 'text', ref: 'spaces', placeholder: '[{/*SpaceObjects*/}]'})),
			React.createElement('input', {type: 'submit', value: 'Create new map'}))

		return React.createElement('div',
			{id: 'create'},
			title,
			React.createElement(Toolbar, {tools: ['create-game', 'create-map']}))
	},
})

export default Create

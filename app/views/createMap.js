import * as React from 'react'
import * as _ from 'lodash'
import mapActions from '../actions/mapActions'
import DetailedListItem from '../components/detailed-list-item'

let MapListItem = React.createClass({
	destroyMap(ev) {
		ev.preventDefault()
		mapActions.destroyMap(this.props.info.id)
	},
	render() {
		return React.createElement(DetailedListItem, {
			id: this.props.id,
			info: this.props.info,
			buttonClick: this.destroyMap,
			onClick: this.props.onClick,
		})
	},
})

let CreateMap = React.createClass({
	prepareMap() {
		let mapId = this.state.mapId
		let name = this.state.name
		let players = this.state.players
		let width = this.state.width
		let height = this.state.height
		let countries = this.state.countries
		let spaces = this.state.spaces

		let pixelReplace = /(\d*?) *px$/;
		width = width ? String(width).replace(pixelReplace, '$1') : width
		height = height ? String(height).replace(pixelReplace, '$1') : height

		width = parseInt(width, 10)
		height = parseInt(height, 10)
		players = parseInt(players, 10)

		countries = _.isString(countries) ? JSON.parse(countries) : countries
		spaces = _.isString(spaces) ? JSON.parse(spaces) : spaces

		return {mapId, name, players, width, height, countries, spaces}
	},
	createMap(ev) {
		ev.preventDefault()
		let map = this.prepareMap()
		mapActions.createMap(map)
	},
	updateMap(ev) {
		ev.preventDefault()
		let map = this.prepareMap()
		console.log(map)
		mapActions.updateMap(map)
	},
	populateForm(ev) {
		let mapId = ev.target.id || ev.target.parentNode.id || ev.target.parentNode.parentNode.id
		let map = _.find(this.props.maps, {id: mapId})
		// console.log(ev.target, mapId, map)
		this.setState({
			mapId: map.id,
			name: map.get('name'),
			width: map.get('width'),
			height: map.get('height'),
			players: map.get('players'),
			countries: JSON.stringify(map.get('countries')),
			spaces: JSON.stringify(map.get('spaces')),
			updating: true,
		})
	},

	onNameChange(ev)        {this.setState({name:      ev.target.value})},
	onWidthChange(ev)       {this.setState({width:     ev.target.value})},
	onHeightChange(ev)      {this.setState({height:    ev.target.value})},
	onPlayerCountChange(ev) {this.setState({players:   ev.target.value})},
	onCountryChange(ev)     {this.setState({countries: ev.target.value})},
	onSpaceChange(ev)       {this.setState({spaces:    ev.target.value})},

	getInitialState: function() {
		return {
			id: '',
			name: '',
			width: 0,
			height: 0,
			players: 0,
			countries: [],
			spaces: [],
			updating: false,
		};
	},

	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Create or Update a Map')

		let listOfMaps = React.createElement('ul',
			{className: 'raw-list'},
			_.map(this.props.maps, (map) => React.createElement(MapListItem, {key: map.id, id: map.id, info: map, onClick: this.populateForm})))

		let mapCreationForm = React.createElement('form', {className: 'map-creation-form', onSubmit: this.state.updating ? this.updateMap : this.createMap},
			React.createElement('label', null, 'Map ID: ', React.createElement('input', {type: 'text', readOnly: true, disabled: true, value: this.state.mapId})),

			React.createElement('label', null, 'Name: ',
				React.createElement('input',
					{type: 'text', placeholder: 'Map Name', value: this.state.name, onChange: this.onNameChange})),

			React.createElement('label', null, 'Width: ',
				React.createElement('input',
					{type: 'text', placeholder: 'Map Width (in pixels)', value: this.state.width, onChange: this.onWidthChange})),

			React.createElement('label', null, 'Height: ',
				React.createElement('input',
					{type: 'text', placeholder: 'Map Height (in pixels)', value: this.state.height, onChange: this.onHeightChange})),

			React.createElement('label', null, 'Player Count: ',
				React.createElement('input',
					{type: 'number', placeholder: '2', value: this.state.players, onChange: this.onPlayerCountChange})),

			React.createElement('label', null, 'Countries: ',
				React.createElement('input',
					{type: 'text', placeholder: '[{/*CountryObjects*/}]', value: this.state.countries, onChange: this.onCountryChange})),

			React.createElement('label', null, 'Spaces: ',
				React.createElement('input',
					{type: 'text', placeholder: '[{/*SpaceObjects*/}]', value: this.state.spaces, onChange: this.onSpaceChange})),

			React.createElement('input', {type: 'submit', value: `${this.state.updating ? 'Update' : 'Create new'} map`}))

		return React.createElement('div',
			{id: 'create-game'},
			title,
			listOfMaps,
			mapCreationForm)
	},
})

export default CreateMap

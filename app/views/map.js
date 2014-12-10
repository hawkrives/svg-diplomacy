import * as React from 'react/addons'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import mapStore from '../stores/mapStore'

let RenderedMap = React.createClass({
	mixins: [Reflux.listenTo(mapStore, 'onMapChanged', 'onMapChanged')],
	onMapChanged(maps) {
		this.setState({maps})
		this.findMap(this.props.mapId)
	},
	findMap(mapId) {
		if (mapId instanceof Parse.Object)
			mapId = mapId.id

		let map = _.find(this.state.maps, (map) => map.id === mapId)
		console.log(this.state.maps, mapId, map)
		if (map) {
			this.setState({
				map: {
					width: map.get('width'),
					height: map.get('height'),
					countries: map.get('countries'),
					spaces: map.get('spaces'),
				}
			})
		}
	},
	componentWillReceiveProps(nextProps) {
		this.findMap(nextProps.mapId)
	},
	componentWillMount() {
		this.componentWillReceiveProps(this.props)
	},
	getInitialState() {
		return {
			maps: [],
			map: {
				spaces: [],
				countries: [],
				width: 0,
				height: 0,
			},
		}
	},
	render() {
		let spaces = React.createElement('defs', null,
			_.map(this.state.map.spaces, (space) => {
				// todo: clean up this logic, if possible
				let vectorPath = space.path;

				let paths = [];
				let cantUsePath = false;
				let args = {
					className: React.addons.classSet({
						space: true,
						'supply-center': Boolean(space.supply),
					}) + ' space-type-' + space.type,
					id: 'space-' + space.id,
					space: space,
					key: space.id,
				}

				if ( typeof vectorPath === 'number') {
					// it's referencing another path, so we use a <use>.
					cantUsePath = true;
					args.dangerouslySetInnerHTML = {__html: `<use xlink:href="#space-${vectorPath}" />`}
				}
				else if (vectorPath instanceof Array) {
					// it has multiple paths; probably islands.
					paths = _.map(vectorPath, (path, index) => React.createElement('path', {d: path, key: index}))
				}
				else {
					// it has only a single path
					paths = [React.createElement('path', {d: vectorPath, key: 0})]
				}

				return React.createElement('g', args, cantUsePath ? null : paths)
			}))

		let countries = _.map(this.state.map.countries, (country) =>
			React.createElement('g',
				{
					className: 'country',
					id: country.name.toLowerCase(),
					key: country.name,
					fill: country.vacantColor,
					country: country,
				},
				_.map(country.startSpaces, (spaceId) => {
					return React.createElement('g', {
						key: country.name + '-' + spaceId,
						id: country.name + '-' + spaceId,
						dangerouslySetInnerHTML: {__html: `<use xlink:href="#space-${spaceId}" />`},
					})
				}))
		)

		// todo: perhaps find a better way to render the spaces
		let occupiedSpaces = _.union(
			_.flatten(this.state.map.countries, 'startSpaces'),
			_.compact(_.flatten(_.map(this.state.map.countries, (country) => {
				return _.map(country.startSpaces, (spaceId) => {
					return _.find(this.state.map.spaces, { 'id': spaceId }).territory
				})
		}))))

		let emptySpaces = _.filter(this.state.map.spaces, (space) => {
			return !_.contains(occupiedSpaces, space.id)
		})

		let otherSpaces = React.createElement('g', 
			{
				className: 'empty country',
				id: 'vacant',
				key: 'vacant',
				country: null,
			},
			_.map(emptySpaces, (space) => {
				return React.createElement('g',
					{
						id: 'empty-' + space.id,
						key: 'empty-' + space.id,
						dangerouslySetInnerHTML: {__html: `<use xlink:href="#space-${space.id}" />`}
					}
				)
			}))

		return React.createElement('svg',
			{
				className: 'map',
				style: {
					width: this.state.map.width + 'px',
					height: this.state.map.height + 'px',
				},
			},
			spaces,
			countries,
			otherSpaces)
	},
})

export default RenderedMap

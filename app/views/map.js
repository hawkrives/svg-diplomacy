import * as React from 'react/addons'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import mapStore from '../stores/mapStore'
let cx = React.addons.classSet

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
		let spaces = React.createElement('defs', {id: 'all-spaces'},
			_.map(this.state.map.spaces, (space) => {
				// todo: clean up this logic, if possible
				let vectorPath = space.path;

				let paths = [];
				let cantUsePath = false;
				let args = {
					className: cx({
						space: true,
						'supply-center': Boolean(space.supply),
						['space-type-' + space.type]: true,
					}),
					id: `space-${space.id}`,
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
					paths = _.map(vectorPath, (path, index) =>
						React.createElement('path', {d: path, key: index}))
				}
				else {
					// it has only a single path
					paths = [React.createElement('path', {d: vectorPath, key: 0})]
				}

				return React.createElement('g', args, cantUsePath ? null : paths)
			}))

		let patterns = React.createElement('defs', null,
			React.createElement('pattern',
				{
					className: 'pattern',
					id: 'diagonalHatch',
					key: 'diagonalHatch',
					patternUnits: 'userSpaceOnUse',
					width: '32',
					height: '32',
				},
				React.createElement('path',
				{
					className: 'fill',
					d: 'M 0,0 l 32,0 0,32 -32,0 0,-32',
				}),
				React.createElement('path',
				{
					className: 'stripes',
					d: 'M -8,8 l 16,-16 M 0,32 l 32,-32 M 24,40 l 16,-16',
				})))

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
						key: `${country.name}-${spaceId}`,
						id: `${country.name}-${spaceId}`,
						className: 'territory accessible-territory',
						dangerouslySetInnerHTML: {__html: `<use xlink:href="#space-${spaceId}" />`},
					})
				}))
		)

		// todo: perhaps find a better way to render the spaces
		let occupiedSpaces = _(this.state.map.countries)
			.pluck('startSpaces')
			.flatten()
			.map((spaceId) => _.find(this.state.map.spaces, {id: spaceId}).territory)
			.flatten()
			.compact()
			.union(_.flatten(this.state.map.countries, 'startSpaces'))
			.value()

		let emptySpaces = _.reject(this.state.map.spaces, (space) => _.contains(occupiedSpaces, space.id))

		let otherSpaces = React.createElement('g',
			{
				className: 'country empty-country',
				id: 'vacant',
				key: 'Vacant',
				country: null,
			},
			_.map(emptySpaces, (space) => {
				let isTraversable = (space.moveTo.land.length > 0 || space.moveTo.sea.length > 0)

				return React.createElement('g',
					{
						id: `empty-${space.id}`,
						key: `empty-${space.id}`,
						className: 'territory ' + (isTraversable ? 'accessible-territory' : 'inaccessible-territory'),
						fill: isTraversable ? undefined : 'url(#diagonalHatch)',
						dangerouslySetInnerHTML: {__html: `<use xlink:href="#space-${space.id}" />`},
					}
				)
			}))

		return React.createElement('svg',
			{
				className: 'map',
				width: this.state.map.width,
				height: this.state.map.height,
			},
			spaces,
			patterns,
			React.createElement('g', {className: 'countries'}, countries, otherSpaces))
	},
})

export default RenderedMap

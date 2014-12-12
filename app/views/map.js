import * as React from 'react/addons'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
let cx = React.addons.classSet

let RenderedMap = React.createClass({
	findMap(mapId) {
		let map = this.props.map;
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
	onClickTerritory(ev) {
		console.log(ev.target.attributes['data-id'].value);
	},
	render() {
		console.log('RenderedMap.props', this.props)
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
						[`space-type-${space.type}`]: true,
					}),
					id: `space-${space.id}`,
					key: space.id,
				}

				if (_.isNumber(vectorPath)) {
					// it's referencing another path, so we use a <use>.
					cantUsePath = true;
					args.dangerouslySetInnerHTML = {__html: `<use xlink:href="#space-${vectorPath}" />`}
				}
				else if (_.isArray(vectorPath)) {
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
					id: 'diagonalHatch',
					key: 'diagonalHatch',
					patternUnits: 'userSpaceOnUse',
					width: '32',
					height: '32',
				},
				React.createElement('path', {className: 'fill', d: 'M 0,0 l 32,0 0,32 -32,0 0,-32'}),
				React.createElement('path', {className: 'stripes', d: 'M -8,8 l 16,-16 M 0,32 l 32,-32 M 24,40 l 16,-16'})))

		let countries = _.map(this.state.map.countries, (country) =>
			React.createElement('g',
				{
					className: 'country',
					id: country.name.toLowerCase(),
					key: country.name,
					fill: country.vacantColor,
				},
				_.map(country.startSpaces, (spaceId) => {
					return React.createElement('g', {
						key: `${country.name}-${spaceId}`,
						id: `${country.name}-${spaceId}`,
						onClick: this.onClickTerritory,
						className: 'territory accessible-territory',
						dangerouslySetInnerHTML: {__html: `<use data-id='${spaceId}' xlink:href="#space-${spaceId}" />`},
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

		let seaSpaceIds = _(this.state.map.spaces)
			.filter({type: 'sea'})
			.pluck('id')
			.value()

		let seaSpaces = React.createElement('g',
			{
				className: 'ocean',
				key: 'Ocean',
			},
			_.map(seaSpaceIds, (spaceId) => React.createElement('g',
				{
					id: `sea-${spaceId}`,
					key: `sea-${spaceId}`,
					onClick: this.onClickTerritory,
					className: 'territory accessible-territory sea-territory',
					dangerouslySetInnerHTML: {__html: `<use data-id='${spaceId}' xlink:href="#space-${spaceId}" />`},
				}))
			)

		let emptySpaces = _(this.state.map.spaces)
			.reject((space) => _.contains(occupiedSpaces, space.id))
			.reject((space) => _.contains(seaSpaceIds, space.id))
			.value()

		let otherSpaces = React.createElement('g',
			{
				className: 'country empty-country',
				id: 'vacant',
				key: 'Vacant',
			},
			_.map(emptySpaces, (space) => {
				let isTraversable = (space.moveTo.land.length > 0 || space.moveTo.sea.length > 0)

				return React.createElement('g',
					{
						id: `empty-${space.id}`,
						key: `empty-${space.id}`,
						onClick: this.onClickTerritory,
						className: cx({
							territory: true,
							'accessible-territory': isTraversable,
							'inaccessible-territory': !isTraversable,
							'sea-territory': (space.type === 'sea'),
						}),
						fill: isTraversable ? undefined : 'url(#diagonalHatch)',
						dangerouslySetInnerHTML: {__html: `<use data-id='${space.id}' xlink:href="#space-${space.id}" />`},
					}
				)
			}))

		return React.createElement('svg',
			{
				className: 'map',
				viewBox: `0 0 ${this.state.map.width} ${this.state.map.height}`,
			},
			spaces,
			patterns,
			seaSpaces,
			React.createElement('g',
				{className: 'countries'},
				countries,
				otherSpaces
			))
	},
})

export default RenderedMap

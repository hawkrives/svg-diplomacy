import * as React from 'react/addons'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
let cx = React.addons.classSet

let RenderedMap = React.createClass({
	findMap(props) {
		let map = props.map;
		if (!map && props.mapId && props.maps) {
			let mapId = _.isObject(props.mapId) ? props.mapId.id : props.mapId;
			map = _.find(props.maps, (map) => map.id === mapId)
		}
		if (map) {
			this.setState({
				map: {
					name: map.get('name'),
					width: map.get('width'),
					height: map.get('height'),
					countries: map.get('countries'),
					spaces: map.get('spaces'),
					id: map.id,
				}
			})
		}
	},
	componentWillReceiveProps(nextProps) {
		this.findMap(nextProps)
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
		console.log('RenderedMap.props', this.props, this.state.map)
		let mapId = this.state.map.id
		let spaces = React.createElement('defs', {id: 'all-spaces'},
			// React.createElement('path', {
			// 	id: `${mapId}-supply-center`,
			// 	d: 'M43.2019567,43.2019567 L27.1709577,37.7656885 L13.604471,47.8897384 L13.8208179,30.9634528 L0,21.1894604 L16.1647088,16.1647088 L21.1894602,0 L30.9634528,13.8208181 L47.8897384,13.6044709 L37.7656885,27.1709579 L43.2019567,43.2019567 Z',
			// 	stroke: '#000000',
			// 	strokeWidth: '1.5',
			// 	fill: '#FFE714',
			// }),
			_.map(this.state.map.spaces, (space) => {
				// todo: clean up this logic, if possible
				let vectorPath = space.path;

				let paths = [];
				let hasSupply = false;
				let supply;
				let cantUsePath = false;
				let args = {
					className: cx({
						space: true,
						'supply-center': Boolean(space.supply),
						'army': Boolean
						(space.army),
						[`space-type-${space.type}`]: true,
					}),
					id: `${mapId}-space-${space.id}`,
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

				if (space.supply) {
					hasSupply = true;

					// supply = React.createElement('circle', {
					// 	className: 'supply-symbol',
					// 	id: `supply-${space.id}`,
					// 	cx: space.supply.x,
					// 	cy: this.state.map.height - space.supply.y,
					// 	r: 5,
					// })

					let supplySize = 24
					supply = React.createElement('g', {
						key: 'supply',
						dangerouslySetInnerHTML: {
							__html: `<image width='${supplySize}' height='${supplySize}' x='${space.supply.x - supplySize/2}' y='${this.state.map.height - supplySize/2 - space.supply.y}' xlink:href='images/supply.svg' />`
							// __html: `<image width='16' height='16' x=0 y=0 style='transform:translateX(${space.supply.x}px) translateY(${space.supply.y}px)' xlink:href='images/supply.svg' />`
							// __html: `<use x='${space.supply.x}' y='${space.supply.y}' xlink:href='#${mapId}-supply-center' />`
						},
					})
				}

				return React.createElement('g', args, (cantUsePath ? null : [paths, hasSupply ? supply : null]))
			}))

		let patterns = React.createElement('defs', null,
			React.createElement('pattern',
				{
					id: `${mapId}-diagonalHatch`,
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
					id: `${mapId}-${country.name.toLowerCase().replace(' ', '_')}`,
					key: country.name,
					fill: country.vacantColor,
				},
				_.map(country.startSpaces, (spaceId) => {
					return React.createElement('g', {
						key: `${country.name}-${spaceId}`,
						id: `${mapId}-${country.name}-${spaceId}`,
						onClick: this.onClickTerritory,
						className: 'territory accessible-territory',
						dangerouslySetInnerHTML: {__html: `<use data-id='${spaceId}' xlink:href="#${mapId}-space-${spaceId}" />`},
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
					id: `${mapId}-sea-${spaceId}`,
					key: `sea-${spaceId}`,
					onClick: this.onClickTerritory,
					className: 'territory accessible-territory sea-territory',
					dangerouslySetInnerHTML: {__html: `<use data-id='${spaceId}' xlink:href="#${mapId}-space-${spaceId}" />`},
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
						id: `${mapId}-empty-${space.id}`,
						key: `empty-${space.id}`,
						onClick: this.onClickTerritory,
						className: cx({
							territory: true,
							'accessible-territory': isTraversable,
							'inaccessible-territory': !isTraversable,
							'sea-territory': (space.type === 'sea'),
						}),
						fill: isTraversable ? undefined : `url(#${mapId}-diagonalHatch)`,
						dangerouslySetInnerHTML: {__html: `<use data-id='${space.id}' xlink:href="#${mapId}-space-${space.id}" />`},
					}
				)
			}))

		let units = React.createElement('g',
			{
				className: 'units',
			},
			_.map(this.props.game.armies, (army) => {
				let armySize = 24
				let imagePath;	//This is set by Nick to be either army or navy
				if (army.type === 'navy')
					imagePath = 'images/navy.png'
				else
					imagePath = 'images/tank.gif'
				return React.createElement('g', {
					key: 'army',
					dangerouslySetInnerHTML: {
						__html: `<image width='${armySize}' height='${armySize}' x='${space.drawUnit.x - armySize/2}' y='${this.state.map.height - armySize/2 - space.drawUnit.y}' xlink:href=${imagePath} />`
					},
				})
		}))

		return React.createElement('svg',
			{
				className: 'map ' + (this.props.className || ''),
				viewBox: `0 0 ${this.state.map.width} ${this.state.map.height}`,
				preserveAspectRatio: 'xMidYMid slice',
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

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
			currentMove: {},
		}
	},

	findPossibleMoves(space, type) {
		let moveTo = type === 'navy' ? space.moveTo.sea : space.moveTo.land
		return moveTo
	},

	isValidSelection(thisEl, space, army, selectedSpaces, prevArmy) {
		let validSelection = true
		let parent = thisEl.parentNode
		if (selectedSpaces.length) {
			if (selectedSpaces[0].id === space.id)
				return true;

			let priorSpace = selectedSpaces[0]
			let moveTo = prevArmy.type === 'navy' ? priorSpace.moveTo.sea : priorSpace.moveTo.land
			if (!_.contains(moveTo, space.id)) {
				validSelection = false
			}
		}
		else {
			validSelection = Boolean(army)
		}

		return validSelection
	},

	retrieveSpacesFromDOMNodes(nodes) {
		return _(nodes)
			.map((el) => _.first(el.children))
			.map((el) => el.attributes['data-id'].value)
			.map((id) => parseInt(id, 10))
			.map((id) => _.find(this.state.map.spaces, {id}))
			.value()
	},

	onClickTerritory(ev) {
		let selectedEls = Array.from(this.getDOMNode().getElementsByClassName('selected'))
		let previouslyPossibleEls = Array.from(this.getDOMNode().getElementsByClassName('possible'))

		let thisEl = ev.target
		let id = parseInt(thisEl.attributes['data-id'].value, 10)
		let space = _.find(this.state.map.spaces, {id})
		let armies = this.props.game.get('armies')
		let army = _.find(armies, {location: space.id, player: this.props.user.id})
		console.log(space.id, army, armies)
		let parent = thisEl.parentNode
		let selectedSpaces = this.retrieveSpacesFromDOMNodes(selectedEls)

		if (selectedSpaces.length >= 1) {
			let prevArmy = _.find(armies, {location: selectedSpaces[0].id, player: this.props.user.id})
			_.each(selectedEls, (elt) => {elt.classList.remove('selected')})
			_.each(previouslyPossibleEls, (elt) => {elt.classList.remove('possible')})
			if (this.isValidSelection(thisEl, space, army, selectedSpaces, prevArmy)) {
				// Calculate the logic of the move type - this.props.pendingOrders
				let moveType, orderTo, orderFrom;
				let currentMove = {at: selectedSpaces[0].id, armyId: prevArmy.armyId}
				if (selectedSpaces[0].id === space.id) {
					currentMove.type = 'hold'
				}
				else if (_.contains(_.map(this.props.pendingOrders, (elt) => { return elt.to}), space.id)) {
					let moveSupported = _.find(this.props.pendingOrders, {to: space.id})
					if (moveSupported.armyId === prevArmy.armyId) {
						currentMove = moveSupported
					}
					else {
						currentMove.type = 'support-move'
						currentMove.from = moveSupported.at
						currentMove.to = moveSupported.to
					}
				}
				else if (_.contains(_.map(this.props.pendingOrders, (elt) => { return elt.at}), space.id)) {
					let moveSupported = _.find(this.props.pendingOrders, {at: space.id})
					if (moveSupported.type === 'hold') {
						currentMove.type = 'support-hold'
						currentMove.to = moveSupported.at
					}
					else {
						currentMove.type = 'move'
						currentMove.to = space.id
					}
				}
				else if (_.contains(_.map(armies, (elt) => { return elt.location}), space.id)) {
					let occupiedArmy = _.find(armies, {location: space.id})
					if (occupiedArmy.player === this.props.user.id) {
						currentMove.type = 'support-hold'
						currentMove.to = space.id
					}
					else {
						currentMove.type = 'move'
						currentMove.to = space.id
					}
				}
				else {
					currentMove.type = 'move'
					currentMove.to = space.id
				}
				this.setState({currentMove})
				this.props.onNewOrder(currentMove)
				console.log(currentMove)
			}
			return;
		}

		if (!parent.classList.contains('inaccessible-territory') && this.isValidSelection(thisEl, space, army, selectedSpaces)) {
			parent.classList.toggle('selected');
			parent.classList.toggle('possible');

			if (selectedEls.length === 0) {
				_.each(this.findPossibleMoves(space, army.type), (id) =>
					this.getDOMNode().getElementById(`${this.state.map.id}-space-${id}`).classList.add('possible'))
			}
		}
	},

	render() {
		console.log('RenderedMap.render')
		let mapId = this.state.map.id
		let spaces = React.createElement('defs', {id: 'all-spaces'},
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
						[`space-type-${space.type}`]: true,
					}),
					id: `${mapId}-space-${space.id}`,
					key: space.id,
				}

				let army = _.find(this.props.game.get('armies'), {location: space.id})

				let armySize = 48
				let imagePath = army ? `images/${army.type}.png` : ''
				let armyDrawX = space.drawUnit ? space.drawUnit.x : 0
				let armyDrawY = space.drawUnit ? space.drawUnit.y : 0
				let armyImage = `<image width='${armySize}' height='${armySize}' x='${armyDrawX - armySize/2}' y='${this.state.map.height - armySize/2 - armyDrawY}' xlink:href=${imagePath} />`

				if (_.isNumber(vectorPath)) {
					// it's referencing another path, so we use a <use>.
					cantUsePath = true;
					let vectorString = `<use xlink:href="#space-${vectorPath}" />`
					if (army)
						vectorString += armyImage
					args.dangerouslySetInnerHTML = {
						__html: vectorString
					}
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
				if (army)
					paths.push(React.createElement('g', {className: `unit army-${army.type}`, dangerouslySetInnerHTML: {__html: armyImage}}))

				if (space.supply) {
					hasSupply = true

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

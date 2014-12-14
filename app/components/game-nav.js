import * as React from 'react'
import {Octicon as OcticonClass} from './octicon'
import {Link} from 'react-router'

let Octicon = React.createFactory(OcticonClass);

let GameNavbar = React.createClass({
	activateNavBar(props) {
		if(props.section) {
			this.setState({section: props.section})
		}
	},
	componentWillReveiveProps(nextProps) {
		this.activateNavBar(nextProps)
	},
	componentWillMount() {
		this.componentWillReveiveProps(this.props)
	},
	getInitialState() {
		return {
			section: '',
		}
	},
	render() {
		return React.createElement('ul', {id: 'game-nav', className: 'menu'},
			React.createElement('li', {key: 'board'},
				React.createElement(Link, {to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'board'}}, Octicon({icon: 'globe'}
			))),
			React.createElement('li', {key: 'chat'},
				React.createElement(Link, {to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'chat'}}, Octicon({icon: 'comment-discussion'}
			))),
			React.createElement('li', {key: 'history'},
				React.createElement(Link, {to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'history'}}, Octicon({icon: 'clock'}
			))),
			React.createElement('li', {key: 'info'},
				React.createElement(Link, {to: 'game', params: {gameId: this.props.params.gameId}, query: {section: 'info'}}, Octicon({icon: 'gear'}
			)))
		)
	},
})

export default GameNavbar

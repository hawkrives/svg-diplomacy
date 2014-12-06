import * as React from 'react'
import * as Reflux from 'reflux'
import * as _ from 'lodash'
import {State} from 'react-router'
import userStore from '../stores/userStore'
import gameStore from '../stores/gameStore'

let Editable = React.createClass({
	getInitialState() {
		return {
			content: '',
			editing: false,
		}
	},
	componentWillRecieveProps(nextProps) {
		this.setState({content: nextProps.content})
	},
	componentWillMount() {
		this.componentWillRecieveProps(this.props)
	},
	toggleEditing() {
		let isStillEditing = !this.state.editing
		this.setState({editing: isStillEditing})

		if (!isStillEditing)
			this.props.onSave()
	},
	onChange(ev) {
		this.setState({content: ev.target.value})
		this.props.onChange(ev)
	},
	onKeyDown(ev) {
		if (ev.keyCode === 13)
			this.toggleEditing()
	},
	render() {
		if (this.state.editing) {
			return React.createElement('span', null,
				React.createElement('input', {ref: 'content', type: 'text', onChange: this.onChange, onKeyDown: this.onKeyDown, defaultValue: this.state.content}),
				React.createElement('input', {type: 'submit', value: 'Submit', onClick: this.toggleEditing}))
		}
		return React.createElement('span', {onClick: this.toggleEditing}, this.state.content)
	}
})

let Game = React.createClass({
	mixins: [
		State,
		Reflux.listenTo(userStore, 'onUserChanged', 'onUserChanged'),
		Reflux.listenTo(gameStore, 'onGameChanged', 'onGameChanged'),
	],
	onUserChanged(user) {
		this.setState({user})
	},
	onGameChanged(games) {
		let gameId = this.getParams().gameId
		let game = _.find(games, game => game.id === gameId)
		this.setState({game})
	},
	getInitialState() {
		return { user: null, game: null }
	},
	saveGame() {
		console.log('saving', this.state.game.id)
		this.state.game.save()
			.then((...args) => console.log('game saved', args))
	},
	updateGame(ev) {
		console.log(ev.target.value)
		this.state.game.set('title', ev.target.value)
	},
	render() {
		let title = React.createElement('h1', {className: 'view-title'}, 'Active Game (id: ' + this.getParams().gameId + ')')
		let gameView = null;

		if (this.state.game) {
			let gameTitle = React.createElement(Editable, {
				content: this.state.game.get('title'),
				onChange: this.updateGame,
				onSave: this.saveGame,
			})
			gameView = React.createElement('div', {className: 'game-view'}, gameTitle)
		}

		return React.createElement('div',
			{id: 'game'},
			title,
			gameView)
	}
})

export default Game

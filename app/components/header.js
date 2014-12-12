import * as React from 'react'
import * as Reflux from 'reflux'

import userStore from '../stores/userStore'

import {Link as LinkClass} from 'react-router'
import {Octicon as OcticonClass} from './octicon'

let Link = React.createFactory(LinkClass);
let Octicon = React.createFactory(OcticonClass);

let Header = React.createClass({
	mixins: [Reflux.listenTo(userStore, 'onUserChange', 'onUserChange')],

	onUserChange(user) {
		console.log('user changed', user);
		this.setState({
			isSignedIn: Boolean(user)
		});
	},

	getInitialState() {
		return { isSignedIn: undefined }
	},

	render() {
		let loggedInMenuItems = [
			React.createElement('li', {key: 'home'},    Link({to: 'home'},    Octicon({icon: 'home'}))),
			React.createElement('li', {key: 'profile'}, Link({to: 'profile'}, Octicon({icon: 'person'}))),
			React.createElement('li', {key: 'search'},  Link({to: 'search'},  Octicon({icon: 'search'}))),
			React.createElement('li', {key: 'help'},    Link({to: 'help'},    Octicon({icon: 'question'}))),
			React.createElement('li', {key: 'create'},  Link({to: 'create'},  Octicon({icon: 'plus'}))),
		]

		let loggedOutMenuItems = [
			React.createElement('li', {key: 'sign-in'}, Link({to: 'sign-in'}, Octicon({icon: 'sign-in'}),  ' Sign In')),
			React.createElement('li', {key: 'sign-up'}, Link({to: 'sign-up'}, Octicon({icon: 'squirrel'}), ' Sign Up')),
		]

		let menuItems = this.state.isSignedIn ? loggedInMenuItems : loggedOutMenuItems

		return React.createElement('header', {id: 'header'},
			React.createElement('h1', null, 'SVG Diplomacy'),
			React.createElement('ul', {className: 'menu'}, menuItems)
		)
	},
})

export default Header

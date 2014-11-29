import * as React from 'react'
import {ListenerMixin} from 'reflux'

import {isSignedIn} from '../helpers/auth'
import userStore from '../stores/userStore'

import {Link as LinkClass} from 'react-router'
import {Octicon as OcticonClass} from './octicon'

let Link = React.createFactory(LinkClass);
let Octicon = React.createFactory(OcticonClass);

let Header = React.createClass({
	mixins: [ListenerMixin],

	onUserChange() {
		console.log('user changed');
		this.setState({
			isSignedIn: isSignedIn()
		});
	},

	componentDidMount: function() {
		this.listenTo(userStore, this.onUserChange);
    },

	getInitialState() {
		return {
			isSignedIn: isSignedIn()
		}
	},

	render() {
		let home = [React.createElement('li', {key: 'home'}, Link({to: "home"}, Octicon({icon: 'home'})))]

		let loggedInMenuItems = [
			React.createElement('li', {key: 'profile'}, Link({to: "profile"}, Octicon({icon: 'person'}))),
			React.createElement('li', {key: 'search'},  Link({to: "search"},  Octicon({icon: 'search'}))),
			React.createElement('li', {key: 'help'},    Link({to: "help"},    Octicon({icon: 'question'}))),
			React.createElement('li', {key: 'create'},  Link({to: "create"},  Octicon({icon: 'plus'})))
		]

		let loggedOutMenuItems = [
			React.createElement('li', {key: 'sign-in'}, Link({to: "sign-in"}, Octicon({icon: 'sign-in'}),  ' Sign In')),
			React.createElement('li', {key: 'sign-up'}, Link({to: "sign-up"}, Octicon({icon: 'squirrel'}), ' Sign Up'))
		]

		let menuItems = home.concat(this.state.isSignedIn ? loggedInMenuItems : loggedOutMenuItems)

		return React.createElement('header', {id: 'header'},
			React.createElement('h1', null, "SVG Diplomacy"),
			React.createElement('ul', null, menuItems)
		)
	}
})

export default Header

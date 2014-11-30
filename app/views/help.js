import * as React from 'react'
import {Link} from 'react-router'
import * as marked from 'marked'
import 'fetch'

let Help = React.createClass({
	getInitialState() {
		return {
			rulesHTML: '<p>Loading Rules&hellip;</p>',
			tutorialHTML: '<p>Loading Tutorial&hellip;</p>'
		}
	},
	componentWillMount() {
		let pathToRules = 'rules.text';
		let pathToTutorial = 'tutorial.text';

		fetch(pathToRules)
			.then((response) => {
				this.setState({rulesHTML: marked(response._body)})
			})
		
		fetch(pathToTutorial)
			.then((response) => {
				this.setState({tutorialHTML: marked(response._body)})
			})
	},
	render() {
		let rules = React.createElement('article', {className: 'short-rules'},
			React.createElement(Link, {to: 'rules'}, React.createElement('h2', {className: 'subtitle'}, 'Rules')),
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.rulesHTML}}))

		let tutorial = React.createElement('article', {className: 'short-tutorial'},
			React.createElement(Link, {to: 'tutorial'}, React.createElement('h2', {className: 'subtitle'}, 'Tutorial')),
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.tutorialHTML}}))

		let title = React.createElement('h1', {className: 'view-title'}, 'Help')

		return React.createElement('div',
			{id: 'help'},
			title,
			rules,
			tutorial)
	}
})

export default Help

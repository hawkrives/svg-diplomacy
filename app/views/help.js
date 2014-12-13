import * as React from 'react'
import {Link} from 'react-router'
import * as marked from 'marked'

let Help = React.createClass({
	getInitialState() {
		return {
			rulesHTML: '<p>Loading Rules&hellip;</p>',
			tutorialHTML: '<p>Loading Tutorial&hellip;</p>',
		}
	},
	componentWillMount() {
		let pathToRules = 'rules.text';
		let pathToTutorial = 'tutorial.text';

		window.htmlCache = window.htmlCache || {}

		if (!window.htmlCache.rulesSummary) {
			fetch(pathToRules)
				.then((response) => response._body)
				.then((response) => window.htmlCache.rulesSummary = response)
				.then((response) => this.setState({rulesHTML: marked(response)}))
		}
		else {
			this.setState({rulesHTML: marked(window.htmlCache.rulesSummary)})
		}

		if (!window.htmlCache.tutorialSummary) {
			fetch(pathToTutorial)
				.then((response) => response._body)
				.then((response) => window.htmlCache.tutorialSummary = response)
				.then((response) => this.setState({tutorialHTML: marked(response)}))
		}
		else {
			this.setState({tutorialHTML: marked(window.htmlCache.tutorialSummary)})
		}
	},
	render() {
		let rules = React.createElement('article', {className: 'short-rules'},
			React.createElement(Link, {to: 'rules'}, React.createElement('h2', {className: 'subtitle'}, 'Rules')),
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.rulesHTML}}),
			React.createElement(Link, {to: 'rules', className: 'block-link'}, 'Detailed Rules'))

		let tutorial = React.createElement('article', {className: 'short-tutorial'},
			React.createElement(Link, {to: 'tutorial'}, React.createElement('h2', {className: 'subtitle'}, 'Tutorial')),
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.tutorialHTML}}),
			React.createElement(Link, {to: 'tutorial', className: 'block-link'}, 'Complete Tutorial'))

		let title = React.createElement('h1', {className: 'view-title'}, 'Help')

		return React.createElement('div',
			{id: 'help'},
			title,
			rules,
			tutorial)
	},
})

export default Help

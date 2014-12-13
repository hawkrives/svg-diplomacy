import * as React from 'react'
import * as marked from 'marked'

let Rules = React.createClass({
	getInitialState() {
		return {
			rulesHTML: '<p>Loading Rules&hellip;</p>',
		}
	},
	componentWillMount() {
		let pathToRules = 'detailed-rules.text';

		window.htmlCache = window.htmlCache || {}

		if (!window.htmlCache.rulesDetails) {
			fetch(pathToRules)
				.then((response) => response._body)
				.then((response) => window.htmlCache.rulesDetails = response)
				.then((response) => this.setState({rulesHTML: marked(response)}))
		}
		else {
			this.setState({rulesHTML: marked(window.htmlCache.rulesDetails)})
		}
	},
	render() {
		let rules = React.createElement('article', {className: 'detailed-rules'},
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.rulesHTML}}))

		let title = React.createElement('h1', {className: 'view-title'}, 'Rules')

		return React.createElement('div',
			{id: 'rules'},
			title,
			rules)
	},
})

export default Rules


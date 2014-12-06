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

		fetch(pathToRules)
			.then((response) => {
				this.setState({rulesHTML: marked(response._body)})
			})
	},
	render() {
		let rules = React.createElement('article', {className: 'detailed-rules'},
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.rulesHTML}}))

		let title = React.createElement('h1', {className: 'view-title'}, 'Rules')

		return React.createElement('div',
			{id: 'rules'},
			title,
			rules)
	}
})

export default Rules


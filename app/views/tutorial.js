import * as React from 'react'
import * as marked from 'marked'

let Tutorial = React.createClass({
	getInitialState() {
		return {
			tutorialHTML: '<p>Loading Tutorial&hellip;</p>',
		}
	},
	componentWillMount() {
		let pathToTutorial = 'detailed-tutorial.text';

		window.htmlCache = window.htmlCache || {}

		if (!window.htmlCache.tutorialDetails) {
			fetch(pathToTutorial)
				.then((response) => response._body)
				.then((response) => window.htmlCache.tutorialDetails = response)
				.then((response) => this.setState({tutorialHTML: marked(response)}))
		}
		else {
			this.setState({tutorialHTML: marked(window.htmlCache.tutorialDetails)})
		}
	},
	render() {
		let tutorial = React.createElement('article', {className: 'detailed-tutorial'},
			React.createElement('div', {dangerouslySetInnerHTML: {__html: this.state.tutorialHTML}}))

		let title = React.createElement('h1', {className: 'view-title'}, 'Tutorial')

		return React.createElement('div',
			{id: 'tutorial'},
			title,
			tutorial)
	},
})

export default Tutorial



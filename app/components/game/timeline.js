import * as React from 'react'

let Timeline = React.createClass({
	render() {
		let slider = React.createElement('span', {className: 'timeline-slider'})

		let timeline = React.createElement('div', {className: 'timeline-background'}, slider)

		return React.createElement('div', {id: 'game-timeline'}, timeline)
	}
})

export default Timeline

import * as React from 'react'

let Timeline = React.createClass({
	render() {
		let timeline = React.createElement('input', {
			className: 'timeline-range',
			type: 'range',
			min: 0,
			max: 100,
		})

		return React.createElement('div', {id: 'game-timeline'}, timeline)
	},
})

export default Timeline

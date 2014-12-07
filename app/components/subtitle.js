import * as React from 'react'

let Subtitle = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired,
	},
	render() {
		return React.createElement('h2', {className: 'subtitle'}, this.props.text)
	},
})

export default Subtitle

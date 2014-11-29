import * as React from 'react'

let Octicon = React.createClass({
	render() {
		return React.createElement('span', {className: "octicon octicon-" + this.props.icon})
	}
})

export default Octicon
export {Octicon}
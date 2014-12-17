import * as React from 'react'
import * as _ from 'lodash'

let DetailedListItem = React.createClass({
	render() {
		let components = _.map(this.props.info.attributes || this.props.info, (value, key) => {
			let val = JSON.stringify(value, null, 2);
			val = val ? val.substring(0, 50) : val;

			if (key === 'id' || key === 'get')
				return null

			return React.createElement('div', {key: key}, key, ': ', val)
		})

		components.unshift(React.createElement('div', {key: 'id'}, 'id', ': ', this.props.info.id))

		if (this.props.buttonClick)
			components.push(React.createElement('button', {onClick: this.props.buttonClick, key: 'deleteButton'}, 'Delete'))

		return React.createElement('li',
			{
				id: this.props.id || '',
				className: this.props.className || 'one-map',
				onClick: this.props.onClick,
			},
			components)
	},
})

export default DetailedListItem

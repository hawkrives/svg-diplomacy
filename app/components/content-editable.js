import * as React from 'react'

let ContentEditable = React.createClass({
	onInput(ev) {
		if (this.props.onInput)
			this.props.onInput(ev)
	},
	onKeyDown(ev) {
		if (ev.keyCode === 13) {
			ev.preventDefault()
			if (this.props.onEnter)
				this.props.onEnter(ev)
		}
		if (this.props.onKeyDown)
			this.props.onKeyDown(ev)
	},
	onBlur(ev) {
		if (this.props.onBlur)
			this.props.onBlur(ev)
	},
	render() {
		let className = this.props.className || ''
		return React.createElement('span', {
			className: 'contenteditable ' + className,
			contentEditable: true,
			onInput: this.updateGameTitle,
			onKeyDown: this.onKeyDown,
			onBlur: this.onBlur,
			dangerouslySetInnerHTML: {__html: this.props.text},
		})
	},
})

export default ContentEditable

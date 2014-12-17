import * as React from 'react'

let GameChatlist = React.createClass({
	render() {
		let dialogues = React.createElement('ul',
			{
				className: 'chat-list',
			}
		)

		return React.createElement('div', {id: 'game-chatlist'}, dialogues)
	}
})

export default GameChatlist

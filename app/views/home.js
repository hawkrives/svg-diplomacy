import * as React from 'react'
import {Link as LinkElement} from 'react-router'
let Link = React.createFactory(LinkElement)

let Home = React.createClass({
	render() {
		let myGamesTitle = React.createElement('h2', {className: 'subtitle'}, 'My Games')
		let allGamesTitle = React.createElement('h2', {className: 'subtitle'}, 'All Games')

		return React.createElement('div',
			{id: 'home'},
			
			myGamesTitle,
			React.createElement('ul', null, 
				React.createElement('li', null, 'None')),

			allGamesTitle,
			React.createElement('ul', null, 
				React.createElement('li', null, 
						Link({to: 'games'}, 'See all games')))
		)
	}
})

export default Home

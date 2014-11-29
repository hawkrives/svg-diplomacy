import * as React from 'react'
import {Link as LinkElement} from 'react-router'
let Link = React.createFactory(LinkElement)

let Home = React.createClass({
	render() {
		return React.createElement('div', {id: 'home'},
			
			React.createElement('h2', null, "My Games"),
			React.createElement('ul', null, 
				React.createElement('li', null, 'None')),

			React.createElement('h2', null, 'All Games'),
			React.createElement('ul', null, 
				React.createElement('li', null, 
						Link({to: 'games'}, 'See all games')
					))
		)
	}
})

export default Home

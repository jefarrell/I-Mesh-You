import React from 'react';
import {render} from 'react-dom';
import Map from './Map.jsx';
import Search from './Search.jsx';

const App = React.createClass({
	render() {
		return (
			<div>
				<Search />
			</div>
		);
	}
});


render(<App/>, document.getElementById('root'));

/*

App
	Search
		Map
			Popup
			Legend

App calls Search
	Search calls Map, passes props to zoom map around
		Map calls Popup
			Popup runs callback to Map to trigger update on submission (wonky but w/e)
		Map calls Legend, color props
	
*/
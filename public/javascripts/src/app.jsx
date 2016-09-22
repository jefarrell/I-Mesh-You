import React from 'react';
import {render} from 'react-dom';
import Map from './Map.jsx';

const App = React.createClass({
	render() {
		return (
			<div>
				<Map />
			</div>
		);
	}
});


render(<App/>, document.getElementById('root'));

import React from 'react';
import {render} from 'react-dom';
//import Map from './Map.jsx';
import Popup from './Popup.jsx'

const App = React.createClass({
	render() {
		return (
			<div>
				<Popup />
			</div>
		);
	}
});


render(<App/>, document.getElementById('root'));

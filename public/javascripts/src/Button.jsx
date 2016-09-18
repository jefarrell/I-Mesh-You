import React from 'react'

const Button = React.createClass({
	getInitialState: function() {
		return {
			clicked: false
		};
	},

	handleClick: function() {
		this.setState({ clicked: true });
		console.log(" checking in from button ");
	},

	render: function() {
		return (
			<div>
				<button type="button" onClick={this.handleClick} > Add Your Mesh! </button>
			</div>
		)	
	}
});

export default Button;
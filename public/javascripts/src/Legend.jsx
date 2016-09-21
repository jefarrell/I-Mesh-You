import React from 'react'

const Legend = React.createClass({

	render: function() {
		var primStyle = {
		  backgroundColor: '#'+this.props.primCol,
		  WebkitTransition: 'all', 
		  msTransition: 'all' 
		};

		var potStyle = {
			backgroundColor: '#'+this.props.potCol,
			WebkitTransition: 'all', 
		  	msTransition: 'all' 
		}

		return(
			<div>
				<div className={"row cards"} id="primCard" style={primStyle}>
					<div>
						<p className={"cardText"}>Primary Locations</p>
					</div>
				</div>

				<div className={"row cards"} id="potCard" style={potStyle}> 
					<div>
						<p className={"cardText"}>Potential Locations</p>
					</div>
				</div>
			</div>
		)
	}
});

export default Legend
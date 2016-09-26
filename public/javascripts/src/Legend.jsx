import React from 'react'

const Legend = React.createClass({

	render: function() {
		var primStyle = {
		  backgroundColor: this.props.primCol,
		  WebkitTransition: 'all', 
		  msTransition: 'all' 
		};

		var potStyle = {
			backgroundColor: this.props.potCol,
			WebkitTransition: 'all', 
		  	msTransition: 'all' 
		}

		return(
			<div id="legend">
				<div className={"row legRow"}>
					<div id="prim" style={primStyle}></div>
					<div className={"legText"}> Primary Location </div>
				</div>
				<div className={"row legRow"} id="bottomRow">
					<div id="pot" style={potStyle}></div>
					<div className={"legText"}> Potential Location </div>
				</div>
				
			</div>
		)
	}
});


export default Legend

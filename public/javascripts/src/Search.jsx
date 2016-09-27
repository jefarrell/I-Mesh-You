import React from 'react'
import ReactDOM from 'react-dom'
const NodeGeocoder = require('node-geocoder');
import Map from './Map.jsx';

var options = {
	provider: 'google'
};
var geocoder = NodeGeocoder(options);


const Search = React.createClass({
	getInitialState: function() {
		return {
			lat: null,
			lon: null
		}
	},

	handleClick: function(e) {
		e.preventDefault();
		const input = {input: ReactDOM.findDOMNode(this.refs.searchbar).value}
		var self = this;
		$.ajax({
                url: "/inputgeo",
                type: "POST",
                data: JSON.stringify(input),
                contentType: "application/json",
                success: function(msg) {
                    self.setState({lat:msg.lat, lon:msg.lon});
                },
                error: function(err) {
                    console.log("error, ",err);
                }
            });
	},



	render: function() {
		return (
			<div id="searchCont">
			  <div className={"col-sm-4"} id="searchBar">
			    <div className={"input-group"}>
			      <input type="text" className={"form-control"} id="searchInput" ref="searchbar" placeholder="Zoom to Location..."></input>
			      <span className={"input-group-btn"}>
			        <button className={"btn btn-secondary"} id="searchBtn" type="button" onClick={this.handleClick}>Go!</button>
			      </span>
			    </div>
			  </div>
			  <Map lat={this.state.lat} lon={this.state.lon}/>
			</div>
			)
	}
});

export default Search;
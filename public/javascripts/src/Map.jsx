import React from 'react';
import Popup from './Popup.jsx'

const ReactDOM = require('react-dom');
const L = require('leaflet');

var config = {};


config.params = {
	center: [40.655769,-73.938503],
	zoomControl: false,
	zoom: 3,
	maxZoom: 19,
	minZoom: 3,
	scrollwheel: false,
	scrollWheelZoom: false,
	legends: true,
	infoControl: false,
	attributionControl: true
}

config.tileLayer = {
  uri: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  params: {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    id: '',
    accessToken: ''
  }
};


const Map = React.createClass({
	
	getInitialState: function() {
		return {
			tileLayer: null,
			geojsonLayer: null,
			geojson: null
		};
	},

	map: null,

	componentDidMount: function() {

		this.getData();

		if(!this.map) this.init(this.getID());
	},

	componentDidUpdate: function() {

	},

	componentWillUnmount: function() {
		this.map.remove();
	},

	updateMap: function() {

	},



	getData: function() {
		var self = this;
		$.get('/mapData', function(data) {
			self.addGeoJSONLayer(data);
			console.log(data);
		});
	},


	addGeoJSONLayer: function(geojson) {
		this.setState({geojson: geojson});
		var geojsonLayer = L.geoJson(geojson, {
			onEachFeature: this.onEachFeature,
			pointToLayer: this.pointToLayer
		});

		geojsonLayer.addTo(this.map);
		this.setState({geojsonLayer: geojsonLayer});
	},



	pointToLayer: function(feature, latlng) {

		var primaryParams = {
			radius: 4,
			fillColor: 'red',
			color: '#fff',
			weight: 1,
			opacity: 0.5,
			fillOpacity: 0.8
		};

		var potentialParams = {
			radius: 4,
			fillColor: 'green',
			color: '#fff',
			weight: 1,
			opacity: 0.5,
			fillOpacity: 0.8
		}
		if (feature.properties.name === 'Primary Location') {
			return L.circleMarker(latlng, primaryParams);
		} else {
			return L.circleMarker(latlng, potentialParams);
		}
		
	},

	onEachFeature: function(feature, layer) {
		var popup = '<div><p>'+feature.properties.name+'</p></div>';
		layer.bindPopup(popup);
	},

	getID: function() {
		return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
	},

	init: function(id) {
		if (this.map) return;
		
		this.map = L.map(id, config.params);
	    L.control.zoom({ position: "topleft"}).addTo(this.map);
	    L.control.scale({ position: "bottomleft"}).addTo(this.map);

	    var tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(this.map);
		this.setState({ tilelayer: tileLayer });
	},

	render: function() {
		return (
			<div id="mapUI">
				<Popup />
				<div id="map"></div>
			</div>
		);
	}

});


export default Map;
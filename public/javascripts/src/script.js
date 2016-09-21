
$(document).ready(function(){
	$('body').on('click','a[href^="#"]',function(event){
	    var target_offset = $(this.hash).offset() ? $(this.hash).offset().top : 0;     
	    var customoffset = 45;
	    $('html, body').animate({scrollTop:target_offset - customoffset}, 500);
	});




	console.log("map: ", map.getZoom());
	// map.on('click', function() {
	// 	var currentZoom = map.getZoom();
	// 	console.log(currentZoom);
	// });

	function getAllMarkers() {
    
	    var allMarkersObjArray = [];//new Array();
	    var allMarkersGeoJsonArray = [];//new Array();

	    $.each(map._layers, function (ml) {
	        //console.log(map._layers)
	        if (map._layers[ml].feature) {
	            
	            allMarkersObjArray.push(this)
				allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()))
	        }
	    })
	    console.log(allMarkersObjArray);
	}

});
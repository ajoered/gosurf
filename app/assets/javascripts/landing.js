$(document).on('turbolinks:load', initialize);

function initialize() {
	$('#search_button').on('click', fetchTrips);
}

function fetchTrips(event) {
	event.preventDefault();
	$('.map_area').css('visibility', 'visible');
  var country = {country: $('#country').val()};

  $.ajax({
    type: "POST",
    url: "/search",
    data: country,
    success: getLatLng,
    error: handleError
  });
}

function getLatLng(response){
  var tripsArray = response;//assign response to variable
  var geocoder   = new google.maps.Geocoder();
	var countryCoordinatesArray = [];

	tripsArray.forEach(function(trip) {//loop over trip array
		console.log(trip);
		var tripCoordinates = { //create empty object to be pushed into empty array
			origin: null,
			destination: null
		};
		geocoder.geocode( { //get origin coordinates for trip
	    'address': trip.origin},
	    function(results, status) {
				var myLatLngOrigin;
	      if (status == google.maps.GeocoderStatus.OK) {
					tripCoordinates.origin = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()} //assign result to tripCoordinates
	      } else {
	        alert("Something got wrong " + status);
	      }
	  });

		geocoder.geocode( { //get origin coordinates for trip
			'address': trip.destination},
			function(results, status) {
				var myLatLngDestination;
				if (status == google.maps.GeocoderStatus.OK) {
					tripCoordinates.destination = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()} //assign result to tripCoordinates
				} else {
					alert("Something got wrong " + status);
				}
		});
		countryCoordinatesArray.push(tripCoordinates) //push result into array
		console.log("geocoder", countryCoordinatesArray)
	});
	initMap(countryCoordinatesArray)
};

function initMap(coordinateArray) {
	console.log("initmap", coordinateArray);
	var tripCoordinateArray = coordinateArray
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: tripCoordinateArray[0].origin
  });

	tripCoordinateArray.forEach(function(trip) {
		var flightPlanCoordinates = [];

		flightPlanCoordinates.unshift(trip.destination);
		flightPlanCoordinates.push(trip.origin);


	  var flightPath = new google.maps.Polyline({
	    path: flightPlanCoordinates,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h1 id="firstHeading" class="firstHeading">Surf Trip</h1>'+
			'<div id="bodyContent">'+
			'<p><b>Generic Surftrip</b>'
			'</div>'+
			'</div>';

		var marker = new google.maps.Marker({
	    position: trip.destination,
	    map: map,
			title: 'Surftrip'
	  });
		marker.addListener('click', function() {
		infowindow.open(map, marker);
		});

	  flightPath.setMap(map);
	});
}

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

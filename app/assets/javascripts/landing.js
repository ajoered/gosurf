$(document).on('turbolinks:load', initialize);

function initialize() {
	$('#search_button').on('click', fetchTrips);
}

function fetchTrips(event) {
	event.preventDefault();
	$('.map-area').css('visibility', 'visible');
  var country = {country: $('#country').val()};

  $.ajax({
    type: "POST",
    url: "/api/search",
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
		var origin = new Promise(function (resolve, reject) {//Promise1
			geocoder.geocode( { //get origin coordinates for trip
		    'address': trip.origin},
		    function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var latLng = {
							lat: results[0].geometry.location.lat(),
							lng: results[0].geometry.location.lng(),
						};

						resolve(latLng);
					} else {
						reject(status);
					}
		  });
		});

		var destination = new Promise(function (resolve, reject) {//save in a promise
			geocoder.geocode( { //get origin coordinates for trip
		    'address': trip.destination},
		    function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var latLng = {
							lat: results[0].geometry.location.lat(),
							lng: results[0].geometry.location.lng(),
						};

						resolve(latLng);
					} else {
						reject(status);
					}
		  });
		});

		Promise.all([
			origin,//promise 1
			destination//promise 2
		]).then(function([origin, destination]) {
			var tripCoordinates = {
				origin: origin,
				destination: destination
			};
			countryCoordinatesArray.push(tripCoordinates);
			initMap(countryCoordinatesArray);
		}).catch(function (error) {
			console.log("Promise error", error);
		});
	});
};

function initMap(coordinateArray) {
	console.log("mooooc");
	// console.log("initmap", tripCoordinateArray);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: coordinateArray[0].origin
  });

	coordinateArray.forEach(function(trip) {
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

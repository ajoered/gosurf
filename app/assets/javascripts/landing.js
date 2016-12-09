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
  var tripsArray = response;
  var geocoder   = new google.maps.Geocoder();
	var myLatLngOriginDestination = [];

	geocoder.geocode( { //get origin coordinates
    'address': tripsArray[0].origin},
    function(results, status) {
			var myLatLngOrigin;
      if (status == google.maps.GeocoderStatus.OK) {
				myLatLngOrigin = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
      } else {
        alert("Something got wrong " + status);
      }
			myLatLngOriginDestination.push(myLatLngOrigin)
  });

	geocoder.geocode( { //get destination coordinates
		'address': tripsArray[0].destination},
		function(results, status) {
			var myLatLngDestination;
			if (status == google.maps.GeocoderStatus.OK) {
				myLatLngDestination = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
			} else {
				alert("Something got wrong " + status);
			}
			myLatLngOriginDestination.push(myLatLngDestination)
			console.log(myLatLngOriginDestination);
			initMap(myLatLngOriginDestination); //init map with array of origin and dest.
	});
};


function initMap(positions) {
	var myLatLng = positions;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: myLatLng
  });

  var flightPlanCoordinates = [
    {lat: -27.467, lng: 153.027}
  ];

	if (myLatLng) {
		flightPlanCoordinates.unshift(myLatLng);
	}

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
    position: myLatLng,
    map: map,
		title: 'Surftrip'
  });
	marker.addListener('click', function() {
	infowindow.open(map, marker);
	});

  flightPath.setMap(map);
}

function updateMap(response) {
  var tripArray = response
  tripArray.forEach(function (trip){
		console.log(trip)
  });
};

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

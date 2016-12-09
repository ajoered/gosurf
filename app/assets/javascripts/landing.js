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
  geocoder.geocode( {
    'address': tripsArray[0].origin},
    function(results, status) {
      var position = [];
			var myLatLng;
      if (status == google.maps.GeocoderStatus.OK) {
        position[0] = results[0].geometry.location.lat();
        position[1] = results[0].geometry.location.lng();
				myLatLng = {lat: position[0], lng: position[1]}
      } else {
        alert("Something got wrong " + status);
      }

		
      initMap(myLatLng);
  });
};


function initMap(position) {
	var myLatLng = position;

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

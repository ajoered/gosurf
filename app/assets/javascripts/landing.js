$(document).on('turbolinks:load', initialize);

function initialize() {
	$('#search_button').on('click', fetchTrips);
}

function initMap(position) {
	console.log(position)
  var myLatLng = position;

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: myLatLng
  });

	var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1 id="firstHeading" class="firstHeading">Surf Trip</h1>'+
		'<div id="bodyContent">'+
		'<p><b>Generic Surftrip</b>'
		'</div>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
		title: 'Surftrip'
  });
	marker.addListener('click', function() {
	infowindow.open(map, marker);
	});

};

function fetchTrips(event) {
	event.preventDefault();
	initMap();
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

function updateMap(response) {
  var tripArray = response
  tripArray.forEach(function (trip){
		console.log(trip)
  });
};

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

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

function scrollDown () {
		window.scrollBy(0, 100);
	}

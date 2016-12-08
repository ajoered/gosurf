$(document).on('ready', initialize);
$(document).on('turbolinks:load', initialize);

function initialize() {
	$('#search_button').on('click', fetchTrips);
}

function initMap() {
  var myLatLng = {lat: 40.468, lng: -3.652};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLng
  });

	var marker = new google.maps.Marker({
    position: {lat: 40.468, lng: -3.652},
    map: map
  });
};

function fetchTrips(event) {
	event.preventDefault();
	$('.map_area').css('visibility', 'visible');
	initMap();
  var country = {country: $('#country').val()};

  $.ajax({
    type: "POST",
    url: "/search",
    data: country,
    success: updateMap,
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
      if (status == google.maps.GeocoderStatus.OK) {
        position[0] = results[0].geometry.location.lat();
        position[1] = results[0].geometry.location.lng();
      } else {
        alert("Something got wrong " + status);
      }
      return position;
  });
  console.log(geocoder);
};

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

function scrollDown () {
		window.scrollBy(0, 100);
	}

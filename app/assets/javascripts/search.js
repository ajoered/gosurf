$(document).on('ready', function (){
	$('#search_button').on('click', fetchTrips);
});

function fetchTrips(event) {
  event.preventDefault();

  var country = {country: $('#country').val()};

  $.ajax({
    type: "POST",
    url: "/search",
    data: country,
    success: updateResults,
    error: handleError
  });
}

function updateResults(response) {
  $('#ul li').remove();
  tripArray = response
  tripArray.forEach(function (trip){
    var html = `<li>Trip to: ${trip.origin}, Destination: ${trip.destination}<br>Details: ${trip.description}</li>`
			$('#ul').append(html);
    // var origin = trip.origin;
  	// var destination = trip.destination;
  	// var details = trip.details;
    // $('.origin').text(origin);
    // $('.destination').text(destination);
    // $('.details').text(details);
  });
};


// function initMap(response) {
//   var myLatLng = {lat: -25.363, lng: 131.044};
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: myLatLng
//   });
// };

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

// function getLatLng(response){
//   var tripsArray = response;
//   var geocoder   = new google.maps.Geocoder();
//   geocoder.geocode( {
//     'address': tripsArray[0].origin},
//     function(results, status) {
//       var position = [];
//       if (status == google.maps.GeocoderStatus.OK) {
//         position[0] = results[0].geometry.location.lat();
//         position[1] = results[0].geometry.location.lng();
//       } else {
//         alert("Something got wrong " + status);
//       }
//       return position;
//   });
//   console.log(geocoder);
// };

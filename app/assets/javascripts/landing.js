$(document).on('turbolinks:load', initialize);

function initialize() {
	$('#search_button').on('click', fetchTrips);
	$('.btn-request').on('click', createRequest);
}

function fetchTrips(event) {
	event.preventDefault();
	$('.map-area').css('visibility', 'visible');
  var country = {country: $('#country').val()};

  $.ajax({
    type: "POST",
    url: "/api/search",
    data: country,
    success: initMap,
    error: handleError
  });
}

function initMap(response) {
	var tripsArray = response;
	var centerCoordinates = {
		lat: tripsArray[0].origin_lat,
		lng: tripsArray[0].origin_lng
	};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: centerCoordinates
  });

	tripsArray.forEach(function(trip) {
		var flightPlanCoordinates = [];
		var originCoordinates = {
			lat: trip.origin_lat,
			lng: trip.origin_lng
		};
		var destinationCoordinates = {
			lat: trip.destination_lat,
			lng: trip.destination_lng
		};

		flightPlanCoordinates.unshift(originCoordinates);
		flightPlanCoordinates.push(destinationCoordinates);

	  var flightPath = new google.maps.Polyline({
	    path: flightPlanCoordinates,
	    geodesic: true,
	    strokeColor: colorTrip(trip),
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });

		var infowindow = new google.maps.InfoWindow({
			content: '<button class="btn btn-warning btn-request">Request</button>'
		});

		var marker = new google.maps.Marker({
	    position: destinationCoordinates,
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

function colorTrip(trip) {
	if (trip.level === "1") {
		return "rgb(39, 139, 31)"
	}
	else if (trip.level === "2") {
		return "rgb(230, 110, 29)"
	}
	else if (trip.level === "3") {
		return "rgb(181, 9, 9)"
	}
	else {
		return "rgb(0, 0, 0)"
	}
}

function createRequest(event) {
    console.log("he");
  var id = {id: event.toElement.id};

  $.ajax({
    type: "POST",
    url: "/requests/create",
    data: id,
    success: changeVisualElementsButton(event),
    error: handleError
  });
};

function changeVisualElementsButton(event) {
  console.log(event.currentTarget);
  $(event.currentTarget).removeClass('btn-warning');
  $(event.currentTarget).addClass('btn-success');
  $(event.currentTarget).prop('disabled', true);
  $(event.currentTarget).text('Requested!');
}


// function getLatLng(response){
//
//   var tripsArray = response;//assign response to variable
//   var geocoder   = new google.maps.Geocoder();
// 	var countryCoordinatesArray = [];
//
// 	tripsArray.forEach(function(trip) {//loop over trip array
// 		var origin = new Promise(function (resolve, reject) {//Promise1
// 			geocoder.geocode( { //get origin coordinates for trip
// 		    'address': trip.origin},
// 		    function(results, status) {
// 					if (status == google.maps.GeocoderStatus.OK) {
// 						var latLng = {
// 							lat: results[0].geometry.location.lat(),
// 							lng: results[0].geometry.location.lng(),
// 						};
//
// 						resolve(latLng);
// 					} else {
// 						reject(status);
// 					}
// 		  });
// 		});
//
// 		var destination = new Promise(function (resolve, reject) {//save in a promise
// 			geocoder.geocode( { //get origin coordinates for trip
// 		    'address': trip.destination},
// 		    function(results, status) {
// 					if (status == google.maps.GeocoderStatus.OK) {
// 						var latLng = {
// 							lat: results[0].geometry.location.lat(),
// 							lng: results[0].geometry.location.lng(),
// 						};
//
// 						resolve(latLng);
// 					} else {
// 						reject(status);
// 					}
// 		  });
// 		});
//
// 		Promise.all([
// 			origin,//promise 1
// 			destination//promise 2
// 		]).then(function([origin, destination]) {
// 			var tripCoordinates = {
// 				origin: origin,
// 				destination: destination
// 			};
// 			countryCoordinatesArray.push(tripCoordinates);
// 			initMap(countryCoordinatesArray);
// 		}).catch(function (error) {
// 			console.log("Promise error", error);
// 		});
// 	});
// };

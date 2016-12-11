$(document).on('turbolinks:load', initialize);

function initialize() {
	$('#search-button').on('click', fetchTrips);
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
	// var centerCoordinates = {
	// 	lat: tripsArray[0].origin_lat,
	// 	lng: tripsArray[0].origin_lng
	// };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: new google.maps.LatLng(tripsArray[0].origin_lat, tripsArray[0].origin_lng)
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

		var marker = new google.maps.Marker({
	    position: destinationCoordinates,
	    map: map,
			title: 'Surftrip'
	  });
		marker.addListener('click', function swalAlert() {
			swal({
			  title: 'Trip to ' + trip.destination,
			  input: 'text',
				html:
				'<div class="row created-trips">' +
		    '<div class="panel panel-default panel-primary">' +
				'<div class="panel-heading">Trip Details' +
		    '<div class="panel-body">' +
          '<p><strong>Leaving from: ' + trip.origin + '</p>' +
					'<p><strong>Kind of trip: ' + trip.kind_of_trip + '</p>' +
					'<p><strong>Level: ' + trip.level + '</p>' +
					'<p><strong>Price: ' + trip.price + '</p>' +
					'<p><strong>Departing: ' + trip.start_date + '</p>' +
					'<p><strong>Coming back: ' + trip.finish_date + '</p>' +
					'<p><strong>Empty seats: ' + trip.max_users + '</p>' +
					'<p><strong>Board Space: ' + trip.space_material + '</p>' +
					'<p><strong>Description: ' + trip.description + '</p>' +
	        '</div>' +
				'</div>' +
			'</div>',
			  showCancelButton: true,
			  confirmButtonText: 'Request',
			  showLoaderOnConfirm: true,
			  preConfirm: function (comment) {
			    return new Promise(function (resolve) {
			      setTimeout(function() {
							var tripData = {trip_id: trip.id, comment: comment};
								$.ajax({
									type: "POST",
									url: "/requests/create",
									data: tripData,
									success: function (comment){}
								});
			          resolve()
							})
			      }, 2000)
			    }
			}).then(function (comment) {
			  swal({
			    type: 'success',
			    title: 'Successfully requested to join this trip!',
			    html: 'Your message:' + comment
			  })
			})
		});
		// $('.btn-request').on('click', createRequest);
		// });

	  flightPath.setMap(map);
	});
}

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

function colorTrip(trip) {
	if (trip.level === "Beginner") {
		return "rgb(39, 139, 31)"
	}
	else if (trip.level === "Intermediate") {
		return "rgb(230, 110, 29)"
	}
	else if (trip.level === "Advanced") {
		return "rgb(181, 9, 9)"
	}
	else {
		return "rgb(0, 0, 0)"
	}
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

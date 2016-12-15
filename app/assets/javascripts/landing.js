var markerImageDestination = 'https://res.cloudinary.com/divgxbjh0/image/upload/v1481653467/logo_transparente_hsv4qb.png'
var markerImageOrigin = 'https://res.cloudinary.com/drzsplf7y/image/upload/v1481805182/azul_h4qznj.png'
var searchResult;

$(document).on('ready', initializeLanding);

function initializeLanding() {
	console.log("Landing initialize");
	$('#search-button').on('click', fetchTrips);

	var searchAutocomplete = createAutocomplete({
		input: $('.js-search-trip'),
		output: $('.js-country-trip'),
		getCountry: function (googleApiResponse) {
      var country = "";
      googleApiResponse.address_components.forEach(function (address_component) {
        if (address_component.types[0].toLowerCase() === "country") {
          country = address_component["long_name"];
        }
      });
      return country;
    }
	});
};

function createAutocomplete(options) {
	console.log("Create autocomplete");
  var input = options.input
  var output = options.output
  var getCountry = options.getCountry;
  var autocomplete = new google.maps.places.Autocomplete(input[0], {
    types: ['geocode']
  });
  autocomplete.addListener('place_changed', function fillOutput() {
    var googleApiResponse = autocomplete.getPlace();
    output.val(getCountry(googleApiResponse));
  });
};

function fetchTrips(event) {
	console.log("Fetch trips");
	event.preventDefault();
	$('.map-area').css('visibility', 'visible');

	var search_info = {
		country_origin: $('.js-country-trip').val(),
		from_date: $('.js-from-date-trip').val(),
		to_date: $('.js-to-date-trip').val()
	}

  $.ajax({
    type: "POST",
    url: "/api/search",
    data: search_info,
    success: initMap,
    error: handleError
  });
}

function initMap(response) {
	console.log("init map");
	var tripsArray = response;
	var searchLocation = $('.js-search-trip').val();
	var geocoder = new google.maps.Geocoder();

	if (tripsArray.country) { //Controller returns country name if no results

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 5
		});

		geocoder.geocode( {'address' : tripsArray.country}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	        map.fitBounds(results[0].geometry.viewport);
	    }
		});

		if (tripsArray.status === 1) {
			swal({
			  title: 'No trips in ' + tripsArray.country + ' yet!',
			  html: $('<div>')
			    .addClass('some-class')
			    .text('Someone has to be the first...'),
			  animation: false,
			  customClass: 'animated tada'
			})
		} else {
			swal({
				title: 'No trips here on these dates!',
				html: $('<div>')
					.addClass('some-class')
					.text('Try searching for other dates'),
				animation: false,
				customClass: 'animated tada'
			})
		}
	};

	geocoder.geocode( {'address' : searchLocation}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
				map.fitBounds(results[0].geometry.viewport);
		}
	});

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5
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

		var iconDestination = {
	    url: markerImageDestination,
	    scaledSize: new google.maps.Size(40, 40)
	  };

		var iconOrigin = {
			url: markerImageOrigin,
			scaledSize: new google.maps.Size(40, 40)
		};

		var markerDestination = new google.maps.Marker({
	    position: destinationCoordinates,
	    map: map,
			title: 'Surftrip',
			icon: iconDestination
	  });

		var markerOrigin = new google.maps.Marker({
			position: originCoordinates,
			map: map,
			title: 'Surftrip',
			icon: iconOrigin
		});

		markerDestination.addListener('click', swalAlert)
		markerOrigin.addListener('click', swalAlert)

	  flightPath.setMap(map);

		function swalAlert() {
			swal({
				title: 'Trip Details',
				input: 'text',
				html:
				'<div class="row panel-group panel-primary">' +
				'<div class="panel panel-primary panel-request">' +
				'<div class="panel-body panel-body-requests">' +
					'<b>From: </b>' + trip.origin + '<br>' +
					'<b>To: </b>' + trip.destination + '<br>' + '<br>' +
					'<b>Kind of trip: </b>' + trip.kind_of_trip + '<br>' +
					'<b>Level: </b>' + trip.level + '<br>' +
					'<b>Price/seat: </b>' + trip.price + '<br>' +
					'<b>Departing: </b>' + trip.start_date + '<br>' +
					'<b>Coming back: </b>' + trip.finish_date + '<br>' +
					'<b>Empty seats: </b>' + trip.max_users + '<br>' +
					'<b>Board Space: </b>' + trip.space_material + '<br>' + '<br>' +
					'<b>Description: </b>' + trip.description + '<br>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				"<p>Want to go surfing? Request to join!</p>" +
				"Send the owner a message:" +
			'</div>',
				showCancelButton: true,
				confirmButtonText: 'Send Request',
				showLoaderOnConfirm: true,
				preConfirm: function (comment) {
					return new Promise(function (resolve) {
						var tripData = {trip_id: trip.id, comment: comment};
							$.ajax({
								type: "POST",
								url: "api/requests/create",
								data: tripData,
								success: function(response){
									resolve(response);
								}
							});
						})
					}
			}).then(function (response) {
				console.log(response);
				if (response.status === 5) {
					swal({
						title: 'You have already requested to join this trip',
						type: 'warning',
						text: "",
						timer: 2000
					})
				}
				else if (response.status === 4) {
					swal({
						title: 'Trip Full!',
						type: 'warning',
						text: "Sorry but it looks like they're ready to go..",
						timer: 2000
					}).then(
						function () {},
						// handling the promise rejection
						function (dismiss) {
							if (dismiss === 'timer') {
								console.log('I was closed by the timer')
							}
						}
					)
				}
				else if (response.status === 3)
					swal({
						type: 'success',
						title: 'Successfully requested to join this trip!',
						html: 'Once accepted he will get in touch with you.'
					})
				else if (response.status === 2) {
					swal({
						title: '<u>Please Log In</u>',
						type: 'info',
						html:
							'You must be logged in to join a trip!<br><br> ' +
							'Not registered yet? ' +
							'<a href="/users/sign_up">Register</a>',
						showCloseButton: true,
						showCancelButton: true,
						confirmButtonText:
							'<a class="fa fa-thumbs-up"></a> Log In!',
						cancelButtonText:
							'<i class="fa fa-thumbs-down">Not now</i>'
					}).then(function () {
						window.location = '/users/sign_in';
					})
				} else {
					swal({
						title: 'You are the owner of this trip!',
						type: 'warning',
						text: 'We know you want to surf, but give others a chance...',
						timer: 2000
					}).then(
						function () {},
						// handling the promise rejection
						function (dismiss) {
							if (dismiss === 'timer') {
								console.log('I was closed by the timer')
							}
						}
					)
				}
			})
		};

	});
}

function handleError (error) {
    console.log(error);
    console.log("error", error.responseText);
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

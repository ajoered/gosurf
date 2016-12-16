$(document).on('ready', initializeCreate);

function initializeCreate() {
  infoTrip();
  $( ".find-trip" ).attr( 'href','/' )

  var originAutocomplete = createAutocomplete({//autocomplete for country of origin
    input: $('.js-search-origin'),
    output: $('.js-country-origin'),
    getCountry: function (place) {  //returns the country for the input
      var country = "";
      place.address_components.forEach(function (address_component) {
        if (address_component.types[0].toLowerCase() === "country") {
          country = address_component["long_name"];
        }
      });
      return country;
    }
  })

  var destinationAutocomplete = createAutocomplete({ // autocomplete for country of destination
    input: $('.js-search-destination'),
    output: $('.js-country-destination'),
    getCountry: function (googleApiResponse) { //returns the country for the input
      var country = "";
      googleApiResponse.address_components.forEach(function (address_component) {
        if (address_component.types[0].toLowerCase() === "country") {
          country = address_component["long_name"];
        }
      });
      return country;
    }
  })

	$('#create-trip-btn').on('click', createTrip);
}

function createAutocomplete(options) {
  var input = options.input;
  var output = options.output;
  var getCountry = options.getCountry;
  var autocomplete = new google.maps.places.Autocomplete(input[0], {
    types: ['geocode']
  });
  autocomplete.addListener('place_changed', function fillOutput() {
    var googleApiResponse = autocomplete.getPlace();
    output.val(getCountry(googleApiResponse));
  });
}

function createTrip(event) {
  event.preventDefault();
  const inputs = Array.from(document.querySelectorAll('input'));
  const emptyInputs = inputs.filter(function(input) {
    return input.value === "";
  });

  if (emptyInputs.length === 0) {
    var tripJson = {
      country_origin: $('#trip_country_origin').val(),
      country_destination: $('#trip_country_destination').val(),
      origin: $('#trip_origin').val(),
      destination: $('#trip_destination').val(),
      start_date: $('#trip_start_date').val(),
      finish_date: $('#trip_finish_date').val(),
      price: $('#trip_price').val(),
      level: $('#trip_level').val(),
      kind_of_trip: $('#trip_kind_of_trip').val(),
      max_users: $('#trip_max_users').val(),
      space_material: $('#trip_space_material').val(),
      description: $('#trip_description').val()
    }


  console.log(tripJson);
      $.ajax({
        type: "POST",
        url: "/trips/create",
        data: tripJson,
        success: function(response){
                  window.location = '/profile';
          console.log(response);

          }
      });
  } else {
    swal({
      title: "You're missing some details!",
      type: 'warning',
      text: "",
      timer: 1000
    })
    emptyInputs.forEach(function(e) {
      e.classList.add('red');
    });
  }

}

function infoTrip() {
	$('.js-btn-info-origin').on('click', swalAlert);
  $('.js-btn-info-dates').on('click', swalAlert);
  $('.js-btn-info-price').on('click', swalAlert);
  $('.js-btn-info-level').on('click', swalAlert);
  $('.js-btn-info-kind').on('click', swalAlert);
  $('.js-btn-info-max-users').on('click', swalAlert);
  $('.js-btn-info-material').on('click', swalAlert);

}

function swalAlert(title, body) {
  swal(
      'Info!',
      'Lots and lots of info!!',
      'question'
    );
};

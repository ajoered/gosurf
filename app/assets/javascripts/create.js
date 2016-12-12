$(document).on('ready', initialize);

function initialize() {
  var originAutocomplete = createAutocomplete({
    input: $('.js-search-origin'),
    output: $('.js-country-origin'),
    getPlace: function (place) {
      return place.address_components[place.address_components.length-1].long_name;
    }
  })

  var destinationAutocomplete = createAutocomplete({
    input: $('.js-search-destination'),
    output: $('.js-country-destination'),
    getPlace: function (place) {
      return place.address_components[place.address_components.length-1].long_name;
    }
  })

	$('#create-trip-btn').on('click', createTrip);
}


function createTrip(event) {
  event.preventDefault();
}

function createAutocomplete(options) {
  var input = options.input
  var output = options.output
  var getPlace = options.getPlace;
  var autocomplete = new google.maps.places.Autocomplete(input[0], {
    types: ['geocode']
  });

  autocomplete.addListener('place_changed', function fillCountry() {
    var place = autocomplete.getPlace();
    output.val(getPlace(place));
  });

  return autocomplete;
}

function initialize() {

var input = /** @type {!HTMLInputElement} */(
  document.getElementById('search-origin'));
  console.log(input);
var autocomplete = new google.maps.places.Autocomplete(input);
}

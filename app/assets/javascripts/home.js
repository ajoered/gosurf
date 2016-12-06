if ("geolocation" in navigator) {
  var button = $('#search_button');
  button.on('click', getLocation());
} else {
  alert("Geolocation is not available")
}

function getLocation() {
  console.log('Getting location...');
  navigator.geolocation.getCurrentPosition(onLocation, onError, options);
}

var options = {
  enableHighAccuracy: true
};

function onLocation (position) {
	var coordsLat = position.coords.latitude
	var coordsLon = position.coords.longitude
  console.log('Your latitude is ' + coordsLat);
  console.log('Your longitude is ' + coordsLon);
  document.getElementById('location').innerHTML =
  'Your position is Latitude: ' + coordsLat + ', Longitude: ' + coordsLon;
  displayMap(coordsLat, coordsLon)
}

function onError(error) {
  console.log("Getting location failed: " + error);
}

function displayMap(lat, lon) {
  var urlStart = "https://maps.googleapis.com/maps/api/staticmap?center=";
  var urlEnd = "&zoom=13&size=400x300";
  var url = urlStart + lat + "," + lon + urlEnd
  document.getElementById('map').src = url
}

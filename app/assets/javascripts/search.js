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
  console.log(response)
}

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

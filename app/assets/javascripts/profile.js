$(document).on('ready', initialize);

function initialize() {
	$('.accept-button').on('click', acceptRequest);
}

function acceptRequest(event) {
  var id = {id: event.toElement.id};

  $.ajax({
    type: "POST",
    url: "/requests/approve",
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
  $(event.currentTarget).text('Accepted!');
  $(event.currentTarget).parent().parent().css('background-color', 'rgb(234, 250, 234)');
}

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

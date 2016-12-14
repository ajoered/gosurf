$(document).on('ready', initializeProfile);

function initializeProfile() {
	$('.accept-button').on('click', acceptRequest);
}

function acceptRequest(event) {
  var id = {id: event.toElement.id};

  $.ajax({
    type: "POST",
    url: "api/requests/approve",
    data: id,
    success: function (response) {
			changeVisualElementsButton(response, event)
    },
    error: handleError
  });
};

function changeVisualElementsButton(response, event) {
	console.log(response);
	if (response.status === 4) {
		swal({
			title: 'Trip Full!',
			type: 'warning',
			text: "No more room brah...",
		})
	} else {
		swal({
			type: 'success',
			title: 'Accepted!',
			html: 'Now is a good time to get in touch!'
		})
  console.log(event);
  $(event.currentTarget).removeClass('btn-warning');
  $(event.currentTarget).addClass('btn-success');
  $(event.currentTarget).prop('disabled', true);
  $(event.currentTarget).text('Accepted!');
  $(event.currentTarget).parent().parent().css('background-color', 'rgb(234, 250, 234)');
	}
};

function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

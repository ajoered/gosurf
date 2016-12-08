$(document).on('ready', function (){
	$('.accept-button').on('click', acceptRequest);
});

function acceptRequest(event) {
  var id = {id: event.toElement.id};

  $.ajax({
    type: "POST",
    url: "/requests/approve",
    data: id,
    success: changeButtonColor(event),
    error: handleError
  });
};

function changeButtonColor(event) {
  console.log(event.currentTarget);
  $(event.currentTarget).removeClass('btn-warning');
  $(event.currentTarget).addClass('btn-success');
  $(event.currentTarget).prop('disabled', true);
  $(event.currentTarget).text('Accepted!');
  $(event.currentTarget).parent().parent().css('background-color', 'rgb(165, 199, 164)');
}



function handleError (error) {
    console.log('Error!');
    console.log(error.responseText);
};

$(document).on('ready', function (){
	$('.accept-button').on('click', acceptRequest);
});

function acceptRequest(event) {
  id = event.toElement.id;
  console.log(id);
};

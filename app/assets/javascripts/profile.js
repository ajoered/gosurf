$(document).on('ready', function (){
	$('.accept-button').on('click', acceptRequest);
});

function acceptRequest(event) {
  alert(event.id)
  console.log(event)
};

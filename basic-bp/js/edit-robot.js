$(document).ready(function(){
	$('#editName').hide();
	$('#editNameBtn').on('click',function(){
		$('#editNameBtn').hide(200);
		$('#editName').show();
	});
	$('#nameUpdated').on('click',function(){
		var newUsername = $("#newName").val()
		$('#userName').html(newUsername);
		$('#editName').hide();
		$('#editNameBtn').show();
	});
})
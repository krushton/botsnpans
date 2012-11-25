$(document).ready(function () {
	console.log($('.profileTitle').html());
	var currentBot = JSON.parse( localStorage['robot'] );
	console.log(currentBot['name']);
	if (currentBot['name']!=$('profileTitle').html()) {
		$('.profileTitle').html(currentBot['name']);
	};

	console.log(currentBot['parts']);
})
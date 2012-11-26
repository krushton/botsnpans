$(document).ready(function () {
	
	if (localStorage['robot'] && localStorage['robot']!= 'undefined') {
		var currentBot = JSON.parse( localStorage['robot'] );
		if (currentBot['name']!=$('profileTitle').html()) {
			$('.profileTitle').html(currentBot['name']);
		}
	} 

	

});
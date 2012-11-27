$(document).ready(function () {
	
	if (localStorage['robot'] && localStorage['robot']!= 'undefined') {
		console.log('voila');
		var currentBot = JSON.parse( localStorage['robot'] );
		var head = currentBot.parts[1];

		var parts = JSON.parse(localStorage['robotParts']);
		var heads = parts['heads'];
		for (var i = 0; i < heads.length; i++ ){
			if (heads[i].id == head) {
				$('#robotHead').attr('src', 'images/robot/' + heads[i].url);
			}
		}
		

		
		if (currentBot['name']!=$('#botName').html()) {
			$('#botName').html(currentBot['name']);
		}
	} 

	

});
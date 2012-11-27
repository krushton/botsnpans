$(document).ready(function(){


	/*------------------------------------ Initialization  */
	robotParts = {
		heads: [ { url: 'robot-head-silly.png', id: 1, position: 1, display:true}, 
				 {url: 'robot-head-blue.png', id:9, position:1, display:true},
				 {url: 'robot-head-dark.png', id:17, position:1, display:true }],
		arms : [ { url: 'robot-arm-right.png', id: 2, position: 2, display:true},
				 { url: 'robot-arm-left.png', id: 3, position: 4, display:true }],
		bodies: [{ url: 'Robot-body-1.png', id: 4, position: 3, display:true},
				 { url: 'Robot-body-2.png', id: 5, position: 3, display:true},
				 { url: 'Robot-body-3.png', id: 11, position: 3, display:true}],
		legs : [{ url: 'robot-legs-blue.png', id: 6, position: 5, display:true},
				 {url: 'robot-legs-hover.png', id:12, position:5, display:true},
				 {url: 'robot-legs-pink.png', id:13, position:5, display:true},
				 {url: 'robot-legs-plungers.png', id:14, position:5, display:true},
				 {url: 'robot-legs-springs.png', id:15, position:5, display:true},
				 {url: 'robot-legs-unicycle.png', id:16, position:5, display:true}],
		extras : [{ url: 'tophat.png', id: 18, position: 6, display:true}, 
				 { url: 'robot-accessories-chefHat.png', id: 8, position: 6, display:true} ]
	};

	

	defaultBot = {
		parts: [1, 2, 3, 4, 6, 10],
		name: "Chefbot"
	};

	localStorage['robot'] = localStorage['robot'] || JSON.stringify(defaultBot);
	localStorage['robotParts'] = JSON.stringify(robotParts);
	var currentBot = JSON.parse( localStorage['robot'] );
	loadRobotParts(currentBot);


	/*------------------------------------ Part switching interaction */

	$('.bodypart').live("click", function() {

		var position = $(this).data('position');
		var target = $('#target-' + position);


		target.data('id', $(this).data('id'));
		target.attr('src', $(this).attr('src'));
		target.show();

		$('.pos-' + position).find('img').removeClass('highlighted');
		$(this).addClass('highlighted');
	});

	$('#removeExtras').click(function() {
			$('#target-6').hide();
			$('#target-6').data('id', '');
	});


	/*------------------------------------ Saving bot */
		$('#saveRobot').click(function() {

			var newName = $('#nameInput').val().length >=1 ? $('#nameInput').val() : $('#userName').text();
			var newBot = { name : newName, parts : [] };

			$('.windowpart').each(function() {
				newBot.parts.push($(this).data('id'));
			});

			localStorage['robot'] = JSON.stringify(newBot);
			loadRobotParts(newBot);

			$('#nameInput').val('');
			$('#message').css('display', 'inline-block');
			setTimeout(	function() {
				$('#message').hide() }, 1500); 
		
		return false;

		});

	});



//load the user's robot from localstorage and add all the body part options to the viewer
function loadRobotParts(currentBot) {


	$('#userName').text(currentBot.name);	
	$('#partsViewer').find('img').remove();

	for (partType in robotParts) {
		$.each(robotParts[partType], function(index,val) {

			var part = generatePart(val);

			if (currentBot['parts'].indexOf(val.id) != -1) {

				var targetPart = '#target-' + val.position;
				$(targetPart).attr('src', part.attr('src'));
				$(targetPart).data('id', part.data('id'));
				$(targetPart).data('position', part.position);

				part.addClass('highlighted');
			}

			if (val.display) {
					$('.' + partType).prepend(part);
			}
			
		});
	}
}

function generatePart(part) {
	var el = $('<img src="images/robot/' + part.url + '" class="bodypart" data-id="' 
		+ part.id + '" data-position="' + part.position + '">');
	return el;
}


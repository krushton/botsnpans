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
		extras : [{url: 'nohat.png', id:10, position:6, display:false},
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
			$('#myRobot img').each(function() {

				if ($(this).data('position') == '6') {
					var placeholder = robotParts['extras'][0];
					$(this).attr({'id': 'target-' + placeholder.position, 'src':'images/robot/' + placeholder.url });

					$(this).data({'id': placeholder.id, 'position': placeholder.position});
					$(this).hide();
					$('.extras img').each(function() { $(this).removeClass('highlighted'); });
					return false;
				}
			});
	});


	/*------------------------------------ Saving bot */
		$('#saveRobot').click(function() {

			var newName = $('#nameInput').val().length >=1 ? $('#nameInput').val() : $('#userName').text();
			var newBot = { name : newName, parts : [] };

			$('#myRobot img').each(function() {
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




function loadRobotParts(currentBot) {


	$('#userName').text(currentBot.name);

	var elem = $('#myRobot');
	elem.find('img').remove();
	$('#partsViewer').find('img').remove();

	for (partType in robotParts) {
		$.each(robotParts[partType], function(index,val) {

			var part = generatePart(val);

			if (currentBot['parts'].indexOf(val.id) != -1) {

				var clone = part.clone();
				clone.attr('id', "target-" + val.position);  
				clone.removeClass('bodypart');
				clone.addClass('windowpart');
				if (!val.display) {
					clone.css('display', 'none');
				}
				$('#myRobot').append(clone);
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


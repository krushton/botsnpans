$(document).ready(function(){


	/*------------------------------------ Initialization  */
	robotParts = {
		heads: [ { url: 'head.png', id: 1, position: 1, display:true}, 
				 {url: 'headsquare.png', id:9, position:1, display:true }],
		arms : [ { url: 'rightarm.png', id: 2, position: 2, display:true},
				 { url: 'leftarm.png', id: 3, position: 4, display:true }],
		bodies: [{ url: 'body.png', id: 4, position: 3, display:true},
				 { url: 'bodydecor.png', id: 5, position: 3, display:true}],
		legs : [{ url: 'legs.png', id: 6, position: 5, display:true},
				 {url: 'legswheel.png', id:7, position:5, display:true}],
		extras : [{url: 'nohat.png', id:10, position:6, display:false},
				 { url: 'hat.png', id: 8, position: 6, display:true} ]
	};

	defaultBot = {
		parts: [1, 2, 3, 4, 6, 10],
		name: "Chefbot"
	};

	localStorage['robot'] = localStorage['robot'] || JSON.stringify(defaultBot);
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


	/*------------------------------------ Part switching interaction */
		$('#saveRobot').click(function() {

			var newName = $('#nameInput').val();

			if (newName.length < 1) {
				newName = "Chefbot";
			}
			$('#nameInput').val('');

			var newBot = {};
			newBot.name = newName;

			newBot.parts = [];
			$('#myRobot img').each(function() {
				newBot.parts.push($(this).data('id'));
			});

			localStorage['robot'] = JSON.stringify(newBot);
			console.log(localStorage['robot']);
			loadRobotParts(newBot);
		
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


$(function() {
    $( "#tabs" ).tabs();

	$('.bodypart').click(function() {
		var position = $(this).data('position');
		var target = $('#myrobot .' + position);

		target.data('id', $(this).data('id'));
		target.attr('src', $(this).attr('src'));
		
		$('div .pos-' + position).find('img').removeClass('highlight');
		$(this).addClass('highlight');
	});

});


$(function() {
        $( "#tabs" ).tabs();

	$('.bodypart').click(function() {
		var position = $(this).data('position');
		console.log(position);
		var target = $('#myrobot .' + position);
		console.log(target);
		target.data('id', $(this).data('id'));
		console.log(target);
		target.attr('src', $(this).attr('src'));
		$('div .pos-' + position).find('img').removeClass('highlight');
		$(this).addClass('highlight');
	});

});


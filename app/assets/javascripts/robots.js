$(function() {
        $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );


	$('.bodypart').click(function() {
		var position = $(this).data('position');
		var target = $('#myrobot .' + position);
		target.data('id', $(this).data('id'));
		target.attr('src', $(this).attr('src'));
		console.log('.pos-' + position);
		$('div .pos-' + position).find('img').removeClass('highlight');
		$(this).addClass('highlight');
	});
    });


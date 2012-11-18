$(document).ready(function() {
	$( ".accordion" ).accordion({
    	collapsible: true,
    	heightStyle: "fill",
    });

      $( '#modalIntro' ).dialog({
            modal: true,
            width: '800px',
            buttons: {
                Play: function() {
                    $( this ).dialog( 'close' );
                }
            }
        });

});

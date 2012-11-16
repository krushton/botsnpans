
$(document).ready(function() {
    $( "#accordion" ).accordion({
    	//collapsible: true
    });
});

$(function() {
        $( "#modalIntro" ).dialog({
            modal: true,
            width: '400px',
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    });
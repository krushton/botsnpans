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
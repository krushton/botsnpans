
$(document).ready(function() {
    $( '#accordion' ).accordion({
    	//collapsible: true
    });

      $( '#modalIntro' ).dialog({
            modal: true,
            width: '400px',
            buttons: {
                Play: function() {
                    $( this ).dialog( 'close' );
                }
            }
        });

     $('.item').draggable();
     $('#workspace').droppable();
     $('#serve').droppable({
        drop: function(event,ui) {
            var creation = $(ui.draggable).attr('id');
            var goal = $('#final_state').text();
            if (creation == goal) {
                alert('you won!');
            }
            else {
                alert('not right :(');
            }
        }
     });
     $('.item').droppable({
        'accepts' : '.item',
        drop : function(event, ui) {
            console.log('fire');
            var first = $(ui.draggable).attr('id');
            var second = $(this).attr('id');
            $.ajax({
                url : '/states/combine',
                data : { 'first': first, 'second': second },
                format : 'json',
                success : function(data) {
                    if (data.length > 0) {
                        var src = data[0].image_url;
                        $('#' + first).remove();
                        $('#' + second).attr({'src': '/assets/' + data[0].image_url, 'id' : data[0].id});
                    } 
                }


            });
        }
     })

});




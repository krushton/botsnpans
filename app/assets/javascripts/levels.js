
$(document).ready(function() {
    $( '#accordion' ).accordion({
    	collapsible: true,
        heightStyle: "fill"
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

     $('.item').draggable({
     });

     $('.item').droppable({
        accepts : '.item',
        greedy : true,
        drop : function(event, ui) {
            var first = $(ui.draggable).attr('id');
            var second = $(this).attr('id');
            console.log(first + " " + second);
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
     });

     $('.dropbox').droppable({
        accepts : '.item' });
     /*
        drop: function(event,ui) {
            var id = $(ui.draggable).attr('id');
            if (id.indexOf('clone') < 0) {
                 ui.helper.clone()
                 .attr('id', id + "-clone")
                 .removeClass('ui-draggable-dragging')
                 .appendTo($(this))
                 .draggable()
                 .droppable({accepts: '.item', greedy: true});
            }
        }
     });
*/
     $('#serve').droppable({
        accepts : 'item',
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


      $( "#stovecontrol" ).buttonset();
      $( "#ovencontrol" ).buttonset();

      $( ".controls").change(function() {
            if ( $(this).children(':checked').val() == "on" ) {

                var item = $(this).parent().find('.item');

                if (item.length == 1) {

                    $.ajax({
                        url: '/states/heat',
                        data: { id : item.attr('id')},
                        format: 'json',
                        success: function(data) {
                          console.log('here');
                            setTimeout(function(data) {
                              $('.item').attr({'src': '/assets/' + data[0].image_url, 'id' : data[0].id});
                            }, 1000);
                            }
                        });
                    }       
                  }
           });
});




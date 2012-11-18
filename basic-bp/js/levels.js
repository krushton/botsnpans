
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


     $('.item').css('z-index', 100);

     $('.item').draggable({
        helper: 'clone'
     });

     $('.item').droppable({
        accepts : '.item',
        greedy : true,
        drop : handleDrop          
     });

     $('.dropbox').droppable({
        accepts : '.item',
        drop: function(event,ui) {
          console.log('dropped on stove');
            var id = $(ui.draggable).attr('id');
            if (id.indexOf('clone') < 0) {
                 var elem = ui.helper.clone()
                 .attr('id', id + "-clone")
                 .removeClass('ui-draggable-dragging')
                 .css({'left': 0, "z-index": 99})
                 .draggable()
                 .droppable({accepts: '.item', greedy: true, drop: handleDrop});
                 $(this).append(elem);
            }
        }
     });

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


     function handleDrop(event, ui) {
            var first = $(ui.draggable).attr('id');
            var second = $(this).attr('id');

            console.log(first + " " + second);
            $.ajax({
                url : '/states/combine',
                data : { 'first': stripClone(first), 'second': stripClone(second) },
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

      $( "#stovecontrol" ).buttonset();
      $( "#ovencontrol" ).buttonset();

      $( ".controls").change(function() {
            if ( $(this).children(':checked').val() == "on" ) {

                var items = $(this).parent().find('.item');

                if (items != "undefined" && items.length == 1) {
                    console.log('hi');
                    $.ajax({
                        url: '/states/heat',
                        data: { id : items.attr('id')},
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

function stripClone(name) {
  var index = name.indexOf('-');
  if ( index >= 0 ) {
    return name[0,index-1]
  }
  else {
    return name
  }
}


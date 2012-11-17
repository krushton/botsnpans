
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
        helper: 'clone',
        cursorAt: {left: 115},

     });

     $('.item').each(function() {
        addDroppableToItem($(this));
        addDraggableToItem($(this));
     });
     
     function addDraggableToItem(elem) {

         elem.draggable({
            helper: 'clone',
            cursorAt: {left: 115},
      });
     }

     function addDroppableToItem(elem) {

        elem.droppable({
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
                        $('#' + second).attr({'src': '/assets/' + data[0].image_url, 'id' : data[0].id});
                    } 
                }
            });           
        }
     });

     }

     $('.dropbox').droppable({
        accepts : '.item',
        drop: function(event,ui) {
            var id = $(ui.draggable).attr('id');
            if (id.indexOf('clone') < 0) {
                 var elem = ui.helper.clone()
                 .attr('id', id + "-clone")
                 .removeClass('ui-draggable-dragging');

                 addDroppableToItem(elem);
                 addDraggableToItem(elem);
                 elem.appendTo($(this));

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


});




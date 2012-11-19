$(document).ready(function() {
	

states = [ 
     { url : 'water.jpg', id : 1, type : 'ingredient', parents: [0,0]},
     { url : 'ramen.jpg', id : 2, type : 'ingredient', parents: [0,0]},
     { url : 'pot.jpg', id : 3, type : 'tool',  parents: [0,0]},
     { url : 'heat.jpg', id : 4, type : 'transition',  parents: [0,0]},
     { url : 'potwithwater.jpg', id: 5, type : 'transition', parents: [1, 3] },
     { url : 'boilingwater.jpg', id: 6, type : 'transition', parents: [4, 5] },
     { url : 'rameninpot.jpg', id: 7, type : 'transition', parents: [6, 2] },
     { url : 'rameninbowl.jpg', id: 8, type: 'transition', parents: [7, 9], last: true},
     { url: 'bowl.jpg', id : 9, type: 'tool', parents: [0,0]}
];


      loadStates();


     $('.item').css('z-index', 100);

     $('.item').draggable({
        helper: 'clone'
     });

     $('.item').droppable({
        accepts : '.item',
        greedy : true,
        drop : function(event, ui) {
          handleDrop(event,ui);
        }         
     });

     $('.dropbox').droppable({
        accepts : '.item',
        drop: function(event,ui) {
            var id = $(ui.draggable).attr('id');
            if (id.indexOf('clone') < 0 && $(this).find('#' + id).length == 0) {
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

     $('#serve').click(function() {

        for (var i = 0; i < states.length; i++ ){
          if (states[i].last) 
          {
            var finalId = states[i].id;
          }
        }
            $('.item').each(function() {
            if (parseInt(stripClone($(this).attr('id'))) == finalId) {
              $('#botSpace').append($(this));
            }
        });
     });


      $( "#stovecontrol" ).buttonset();
      $( "#ovencontrol" ).buttonset();

      $( ".controls").change(function() {
            if ( $(this).children(':checked').val() == "on" ) {

                var item = $(this).parent().find('.item');

                if (item != "undefined" && item.length == 1) {
                  var id = parseInt(item.attr('id'));
                   for (var i =0; i < states.length; i++) {
                    if (states[i].parents.indexOf(id) >= 0 && states[i].parents.indexOf(4) >= 0) {
                           $('#' + id).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id});
                           break;
                    }

                   }
                }

              }
    });
});


function handleDrop(event, ui) {
            var first = $(ui.draggable).attr('id');
            var second = $(this).attr('id');
            console.log(first + " " + second);

            for (var i=0; i < states.length; i++) {
                var intone = parseInt(stripClone(first));
                var inttwo = parseInt(stripClone(second));

              if (states[i].parents.indexOf(intone) >= 0 && states[i].parents.indexOf(inttwo) >= 0) {
                $('#' + first).remove();
                $('#' + second).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id});
                break;
              }
            
            }
      }

function stripClone(name) {
  var index = name.indexOf('-');
  if ( index >= 0 ) {
    return name[0,index-1]
  }
  else {
    return name
  }
}



function loadStates() {
	      for (var i = 0; i < states.length; i++ ){
      	if (states[i].type == 'ingredient') {
      		$('#ingredients').append('<img class="item" src="' + 'images/items/' + states[i].url + '" id="' + states[i].id + '">');
      	} 
      	if (states[i].type == 'tool') {
      		$('#tools').append('<img class="item" src="'  + 'images/items/' + states[i].url + '" id="' + states[i].id + '">');
      	}
      }
}
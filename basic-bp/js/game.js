$(document).ready(function() {
      	
      levels = {
      "Tutorial" : [ 
           { url : 'water.jpg', id : 1, type : 'ingredient', parents: [0,0]},
           { url : 'pot.jpg', id : 2, type : 'tool',  parents: [0,0]},
           { url : 'cake.jpg', id : 3, type : 'ingredient',  parents: [0,0], last: true},
           { url: 'bowl.jpg', id : 4, type: 'tool', parents: [0,0]},
           { url : 'potwithwater.jpg', id : 5, type : 'transition',  parents: [1,2]}
      ],
      "Ramen" : [ 
           { url : 'water.jpg', id : 1, type : 'ingredient', parents: [0,0]},
           { url : 'ramen.jpg', id : 2, type : 'ingredient', parents: [0,0]},
           { url : 'pot.jpg', id : 3, type : 'tool',  parents: [0,0]},
           { url : 'heat.jpg', id : 4, type : 'transition',  parents: [0,0]},
           { url : 'potwithwater.jpg', id: 5, type : 'transition', parents: [1, 3] },
           { url : 'boilingwater.jpg', id: 6, type : 'transition', parents: [4, 5] },
           { url : 'rameninpot.jpg', id: 7, type : 'transition', parents: [6, 2] },
           { url : 'rameninbowl.jpg', id: 8, type: 'transition', parents: [7, 9], last: true},
           { url: 'bowl.jpg', id : 9, type: 'tool', parents: [0,0]}
      ]
      };

      tutorialMessages = [{title: "Stove", message: "Put the pot on the stove.", source: '2', location: 'stoveTop'},
      {title:"Combine", message: "Put the water in the pot.", source: '1', location: '2'},
      {title: "Workspace", message: "Put the cake in the workspace.", source: '3', location: "workSpace"},
      {title: "Serve", message: "Serve the cake!", source: '3', location: "botSpace"},
      {title: "Tutorial Complete", message: "Great Job!" }]
      states = [];
      level = '';
      tutorialStep = 0;
      init();

     $('.item').css('z-index', 100);

     $('.item').draggable({
        helper: 'clone'
     });

     $('.item').droppable({
        accepts : '.item',
        greedy : true,
        drop : function(event, ui) {
          console.log(level);
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
            if (level == "Tutorial") {
                handleTutorial(id, $(this).attr('id'));
          }
          
        }
     });

     $('#serve').click(function() {

          var finalId = 0;

          for (var i = 0; i < states.length; i++ ){
            if (states[i].last) 
            {
              finalId = states[i].id;
            }
          }

          $('.item').each(function() {
              if (parseInt(stripClone($(this).attr('id'))) == finalId) {
                if (level == "Tutorial") {
                    handleTutorial($(this).attr('id'), "botSpace");
                  }
                 $('#botSpace').find('.item').remove();
                 $('#botSpace').append($(this).css('position', 'static'));

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


   for (var i=0; i < states.length; i++) {
      var intone = parseInt(stripClone(first));
      var inttwo = parseInt(stripClone(second));

    if (states[i].parents.indexOf(intone) >= 0 && states[i].parents.indexOf(inttwo) >= 0) {
        $('#' + first).remove();
        $('#' + second).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id});
        break;
      }
   }
     if (level == "Tutorial") {
            handleTutorial(stripClone(first), stripClone(second));
     }
          
 }


function handleTutorial(source, target) {
  
          if ( tutorialMessages[tutorialStep].source == source && tutorialMessages[tutorialStep].location == target  ) {
                 updateDialog( tutorialMessages[tutorialStep+1].title, tutorialMessages[tutorialStep+1].message);
                if (tutorialStep != tutorialMessages.length -1) {
                 tutorialStep++;
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



function init() {
        hash = window.location.hash;
        level = hash.substring(1,hash.length);
        console.log(level);
        $('#recipeName').text(level);
        states = levels[level];

	      for (var i = 0; i < states.length; i++ ){
      	if (states[i].type == 'ingredient') {
      		$('#ingredients').append('<img class="item" src="' + 'images/items/' + states[i].url + '" id="' + states[i].id + '">');
      	} 
      	if (states[i].type == 'tool') {
      		$('#tools').append('<img class="item" src="'  + 'images/items/' + states[i].url + '" id="' + states[i].id + '">');
      	}
      }

      if (level == 'Tutorial') {
        $('#dialog').dialog({
          autoOpen: true,
          hide: 'fold',
          title: tutorialMessages[0].title,
          width: 200,
          height:120,
          resizable: false
        });

        $('#dialog').html('<p id="message">' + tutorialMessages[0].message + '</p>');
        var closeButton = $('<span class="greenButton" style="width:40px;">OK</span>').bind("click", function() {
            $('#dialog').dialog('close');
        });
        $('#dialog').append(closeButton);

      }
}

function updateDialog(title, text) {
 $('#dialog').dialog('option','title', title)
  .find('#message').text(text);
  $('#dialog').dialog('open');
}
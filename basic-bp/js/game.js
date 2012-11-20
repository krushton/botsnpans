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
      ],
      "Pancakes" : [ 
           { url : 'pancakemix.jpg', id: 1, type: 'ingredient', parents: [0,0]},
           { url : 'bowl.jpg', id: 2, type: 'tool', parents: [0,0]},
           { url: 'flourinbowl.jpg', id: 3, type:'transition', parents: [1,2]},
           { url: 'water.jpg', id: 4, type: 'ingredient', parents: [0,0]},
           { url: 'wetmix.jpg', id: 5, type:'transition', parents: [3,4]},
           { url: 'whisk.jpg', id: 14, type: 'tool', parents: [0,0]},
           { url: 'batter.jpg', id: 15, type: 'transition', parents: [5, 14]},
           { url: 'fryingpan.jpg', id: 6, type:'tool', parents: [0,0]},
           { url: 'butter.jpg', id: 7, type:'ingredient', parents: [0,0]},
           { url: 'fryingpanwithbutter.jpg', id: 8, type:'transition', parents: [6,7]},
           { url: 'heat.jpg', id: 9, type:'transition', parents: [0,0]},
           { url: 'hotskillet.jpg', id: 10, type:'transition', parents: [8,9]},
           { url: 'pancakeinpan.jpg', id: 11, type:'transition', parents: [10,5]},
           { url: 'spatula.jpg', id: 16, type:'tool', parents: [0,0]},
           { url: 'flippedpancake.jpg', id: 17, type:'transition', parents: [11,16]},
           { url: 'plate.jpg', id: 12, type:'tool', parents: [0,0]},
           { url: 'pancakeonplate.jpg', id: 13, type:'transition', parents: [17,12]},
           { url: 'syrup.jpg', id: 18, type:'ingredient', parents: [0,0]},
           { url: 'pancakestack.jpg', id: 19, type:'transition', parents: [13,18], last:true},
      ]
      };

      tutorialMessages = [
          {title: "Stove", message: "Put the pot on the stove.", source: '2', location: 'stoveTop'},
          {title:"Combine", message: "Put the water in the pot.", source: '1', location: '2'},
          {title: "Workspace", message: "Put the cake in the workspace.", source: '3', location: "workSpace"},
          {title: "Serve", message: "Serve the cake!", source: '3', location: "botSpace"},
          {title: "Tutorial Complete", message: "Great Job!" }];

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
                 .css({'left': 0, 'z-index': 99, 'top':20})
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
                  var origId = item.attr('id');
                  var id = parseInt(stripClone(item.attr('id')));

                  var heatId = parseInt(lookupHeat());

                   for (var i =0; i < states.length; i++) {

                       if (states[i].parents.indexOf(id) >= 0 && states[i].parents.indexOf(heatId) >= 0) {

                           $('#' + origId).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id});
                           break;
                        }
                   }
                }

              }
    });
});

function lookupHeat() {

  for (var i = 0; i < states.length; i++) {

    if (states[i].url.indexOf('heat') >= 0) {
      return states[i].id;
    }
  }
}

function handleDrop(event, ui) {

      var first = $(ui.draggable).attr('id');
      var second = $(this).attr('id');
      var match = false;
      var position = $(this).position();

      var intone = parseInt(stripClone(first));
      var inttwo = parseInt(stripClone(second));
      console.log(position);

       for (var i=0; i < states.length; i++) {
    
         if (states[i].parents.indexOf(intone) >= 0 && states[i].parents.indexOf(inttwo) >= 0) {
            if (first.indexOf('clone') >= 0) {
              $('#' + first).hide();
            }
            $('#' + second).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id + '-clone'});
            match = true;
            break;
          }
        }

        var id = $(ui.draggable).attr('id');

        if (!match && id.indexOf('clone') < 0 && $(this).find('#' + id).length == 0) {

            var elem = ui.helper.clone()
             .attr('id', id + "-clone")
             .removeClass('ui-draggable-dragging')
             .css({'left': 0, 'z-index': 99, 'top': 20})
             .draggable()
             .droppable({accepts: '.item', greedy: true, drop: handleDrop});

              $(this).after(elem);
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
    if (name.indexOf('-') >= 0) {
        return name.split('-')[0];
    }
    return name;
}



function init() {
        hash = window.location.hash;
        level = hash.substring(1,hash.length);

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
      $('#dialog').dialog('option','title', title).find('#message').text(text);
      $('#dialog').dialog('open');
}
$(document).ready(function() {
      
      levels = {
      "Tutorial" : [ 
           { url : 'water.png', id : 1, type : 'ingredient', parents: [0,0]},
           { url : 'saucepan.png', id : 2, type : 'tool',  parents: [0,0]},
           { url : 'cake.jpg', id : 3, type : 'ingredient',  parents: [0,0], last: true},
           { url: 'bowl.png', id : 4, type: 'tool', parents: [0,0]},
           { url : 'potwithwater.jpg', id : 5, type : 'transition',  parents: [1,2]}
      ],
      "Ramen" : [ 
           { url : 'water.png', id : 1, type : 'ingredient', parents: [0,0]},
           { url : 'ramen.png', id : 2, type : 'ingredient', parents: [0,0]},
           { url : 'saucepan.png', id : 3, type : 'tool',  parents: [0,0]},
           { url : 'heat.jpg', id : 4, type : 'transition',  parents: [0,0]},
           { url : 'potwithwater.jpg', id: 5, type : 'transition', parents: [1, 3] },
           { url : 'boilingwater.jpg', id: 6, type : 'transition', parents: [4, 5] },
           { url : 'rameninpot.jpg', id: 7, type : 'transition', parents: [6, 2] },
           { url : 'rameninbowl.jpg', id: 8, type: 'transition', parents: [7, 9], last: true},
           { url: 'bowl.png', id : 9, type: 'tool', parents: [0,0]}
      ],
      "Pancakes" : [ 
           { url : 'pancakemix.jpg', id: 1, type: 'ingredient', parents: [0,0]},
           { url : 'bowl.png', id: 2, type: 'tool', parents: [0,0]},
           { url: 'flourinbowl.jpg', id: 3, type:'transition', parents: [1,2]},
           { url: 'water.png', id: 4, type: 'ingredient', parents: [0,0]},
           { url: 'wetmix.jpg', id: 5, type:'transition', parents: [3,4]},
           { url: 'whisk.jpg', id: 14, type: 'tool', parents: [0,0]},
           { url: 'batter.jpg', id: 15, type: 'transition', parents: [5, 14]},
           { url: 'fryingpan.jpg', id: 6, type:'tool', parents: [0,0]},
           { url: 'butter.jpg', id: 7, type:'ingredient', parents: [0,0]},
           { url: 'fryingpanwithbutter.jpg', id: 8, type:'transition', parents: [6,7]},
           { url: 'heat.jpg', id: 9, type:'transition', parents: [0,0]},
           { url: 'hotskillet.jpg', id: 10, type:'transition', parents: [8,9]},
           { url: 'pancakeinpan.jpg', id: 11, type:'transition', parents: [10,15]},
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
            
                 var elem = ui.helper.clone()
                 .attr('id', (id) + "-clone")
                 .removeClass('ui-draggable-dragging')
                 .css({'left': 0, top:'-20', "z-index": 99})
                 .draggable({'helper':'clone'})
                 .droppable({accepts: '.item', greedy: true, drop: handleDrop});
                 $(this).append(elem);


            if ( id.indexOf('clone') > 0 ) { 
                $('#' + id).hide();
            }
            if (level == "Tutorial") {
                handleTutorial(id, $(this).attr('id'));
          }
          
        }
     });

     $('#levelCard').click(function() {
          $("#dialog2").dialog({width: 600, draggable:false});
          $("#dialog2").dialog('option','title', 'Recipe');
          $("#dialog2").append('<img src="' + $(this).attr('src') + '">');
          $("#dialog2").dialog('open');
     })

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
                 $('#overlordSpace').find('.item').remove();
                 $('#overlordSpace').find('img').first()
                 .attr('src', 'images/overlord/happy.png')
                 .after($(this).clone().css('position', 'static'));
                 $('#dialog').dialog({});
                 updateDialog('You win!', 'Great job :) Click "Recipe Book" to go back to the menu.');
                 return false;
              } 
          });
     });


      $( "#stovecontrol" ).buttonset();
      $( "#ovencontrol" ).buttonset();

      $( ".controls").change(function() {
            if ( $(this).children(':checked').val() == "on" ) {

                var item = $(this).parent().find('.item:visible').first();

                if (item != "undefined" && item.length == 1) {
                  var origId = item.attr('id');
                  var id = parseInt(stripClone(item.attr('id')));

                  var heatId = parseInt(lookupHeat());

                   for (var i =0; i < states.length; i++) {

                       if (states[i].parents.indexOf(id) >= 0 && states[i].parents.indexOf(heatId) >= 0) {

                           $('#' + origId).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id + '-clone'});
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

      var locFirst = states[i].parents.indexOf(intone);
      var locSecond = states[i].parents.indexOf(inttwo);

            
      if (locFirst >= 0 && locSecond >= 0 && locFirst != locSecond) {
        $('#' + second).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id + '-clone'});
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
    if (name.indexOf('-') >= 0) {
        return name.split('-')[0];
    }
    return name;
}


function lookupHeat() {

  for (var i = 0; i < states.length; i++) {

    if (states[i].url.indexOf('heat') >= 0) {
      return states[i].id;
    }
  }
}


function init() {
        hash = window.location.hash;
        level = hash.substring(1,hash.length);
        console.log(level);
        $('#recipeName').text(level);
        states = levels[level];
        $('#levelCard').src = 'images/levelcards/' + level + ".png";

        for (var i = 0; i < states.length; i++ ){
        if (states[i].type == 'ingredient') {
          $('#ingredients').append('<img class="item" src="' + 'images/items/' + states[i].url + '" id="' + states[i].id + '">');
        } 
        if (states[i].type == 'tool') {
          $('#tools').append('<img class="item" src="'  + 'images/items/' + states[i].url + '" id="' + states[i].id + '">');
        }
      }
      $('#dialog').dialog({
          autoOpen: false,
          hide: 'fold',
          width: 200,
          height:140,
          resizable: false
        });

       $('#dialog').html('<p id="message">' + tutorialMessages[0].message + '</p>');
        var closeButton = $('<span class="greenButton" style="width:40px;">OK</span>').bind("click", function() {
            $('#dialog').dialog('close');
        });
        $('#dialog').append(closeButton);

      if (level == 'Tutorial') {
        $('#dialog').dialog('option', 'title', tutorialMessages[0].title);
        $('#dialog').dialog('open');
 
      }
}

function updateDialog(title, text) {
 $('#dialog').dialog('option','title', title)
  .find('#message').text(text);
  $('#dialog').dialog('open');
}

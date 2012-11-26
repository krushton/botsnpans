$(document).ready(function() {
      


      levels = {
      "Tutorial" : [ 
           { url : 'water.png', id : 1, type : 'ingredient', parents: [0,0]},
           { url : 'saucepan.png', id : 2, type : 'tool',  parents: [0,0]},
           { url : 'cheese.jpg', id : 3, type : 'ingredient',  parents: [0,0], last: true},
           { url: 'bowl.png', id : 4, type: 'tool', parents: [0,0]},
           { url : 'saucepan-withwater.png', id : 5, type : 'transition',  parents: [1,2]},
           { url : 'saucepan-boiling.png', id: 6, type : 'transition', parents: [7, 5]},
           { url : 'heat.jpg', id : 7, type : 'transition',  parents: [0,0]}
      ],
      "Ramen" : [ 
           { url : 'water.png', id : 1, type : 'ingredient', parents: [0,0]},
           { url : 'ramen.png', id : 2, type : 'ingredient', parents: [0,0]},
           { url : 'saucepan.png', id : 3, type : 'tool',  parents: [0,0]},
           { url : 'heat.jpg', id : 4, type : 'transition',  parents: [0,0]},
           { url : 'saucepan-withwater.png', id: 5, type : 'transition', parents: [1, 3] },
           { url : 'saucepan-boiling.png', id: 6, type : 'transition', parents: [4, 5] },
           { url : 'saucepan-withramen.png', id: 7, type : 'transition', parents: [6, 2] },
           { url : 'bowl-withramen.png', id: 8, type: 'transition', parents: [7, 9], last: true},
           { url: 'bowl.png', id : 9, type: 'tool', parents: [0,0]}
      ],
      "Pancakes" : [ 
           { url : 'pancakemix.png', id: 1, type: 'ingredient', parents: [0,0]},
           { url : 'mixingbowl.png', id: 2, type: 'tool', parents: [0,0]},
           { url: 'flourinbowl.png', id: 3, type:'transition', parents: [1,2]},
           { url: 'water.png', id: 4, type: 'ingredient', parents: [0,0]},
           { url: 'wetmix.png', id: 5, type:'transition', parents: [3,4]},
           { url: 'whisk.png', id: 14, type: 'tool', parents: [0,0]},
           { url: 'batter.png', id: 15, type: 'transition', parents: [5, 14]},
           { url: 'fryingpan.png', id: 6, type:'tool', parents: [0,0]},
           { url: 'butter.png', id: 7, type:'ingredient', parents: [0,0]},
           { url: 'fryingpanwithbutter.png', id: 8, type:'transition', parents: [6,7]},
           { url: 'heat.png', id: 9, type:'transition', parents: [0,0]},
           { url: 'hotskillet.png', id: 10, type:'transition', parents: [8,9]},
           { url: 'pancakeinpan.png', id: 11, type:'transition', parents: [10,15]},
           { url: 'spatula.png', id: 16, type:'tool', parents: [0,0]},
           { url: 'flippedpancake.png', id: 17, type:'transition', parents: [11,16]},
           { url: 'plate.png', id: 12, type:'tool', parents: [0,0]},
           { url: 'pancakeonplate.png', id: 13, type:'transition', parents: [17,12]},
           { url: 'syrup.png', id: 18, type:'ingredient', parents: [0,0]},
           { url: 'pancakestack.png', id: 19, type:'transition', parents: [20,7], last:true},
           { url: 'pancakesjustsyrup.png', id: 20, type:'transition', parents: [13,18]},
      ]
      };

      tutorialMessages = [
          {title: "Stove", message: "Put the pot on the stove.", source: '2', location: 'burner'},
          {title:"Combine", message: "Put the water in the pot.", source: '1', location: '2'},
          {title: "Workspace", message: "Put the cheese in the workspace.", source: '3', location: "workSpace"},
          {title: "Serve", message: "Serve the cake!", source: '3', location: "botSpace"},
          {title: "Tutorial Complete", message: "Great Job!" }];

      states = [];
      level = '';
      isTimed = false;
      tutorialStep = 0;
      init();


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
            var numid =  parseInt(stripClone(id));

            var newPosX, newPosY = 0;

            if ( $(this).hasClass('burner') || $(this).attr('id') == 'oven') {
                newPosX = ui.offset.left - $(this).parent().parent().offset().left;
                newPosY = ui.offset.top - $(this).parent().parent().offset().top;
            } else {
                newPosX = ui.offset.left - $(this).offset().left;
                newPosY = ui.offset.top - $(this).offset().top;
            }

            var elem = ui.helper.clone()
                    .attr('id', (id) + "-clone")
                    .removeClass('ui-draggable-dragging')
                    .draggable({'helper':'clone'})
                    .droppable({accepts: '.item', greedy: true, drop: handleDrop});

                     elem.css({
                      'position': 'absolute', 
                      'left': newPosX,
                      'top' : newPosY
                   });

                    $(this).append(elem);


            if ($(this).hasClass('burner') || $(this).attr('id') == 'oven') {

                var heatId = parseInt(lookupHeat());
              
                for (var i =0; i < states.length; i++) {

                  if (states[i].parents.indexOf(numid) >= 0 && states[i].parents.indexOf(heatId) >= 0) {
                      $('#' + elem.attr('id')).attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id + '-clone'});
                  }
               }
            }

            if ( id.indexOf('clone') > 0) { 
                $('#' + id).hide();

            }

            if (level == "Tutorial") {
                var target = '';
                if ($(this).attr('id')) {
                   target = $(this).attr('id');
                } else {
                   target = $(this).attr('class').split(' ')[0];
                }
                console.log(target);
                handleTutorial(id, target);
          }
          
        }
     });

      // Restart button reloads the page
     $("#restartButton").click(function(){
        document.location.reload();
     })    

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

                $('#overlordSpace').find('.item').remove();
                $('#overlordSpace').find('img').first()
                  .attr('src', 'images/overlord/happy.png')
                  .after($(this).clone().css('position', 'static'));
                 
                updateDialog('You win!', 'Great job :) Click "Recipe Book" to go back to the menu.');
                $('.ring').css('border', '2px solid #000');

                if (isTimed) {
                    $('#timer').countdown('pause');  
                }
               return false;
          }
             $('#overlordSpace').find('img').first()
                  .attr('src', 'images/overlord/angry.png');

     });

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

      var newId = -1;

      
      if (locFirst >= 0 && locSecond >= 0 && locFirst != locSecond) {
        newId = states[i].id;
        $('#' + second).attr({'src': 'images/items/' + states[i].url, 'id' : newId + '-clone'});
        break;
      }

   }

     if (level == "Tutorial") {
            handleTutorial(stripClone(first), stripClone(second));
     }

     if ($(this).parent().hasClass('burner') || $(this).attr('id') == 'oven') {

          var heatId = parseInt(lookupHeat());
              
          for (var i =0; i < states.length; i++) {

                  if (states[i].parents.indexOf(newId) >= 0 && states[i].parents.indexOf(heatId) >= 0) {

                    setTimeout(function() {
                      $('#' + newId + '-clone').attr({'src': 'images/items/' + states[i].url, 'id' : states[i].id + '-clone'});
                    }, 500);
                    break;
                  }
           }
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
        isTimed = window.location.search.split('=')[1] === 'true';
        level = hash.substring(1,hash.length);

        $('#recipeName').text(level);
        states = levels[level];

        $('#levelCard').attr('src', 'images/levelcards/' + level + '.png');

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
          width: 300,
          height:160,
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
        if (isTimed) {

            $('#timer').countdown({
                until: '+120',
                format: 'MS',
                description: 'Time Remaining',
                onExpiry: function() {
                  updateDialog("Time's Up", "You ran out of time. The overlord is very displeased.");

                        }
            });

        }
}

function updateDialog(title, text) {

  $('#dialog').dialog('option','title', title)
  .find('#message').text(text);
  $('#dialog').dialog('open');

}

function updateOverlord() {

}

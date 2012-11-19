$(function() {
        $( "#modalIntro" ).dialog({
            modal: true,
            width: '500px',
            open : function(event, ui) {$(".ui-widget-overlay").bind('click', function(){$("#modalIntro").dialog('close'); });},
            buttons: {
                "Let's Get Cooking": function() {
                    $( this ).dialog( "close" );
                    $(this).addClass("greenButton")
                }
            },
            // create:function () {
            //     $(this).closest("#modalIntro")
            //     .find(".ui-button:first") // the first button
            //     ;
            // }
        });
    });
$(document).ready(function(){
    $('.ui-icon').hide();
    $(this).find('.ui-button').addClass("greenButton");
    $('.ui-button').on('click',function(){
        alert('test');
    }) 
    }

)
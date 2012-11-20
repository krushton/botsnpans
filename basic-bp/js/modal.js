
$(document).ready(function(){
    
    var modalSeen = localStorage['seenModal']
    if (modalSeen != "true") {
        $('#modalIntro').modal('show')
    }; 
    localStorage['seenModal'] = true;
    
})
    
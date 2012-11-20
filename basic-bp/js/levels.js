$(document).ready(function() {
 
  localStorage['user'] = localStorage['user'] || JSON.stringify({u : '', p : '', n : ''});
  user = JSON.parse(localStorage['user']);

  updatePageForSignin();

  $( ".badgeText" ).popover({
    placement: "top",
    trigger: "hover"
  }); 

  $( ".accordion" ).accordion({
    collapsible: true,
    heightStyle: "fill",
  });

  $('#signInLink').click(function() {
  	$('#modalSignIn').modal('show');
  	return false;
  });

  $('#signOutLink').click(function() {
	user.n, user.p, user.u = '';
	updatePageForSignin();
	return false;
  });

  $('#signInButton').click(function() {
  		var username = $('#inputEmail').val();
  		var pass = $('#inputPassword').val();
  		if (!username || !pass) {
  			$(this).after('<br>Please enter an email address and password.');
  		} else {
  			if (user.u != "" && (user.u && pass == user.p) ) {
  				$('#modalSignIn').modal('hide');
  				updatePageForSignin();
  			} else {
  				$(this).after('<br>Invalid user name or password.');
  			}
 
  		}
  		return false;
  });

    $('#registerButton').click(function() {
  		var username = $('#registerEmail').val();
  		var pass = $('#registerPassword').val();
  	    var name = $('#registerName').val();

  		if (!username || !pass || !name) {
  			$(this).after('<="alert">Please fill out all fields.</span>');
  		} else {
  			user = { 
  				u : username,
  				p : pass,
  				n : name
  			};
  			
  			localStorage['user'] = JSON.stringify(user);
  			updatePageForSignin();
  			$('#modalSignIn').modal('hide');

  		}
  		return false;
  });
  
});

function updatePageForSignin() {


	if (user == "" || user == "undefined" || user.u == "" || user.p == "" || user.n == "") {
		$('#profile').hide();
  		$('#profilePlaceholder').show();
  		$('#signOutLink').hide();
  		$('#signOutText').hide();
  	    $('#signInLink').show();
		return;
	}

	$('#profile').show();
  	$('#profilePlaceholder').hide();

	console.log('here');
	$('#signOutText').text('Signed in as ' + user.u + '.');
	$('#signInLink').hide();
	$('#signOutText').show();
	$('#signOutLink').show();


	console.log($('#signOutLink').is(":visible"));

}
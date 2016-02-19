'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(function(e) {
		// Prevent following the link
		e.preventDefault();

		// Get the div ID, e.g., "project3"
		var projectID = $(this).closest('.project').attr('id');
		// get rid of 'project' from the front of the id 'project3'
		var idNumber = projectID.substr('project'.length);

		// this is the URL we'll call
		var url_call = '/project/'+idNumber;

		// How to respond to the GET request
		function addProjectDetails(project_json) {
			// We need to compute a display string for the date
			// Search 'toLocaleDateString' online for more details.
			var date_obj = new Date(project_json['date']);
			var options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			var display_date = date_obj.toLocaleDateString('en-US', options);

			// compose the HTML
			var new_html =
				'<div class="project-date">'+display_date+'</div>'+
				'<div class="project-summary">'+project_json['summary']+'</div>'+
				'<button class="project-delete btn btn-default" '+
					'type="button">delete</button>';

			// get the DIV to add content to
			var details_div = $('#project' + idNumber + ' .details');
			// add the content to the DIV
			details_div.html(new_html);

			details_div.find('.project-delete').click(function(e) {
				$.post('/project/'+idNumber+'/delete', function() {
					window.location.href = '/';
				});
			});
		}

		// issue the GET request
		$.get(url_call, addProjectDetails);
	});

	$('#newProjectSubmitButton').click(function(e) {
		console.log('clicked');
		var title = $('#new-project-form #title').val();
		var image_url = $('#new-project-form #image_url').val();
		var date = $('#new-project-form #date').val();
		var summary = $('#new-project-form #summary').val();
		var json = {
			'project_title': title,
			'image_url': image_url,
			'date':  date,
			'summary': summary
		};
		$.post('/project/new', json, function() {
			window.location.href = '/'; // reload the page
		});
	});
}

function complete(id) {
	$.post('/complete', {'id': id}, function (data) {
		$('#task' + id).hide(700);
	});
}

function deleteTask(id) {
	$.post('/delete', {'id': id}, function (data) {
		window.location = "/";
	});
}

function confirmsignup() {
	if (validateEmail($("#email").val())) {
		if ($("#password").val() == "") {
			alert("You forgot to enter a password");
		} else if ($("#password").val() != $("#cpassword").val()) {
			alert("Your passwords do not match");
		} else if ($("#name").val() == "") {
			alert("You forgot to enter your name");
		} else {

			$.post('/signup', {'email': $("#email").val(), "password": $("#password").val(), "name": $("#name").val()}, function (data) {
				if (data.success) {
					console.log(data);
				} else {
					alert(data.error);
				}
			});
		}
	} else {
		alert("Please enter a valid email");
	}
}

function login() {
	if (validateEmail($("#email").val())) {
		if ($("#password").val() == "") {
			alert("You forgot to enter a password");
		} else {
			$.post('/login', {'email': $("#email").val(), "password": $("#password").val()}, function (data) {
				if (data.success) {
					console.log(data);
				} else {
					alert(data.error);
				}
			});
		}
	} else {
		alert("Please enter a valid email");
	}
}

function backtologin() {
	$(".signupfield").hide();
	$("#button2").text("sign up");
	$("#button2").attr("onclick", "signup()");
	$("#button1").text("log in");
	$("#button1").attr("onclick", "login()");
};

function signup() {
	$(".signupfield").show();
	$("#button2").text("back");
	$("#button2").attr("onclick", "backtologin()");
	$("#button1").text("sign up");
	$("#button1").attr("onclick", "confirmsignup()");
}


$(function() {
   var start = $("#mindurr").val();
   var end = $("#maxdurr").val();
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 10,
      values: [ start, end ],
      slide: function( event, ui ) {
      	if (ui.values[ 1 ] == 10) {
      		$( "#duration" ).val( ui.values[ 0 ] + " hrs - " + ui.values[ 1 ] + "+ hrs" );
      	} else {
      		$( "#duration" ).val( ui.values[ 0 ] + " hrs - " + ui.values[ 1 ] + " hrs" );
      	}
        
        $("#mindurr").val(ui.values[ 0 ]);
        $("#maxdurr").val(ui.values[ 1 ]);
      }
    });
    if (end == 10) {
       $( "#duration" ).val( $( "#slider-range" ).slider( "values", 0 ) +
      " hrs - " + $( "#slider-range" ).slider( "values", 1 ) + "+ hrs");
    } else {
      $( "#duration" ).val( $( "#slider-range" ).slider( "values", 0 ) +
      " hrs - " + $( "#slider-range" ).slider( "values", 1 ) + " hrs");
    }
  });






function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

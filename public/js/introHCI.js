'use strict';

var userInit = false;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	$("#mainArea").height( $(window).height() - 120 );
	$("#mainModal").height( $(window).height() - 20 );
	$("#mainModal").width( $(window).width() - 20 );
	$("#mainShadow").height( $(window).height());
	$("#mainShadow").width( $(window).width() );

	$( window ).resize(function() {
	  $("#mainArea").height( $(window).height() - 120 );
	  $("#mainModal").height( $(window).height() - 20 );
	  $("#mainModal").width( $(window).width() - 20 );
	  $("#mainShadow").height( $(window).height());
	  $("#mainShadow").width( $(window).width() );
	});

	
	// Create a calendar array
	function Calendar() {
  		this.timesArray = new Array();

    	for (var i = 0; i < 7; i++) {

 	    	var times = [];
    	  	for (var j = 0; j < 32; j++) {
        	times.push(0);
      		}

      		this.timesArray.push(times);

    	}

    	this.lockedTimesArray = new Array();
    	for (var i = 0; i < 7; i++) {

 	    	var times = [];
    	  	for (var j = 0; j < 32; j++) {
        	times.push(0);
      		}

      		this.lockedTimesArray.push(times);

    	}
    
	}
	var calendar = new Calendar();


	var firstDay;
	var secondDay;
	var thirdDay;
	var days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

	// initialize the calendar state
	function initCalendarState() {

		var date = new Date();
		var day = date.getDay();
		if (day > 1) {
			day = day - 1;
		} else {
			day = 6;
		}
		firstDay = day;
		secondDay = firstDay + 1;
		thirdDay = secondDay + 1;

		//set locked days on calendar times array
		for (var i = 0; i < 32; i++) {
		  for (var j = secondDay; j >= 0; j--) {
		  	calendar.lockedTimesArray[j][i] = 1;
		  }
		}

		console.log(calendar.lockedTimesArray);
		repopulateTimesData();
		repopulateLockedData();

		// setting up labels
		$("#firstDayHeader").text(days[firstDay]);
		$("#secondDayHeader").text(days[secondDay]);
		$("#thirdDayHeader").text(days[thirdDay]);

		$("#firstDayHeader1").text(days[firstDay]);
		$("#secondDayHeader1").text(days[secondDay]);
		$("#thirdDayHeader1").text(days[thirdDay]);

	}
	initCalendarState();

	// handle back and next buttons
	function shiftRightDay() {

	    var firstDaySelector = $("#firstDayHeader").text();
	    console.log(firstDaySelector + "firstDaySelector");
	    if (firstDaySelector == days[0]) {
	      $("#firstDayHeader").text(days[1]);
	      firstDay = 1;
	      $("#secondDayHeader").text(days[2]);
	      secondDay = 2;
	      $("#thirdDayHeader").text(days[3]);
	      thirdDay = 3;
	    } else if (firstDaySelector == days[1]) {
	      $("#firstDayHeader").text(days[2]);
	      firstDay = 2;
	      $("#secondDayHeader").text(days[3]);
	      secondDay = 3;
	      $("#thirdDayHeader").text(days[4]);
	      thirdDay = 4;
	    } else if (firstDaySelector == days[2]) {
	      $("#firstDayHeader").text(days[3]);
	      firstDay = 3;
	      $("#secondDayHeader").text(days[4]);
	      secondDay = 4;
	      $("#thirdDayHeader").text(days[5]);
	      thirdDay = 5;
	    } else if (firstDaySelector == days[3]) {
	      $("#firstDayHeader").text(days[4]);
	      firstDay = 4;
	      $("#secondDayHeader").text(days[5]);
	      secondDay = 5;
	      $("#thirdDayHeader").text(days[6]);
	      thirdDay = 6;
	    } 

	    var firstDaySelector1 = $("#firstDayHeader1").text();
	    console.log(firstDaySelector1 + "firstDaySelector1");
	    if (firstDaySelector1 == days[0]) {
	      $("#firstDayHeader1").text(days[1]);
	      firstDay = 1;
	      $("#secondDayHeader1").text(days[2]);
	      secondDay = 2;
	      $("#thirdDayHeader1").text(days[3]);
	      thirdDay = 3;
	    } else if (firstDaySelector1 == days[1]) {
	      $("#firstDayHeader1").text(days[2]);
	      firstDay = 2;
	      $("#secondDayHeader1").text(days[3]);
	      secondDay = 3;
	      $("#thirdDayHeader1").text(days[4]);
	      thirdDay = 4;
	    } else if (firstDaySelector1 == days[2]) {
	      $("#firstDayHeader1").text(days[3]);
	      firstDay = 3;
	      $("#secondDayHeader1").text(days[4]);
	      secondDay = 4;
	      $("#thirdDayHeader1").text(days[5]);
	      thirdDay = 5;
	    } else if (firstDaySelector1 == days[3]) {
	      $("#firstDayHeader1").text(days[4]);
	      firstDay = 4;
	      $("#secondDayHeader1").text(days[5]);
	      secondDay = 5;
	      $("#thirdDayHeader1").text(days[6]);
	      thirdDay = 6;
	    } 

	    repopulateTimesData();
	    repopulateLockedData();
	}

	function shiftLeftDay() {
	    var firstDaySelector = $("#firstDayHeader").text();
	    if (firstDaySelector == days[1]) {
	      $("#firstDayHeader").text(days[0]);
	      firstDay = 0;
	      $("#secondDayHeader").text(days[1]);
	      secondDay = 1;
	      $("#thirdDayHeader").text(days[2]);
	      thirdDay = 2;
	    } else if (firstDaySelector == days[2]) {
	      $("#firstDayHeader").text(days[1]);
	      firstDay = 1;
	      $("#secondDayHeader").text(days[2]);
	      secondDay = 2;
	      $("#thirdDayHeader").text(days[3]);
	      thirdDay = 3;
	    } else if (firstDaySelector == days[3]) {
	      $("#firstDayHeader").text(days[2]);
	      firstDay = 2;
	      $("#secondDayHeader").text(days[3]);
	      secondDay = 3;
	      $("#thirdDayHeader").text(days[4]);
	      thirdDay = 4;
	    } else if (firstDaySelector == days[4]) {
	      $("#firstDayHeader").text(days[3]);
	      firstDay = 3;
	      $("#secondDayHeader").text(days[4]);
	      secondDay = 4;
	      $("#thirdDayHeader").text(days[5]);
	      thirdDay = 5;
	    }

	    var firstDaySelector1 = $("#firstDayHeader1").text();
	    if (firstDaySelector1 == days[1]) {
	      $("#firstDayHeader1").text(days[0]);
	      firstDay = 0;
	      $("#secondDayHeader1").text(days[1]);
	      secondDay = 1;
	      $("#thirdDayHeader1").text(days[2]);
	      thirdDay = 2;
	    } else if (firstDaySelector1 == days[2]) {
	      $("#firstDayHeader1").text(days[1]);
	      firstDay = 1;
	      $("#secondDayHeader1").text(days[2]);
	      secondDay = 2;
	      $("#thirdDayHeader1").text(days[3]);
	      thirdDay = 3;
	    } else if (firstDaySelector1 == days[3]) {
	      $("#firstDayHeader1").text(days[2]);
	      firstDay = 2;
	      $("#secondDayHeader1").text(days[3]);
	      secondDay = 3;
	      $("#thirdDayHeader1").text(days[4]);
	      thirdDay = 4;
	    } else if (firstDaySelector1 == days[4]) {
	      $("#firstDayHeader1").text(days[3]);
	      firstDay = 3;
	      $("#secondDayHeader1").text(days[4]);
	      secondDay = 4;
	      $("#thirdDayHeader1").text(days[5]);
	      thirdDay = 5;
	    }
	    repopulateTimesData();
	    repopulateLockedData();
	}

	// repopulate time slots after clicking back or next
	function repopulateTimesData() {
		console.log(calendar.timesArray);

		for (var i = 0; i < 32; i++) {
			console.log("repopulate data firstDay" + firstDay);
			if (calendar.timesArray[firstDay][i] == 0) {
				$(".firstDay." + i).removeClass("freeCell");
				$(".firstDay." + i).text("");
			} else if (calendar.timesArray[firstDay][i] == 1) {
				$(".firstDay." + i).addClass("freeCell");
				$(".firstDay." + i).text("searching...");
			} 

			if (calendar.timesArray[secondDay][i] == 0) {
				$(".secondDay." + i).removeClass("freeCell");
				$(".secondDay." + i).text("");
			} else if (calendar.timesArray[secondDay][i] == 1) {
				$(".secondDay." + i).addClass("freeCell");
				$(".secondDay." + i).text("searching...");
			}

			if (calendar.timesArray[thirdDay][i] == 0) {
				$(".thirdDay." + i).removeClass("freeCell");
				$(".thirdDay." + i).text("");
			} else if (calendar.timesArray[thirdDay][i] == 1) {
				$(".thirdDay." + i).addClass("freeCell");
				$(".thirdDay." + i).text("searching");
			}
		}
	}

	// repopulate locked slots after clicking back or next
	function repopulateLockedData() {
		console.log("repopulateLockedData");
		for (var i = 0; i < 32; i++) {
			if (calendar.lockedTimesArray[firstDay][i] == 0) {
				$(".firstDay." + i).removeClass("lockedCell");
			} else {
				$(".firstDay." + i).addClass("lockedCell");
			} 

			if (calendar.lockedTimesArray[secondDay][i] == 0) {
				$(".secondDay." + i).removeClass("lockedCell");
			} else {
				$(".secondDay." + i).addClass("lockedCell");
			}

			if (calendar.lockedTimesArray[thirdDay][i] == 0) {
				$(".thirdDay." + i).removeClass("lockedCell");
			} else {
				$(".thirdDay." + i).addClass("lockedCell");
			}
		}
	}

	$(".backBtn").click(function(e) {
		shiftLeftDay();
	});
	$(".nextBtn").click(function(e) {
		shiftRightDay();
	});





	$(".mcal td").click(function(e) {
		// get day
		var day = (($(e.target)).attr("class"))
		day = day.split(' ')[0];
		if (day == "firstDay") {
			day = firstDay;
		} else if (day == "secondDay") {
			day = secondDay;
		} else {
			day = thirdDay;
		}
		console.log("getting day " + day);
		// get time
		var time = (($(e.target)).attr("class"))
		time = time.split(' ')[1];
		console.log("getting time " + time);



		var t = $(e.target);
		if (!$(e.target).hasClass("lockedCell")) {
			if (!$(e.target).hasClass("freeCell")) {
				$(e.target).text("searching...");

				// Note on calendar
				calendar.timesArray[day][time] = 1;

			} else {
				$(e.target).text("");
				// Note on calendar
				calendar.timesArray[day][time] = 0;
			}
			$(e.target).toggleClass("freeCell");
		}


		repopulateTimesData();
		repopulateLockedData();
	});
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

function profileSettings() {
	$(".whiteGreen").hide();
	$(".underSteps").hide();
	$(".underSettings").show();
	skip(1);
}

function diningLocations() {
	$(".whiteGreen").hide();
	$(".underSteps").hide();
	$(".underSettings2").show();
	skip(2);
}

function defaultWeeklyCalendar() {
	$(".whiteGreen").hide();
	$(".underSteps").hide();
	$(".underSettings4").show();
	skip(4);
}

function sendStep1(after) {
	if ($("#step1_req").is(":checked") && !$("#step1_f").is(":checked")) {
		alert("Friends needs to be checked if you require at least one friend at each meetup.");
	} else if (!$("#step1_f").is(":checked") && !$("#step1_fof").is(":checked")
			&& !$("#step1_any").is(":checked") ) {
		alert("You must select at least one group of people that you would like to eat with.");
	} else {
		$.post('/step1', {"url": $("#preview").attr("src"), "f": $("#step1_f").is(":checked"), 
				"fof": $("#step1_fof").is(":checked"), "any": $("#step1_any").is(":checked"),
				"req": $("#step1_req").is(":checked")}, function (data) {
			if (data.success) {
				if (after) {
					mains();
					page(4);
				} else {
					skip(2);
				}
				
			} else {
				alert(data.error);
			}
		});
	}
}

function sendStep2(after) {
	var obj = {};
	for (var i = 1; i < 12; i++) {
		obj["d" + i] = $("#step2_d" + i).is(":checked");
	}
	for (var i = 1; i < 16; i++) {
		obj["n" + i] = $("#step2_n" + i).is(":checked");
	}

	$.post('/step2', obj, function (data) {
		if (data.success) {
			if (after) {
				mains();
				swap(4);
			} else {
				skip(3);
			}
		} else {
			alert(data.error);
		}
	});
}

function search(id) {
	var toSearch = $("#" + id).val();
	if (toSearch == "") {
		$("#" + id + "label").show();
		$("#" + id + "label").text("Please type something in the search box.");
		$("#" + id + "append").html("");
	} else {
		$.post('/step3', {'action': 'search', "query": toSearch}, function (data) {
			if (data.success) {
				if (data.found.length == 0) {
					$("#" + id + "label").show();
					$("#" + id + "label").text("No results found.");
					$("#" + id + "append").html("");
				} else {
					$("#" + id + "append").html("");
					$("#" + id + "label").hide();
					for (var i = 0; i < data.found.length; i++) {
						var clone = $("#addTemplate").clone().removeClass("hidden");
						clone.attr("id", "consider" + data.found[i]._id);
						clone.find(".addName").text(data.found[i].name);
						clone.find(".addName").attr("onclick", "showFriend('" + data.found[i]._id + "')");
						clone.find(".addImg").attr("src", data.found[i].imageUrl);
						clone.find(".addButton").attr("onclick", "addf('" + data.found[i]._id + "')");
						$("#" + id + "append").append(clone);
					}
				}
				console.log(data.found);
			} else {
				alert(data.error);
			}
		});
	}
	
}

function addf(id) {
	$.post('/step3', {'action': 'add', "id": id}, function (data) {
		if (data.success) {
			var clone = $("#consider" + id).clone();
			clone.attr("id", "friend" + id);
			clone.find(".addButton").attr("disabled", "true");
			clone.find(".addButton").text("friends");
			$("#consider" + id).remove();
			$("#recentadded").prepend(clone);
			$("#recentaddedlabel").hide();
			populateFriends();
		} else {
			alert(data.error);
		}
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
					skip(1);
				} else {
					alert(data.error);
				}
			});
		}
	} else {
		alert("Please enter a valid email");
	}
}

function initUser(user, location) {
	userInit = true;
	populateRecents();
	$("#preview").attr("src",user.imageUrl);
	if (user.okayFriends != $("#step1_f").is(":checked")) {
		$("#step1_f").click();
	}
	if (user.okayFOF != $("#step1_fof").is(":checked")) {
		$("#step1_fof").click();
	}
	if (user.okayAny != $("#step1_any").is(":checked")) {
		$("#step1_any").click();
	}
	if (user.needFriend != $("#step1_req").is(":checked")) {
		$("#step1_req").click();
	}


	for (var i = 1; i < 12; i++) {
		if (location["d" + i] != $("#step2_d" + i).is(":checked")) {
			$("#step2_d" + i).click();
		}
	}
	for (var i = 1; i < 16; i++) {
		if (location["n" + i] != $("#step2_n" + i).is(":checked")) {
			$("#step2_n" + i).click();
		}
	}
}

function login() {
	if (validateEmail($("#email").val())) {
		if ($("#password").val() == "") {
			alert("You forgot to enter a password");
		} else {
			$.post('/login', {'email': $("#email").val(), "password": $("#password").val()}, function (data) {
				if (data.success) {
					mains();
				} else {
					alert(data.error);
				}
			});
		}
	} else {
		alert("Please enter a valid email");
	}
}

function skip(num) {
	$(".screen").hide();
	$("#step" + num + "Screen").show();
	userInit = true;
}

function mains() {
	if (!userInit) {
		$.get("/curruser", function(data) {
			if (data.success) {
				initUser(data.user, data.location);
			} else {
				alert(data.error);
			}
		});
	}
	$(".screen").hide();
	$("#mainScreen").show();
}

var ntitles = ["Recent", "Calendar", "Friends", "Settings"];
function swap(page) {
	for (var i = 1; i < 5; i++) {
		$(".nav" + i).removeClass("active");
		$("#view" + i).hide();
	}
	$(".nav" + page).addClass("active");
	$("#view" + page).show();
	$("#mTitle").text(ntitles[page - 1]);
	initPage(page);
}

function populateRecents() {
	$.get("/recent", function(data) {
		if (data.success) {
			$("#recentFeed").html("");
			for (var i = 0; i < data.recents.length; i++) {
				var d = new Date(data.recents[i].time)
				var ender = "<div class='recentCardBottom'>" + d.toLocaleTimeString() + " " + d.toLocaleDateString() + "</div>";
				if (data.recents[i].link != "") {
					$("#recentFeed").append("<a href='" + data.recents[i].link + "'><div class='recentCard clickable shadable2'>" + data.recents[i].message + "</div>" + ender + "</a>");
				} else {
					$("#recentFeed").append("<div class='recentCard'>" + data.recents[i].message + "</div>" + ender);
				}
			}
		} else {
			alert(data.error);
		}
	});
}

function populateFriends() {
	$.get("/friends", function(data) {
		if (data.success) {
			$("#myfriendslist").html("");
			if (data.friends.length > 0) {
				$("#myfriendslabel").hide();
			}
			for (var i = 0; i < data.friends.length; i++) {
				var clone = $("#addTemplate").clone().removeClass("hidden");
				clone.attr("id", "myfriend" + data.friends[i]._id);
				clone.find(".addName").text(data.friends[i].name);
				clone.find(".addName").text(data.friends[i].name);
				clone.find(".addName").attr("onclick", "showFriend('" + data.friends[i]._id + "')")
				clone.find(".addImg").attr("src", data.friends[i].imageUrl);
				clone.find(".addButton").attr("onclick", "addf('" + data.friends[i]._id + "')");
				clone.find(".addButton").attr("disabled", "true");
				clone.find(".addButton").text("friends");
				$("#myfriendslist").append(clone);
			}
		} else {
			alert(data.error);
		}
	});
}

function initPage(page) {
	if (page == 1) {
		populateRecents();
		
	} else if (page == 2) {

	} else if (page == 3) {
		populateFriends();
	} else if (page == 4) {

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


function hideModal() {
	$("#mainModal, #mainShadow").hide();
}

function showModal() {
	$("#mainModal, #mainShadow").show();
}

function showFriend(id) {
	showModal();
	$.post("/user", {"id": id}, function(data) {
		console.log(data);
		$("#modalTitle").text(data.user.name);
		$("#modalImage").attr("src", data.user.imageUrl);
	});
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



// types: 1 - walkthrough, 2 - main, 3 - default
function Calendar(id, type) {
	this.first_date;
	this.type = type;
	this.id = id;

	this.init = function () {
		// set the date
		if (this.type == 1 || this.type == 2) {

		} else {
			// start on monday, end on sunday

		}
	}
	this.init();



	$("#" + id).css("background-color", "#EEE");
}

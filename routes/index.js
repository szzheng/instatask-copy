
var models = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){

	

    if (!req.session.user) {
       res.redirect("/login");
    } else {
    	/*
    	models.User.find().exec(function(err, us) {console.log(us); res.render('index');});
    	*/
       var filters = {'owner':req.session.user._id, 'status': "in progress"};
       var ff = {};
       if (req.body.status == "completed") {
       	filters['status'] = "completed";
       	ff['stat2'] = true;
       }

       var checks = ["durre", "durrm", "durrh", "diffe", "diffm", "diffh"];
       for (var i = 0; i < checks.length; i++) {
       		if (req.body.tofilter) {
       			if (req.body[checks[i]]) { 
       				ff[checks[i]] = true;
       			}
       		} else {
       			ff[checks[i]] = true;
       		}
       }

       filters['difficulty'] = {$in: []};
       if (ff["diffe"]) {
       	  filters['difficulty']["$in"].push("easy");
       }
       if (ff["diffm"]) {
       	  filters['difficulty']["$in"].push("medium");
       }
       if (ff["diffh"]) {
       	  filters['difficulty']["$in"].push("hard");
       }
       
       models.Task
		.find(filters)
		.exec(renderTasks); 

	    function renderTasks(err, tasks) {
			console.log(tasks);

			obj = { 'tasks': tasks, 'filters': filters, 'ff': ff };

			res.render('index', obj);
		}
    }
    

	

};
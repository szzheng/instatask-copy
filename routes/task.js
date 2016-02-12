
var models = require('../models');

/*
 * GET home page.
 */

exports.addTask = function(req, res){

	if (!req.session.user) {
       res.redirect("/login");
    }

	if (req.body.title) {


		var newTask = new models.Task(
		    {
			    "title": req.body.title,
				"location": req.body.location,
				"difficulty": req.body.diff,
				"duration": req.body.duration,
			    "category": req.body.category,
			    "status": "in progress",
			    "owner": req.session.user._id

		    }
		);

		newTask.save(afterSaving);

        function afterSaving(err) {
        	if (err) {
        		console.log(err);
        	}
        	res.redirect('/');
        }
	} else {
		res.render('add');
	}
};

exports.completeTask = function(req, res) {
	console.log(req.body.id);
	models.Task.update({_id: req.body.id}, {"status": "completed"},
		function(err, data) {
			res.json(data);
		}
	);
	
}
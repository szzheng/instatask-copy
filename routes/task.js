
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


exports.editTask = function(req, res) {
	if (!req.session.user) {
       res.redirect("/login");
    }

    var taskID = req.params.id;

    if (req.body.title) {
    	models.Task.update({_id: taskID}, {
			    "title": req.body.title,
				"location": req.body.location,
				"difficulty": req.body.diff,
				"duration": req.body.duration,
			    "category": req.body.category },
			    function (err) {
			    	if (err) {
		        		console.log(err);
		        	}
		        	res.redirect('/');
			    }
		    )
    } else {
		models.Task.find({_id: taskID}).exec(callback);

	    function callback(err, task) {
	    	var obj = {task: task[0]};
	    	if (obj.task.difficulty == "easy") {
	    		obj["diffe"] = true;
	    	} else if (obj.task.difficulty == "medium") {
	    		obj["diffm"] = true;
	    	} else {
	    		obj["diffh"] = true;
	    	}
			res.render('task', obj);
	    }
    } 
    
}

exports.deleteTask = function(req, res) {
	models.Task.remove({_id: req.body.id},
		function(err, data) {
			res.json(data);
		}
	);
}

exports.viewCalendar = function(req, res) {
	res.render('calendar');
}

var models = require('../models');

/*
 * GET home page.
 */

exports.loginPage = function(req, res){
	if (req.body.email) {
        models.User.find({email: req.body.email, password: req.body.pass}).exec(afterLogin);

        function afterLogin(err, user) {
        	console.log(user);
        	if (user.length > 0) { // HOADO: PREVENT MULTIPLE USERS WITH SAME EMAIL
        		req.session.user = user[0];
        	    res.redirect('/');
        	} else {
                res.render('login', {"error": "Bad email/password combination"});
        	}
        }
	} else {
		res.render('login');
	}
	
};

exports.signupPage = function(req, res) {
    if (req.body.name) {
		var newUser = new models.User(
		    {
			    "name": req.body.name,
				"email": req.body.email,
				"password": req.body.pass,
				"categories": [],
				"locations": []
		    }
		);
		req.session.user = newUser;
		newUser.save(afterSaving);
		
        function afterSaving(err) {
        	if (err) {
        		console.log(err);
        	}
        	res.redirect('welcome');
        }
        
    } else {
    	res.render('signup');
    }
}

exports.logoutPage = function(req, res) {
	req.session.reset();
    res.render('logout');
}

exports.welcomePage = function(req, res) {
    res.render('welcome');
}
 
var models = require('../models');
var std = require("../std");
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
        	    res.json({"success": true});
        	} else {
                res.json({"error": "Bad email/password combination", "success": false});
        	}
        }
	} else {
        res.json({"error": "No information entered", "success": false});
	}
	
};

exports.signupPage = function(req, res) {
    if (req.body.name) {
        var newUser = new models.User(
            {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "imageUrl": "",
                "attendence": 0,
                "aamount": 0,
                "rating": 0,
                "ramount": 0,

                "okayFriends": true,
                "okayFOF": true,
                "okayAny": false,
                "needFriend": true
            }
        );
        models.User.find({email: req.body.email}).exec(afterCheck);

        function afterCheck(err, user) {
            if (user.length > 0) { // HOADO: PREVENT MULTIPLE USERS WITH SAME EMAIL
                res.json({'error': "This email has already been registered", "success": false});
            } else {
                req.session.user = newUser;
                newUser.save(afterSaving);
                
                function afterSaving(err) {
                    if (err) {
                        console.log(err);
                    }
                    res.json({'success': true});
                }
            }
    		
        }
        
    } else {
    	res.json({'error': "Please fill out all the fields", "success": false});
    }
}

exports.logoutPage = function(req, res) {
	req.session.reset();
    res.render('logout');
}

// Steps pipeline
exports.step1Page = function(req, res) {
    if (req.body.formsent) {
        res.redirect('step2');
    } else {
        var obj = {};
        obj["dining"] = diningNames;
        obj["nondining"] = nondiningNames;
        res.render('step1', obj);
    }
}

exports.step2Page = function(req, res) {
    if (req.body.formsent) {
        res.redirect('step3');
    } else {
        var obj = {};
        obj["dining"] = diningNames;
        obj["nondining"] = nondiningNames;
        res.render('step2', obj);
    }
    
}

exports.step3Page = function(req, res) {
    res.render('step3');
}

exports.step4Page = function(req, res) {
    res.render('step4');
}

exports.welcomePage = function(req, res) {
    res.render('welcome');
}

exports.settingsPage = function(req, res) {


    res.render('settings');
}
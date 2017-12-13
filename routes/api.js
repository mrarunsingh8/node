var express = require('express');
var router = express.Router();

var authModal = require('./modal/authModal');
var userModal = require('./modal/userModal');

router.get('/user', function(req, res, next) {
	userModal.getAllUser(function(results){
		return res.json({status: 200, error: null, rows: results.length, response: results});
	});
});

router.get('/user/:id', function(req, res, next) {
	let userId = parseInt(req.params.id);
	if(typeof userId === 'number'){
		userModal.userDetail(userId, function(results){
			return res.json({status: 200, error: null, rows: 1, response: results[0]});
		});
	}else{
		return res.json({status: 200, error: "Please provide a user id."});
	}
});



module.exports = router;
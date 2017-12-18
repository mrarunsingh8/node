var express = require('express');
var router = express.Router();

var authModal = require('./modal/authModal');
var userModal = require('./modal/userModal');
var bookModal = require('./modal/bookModal');


router.all('/user', function(req, res, next) {
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

router.all('/book', function(req, res, next) {
	bookModal.getAllBook(function(results){
		return res.json({status: 200, error: null, rows: results.length, response: results});
	});
});


router.get('/book/:id', function(req, res, next) {
	let userId = parseInt(req.params.id);
	if(typeof userId === 'number'){
		bookModal.bookDetail(userId, function(results){
			return res.json({status: 200, error: null, rows: 1, response: results[0]});
		});
	}else{
		return res.json({status: 200, error: "Please provide a book id."});
	}
});


module.exports = router;
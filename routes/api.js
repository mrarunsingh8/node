var express = require('express');
var router = express.Router();

var authModal = require('./modal/authModal');
var userModal = require('./modal/userModal');
var bookModal = require('./modal/bookModal');


router.get('/user', function(req, res, next) {
	userModal.getAllUser().then(function(results){
		return res.json({status: 200, error: null, rows: results.length, response: results});
	}).catch(function (reason) {
	    throw reason;
    });
});

router.get('/user/:id', function(req, res, next) {
	let userId = parseInt(req.params.id);
	if(typeof userId === 'number'){
		userModal.userDetail(userId).then(function(results){
			return res.json({status: 200, error: null, rows: 1, response: results[0]});
		}).catch(function (reason) {
		    throw reason;
        });
	}else{
		return res.json({status: 200, error: "Please provide a user id."});
	}
});

router.post('/user', function(req, res, next) {
    userModal.AddNewUser(req.body).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.put('/user', function (req, res, next) {
    userModal.AddNewUser(req.body).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.put('/user/:id', function(req, res, next) {
    let userId = parseInt(req.params.id);
    userModal.UpdateUser(req.body, userId).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.patch('/user/:id', function(req, res, next) {
    let userId = parseInt(req.params.id);
    userModal.UpdateUser(req.body, userId).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.delete('/user/:id', function(req, res, next) {
    let userId = parseInt(req.params.id);
    userModal.DeleteUser(userId).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.get('/book', function(req, res, next) {
    bookModal.getAllBook().then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.get('/book/:id', function(req, res, next) {
	let bookId = parseInt(req.params.id);
	if(typeof bookId === 'number'){
	    bookModal.bookDetail(bookId).then(function(result){
            return res.json({status: 200, error: null, rows: 1, response: result[0]});
        }).catch(function(err){
            throw err;
        });
	}else{
		return res.json({status: 200, error: "Please provide a book id."});
	}
});

router.post('/book', function(req, res, next) {
    bookModal.AddNewBook(req.body).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.put('/book', function(req, res, next) {
    bookModal.AddNewBook(req.body).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.put('/book/:id', function(req, res, next) {
    let bookId = parseInt(req.params.id);
    bookModal.UpdateBook(req.body, bookId).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.patch('/book/:id', function(req, res, next) {
    let bookId = parseInt(req.params.id);
    bookModal.UpdateBook(req.body, bookId).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});

router.delete('/book/:id', function(req, res, next) {
    let bookId = parseInt(req.params.id);
    bookModal.DeleteBook(bookId).then(function (results) {
        return res.json({status: 200, error: null, rows: results.length, response: results});
    }).catch(function (reason) {
        throw reason;
    });
});


module.exports = router;
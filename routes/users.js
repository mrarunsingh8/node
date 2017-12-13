var express = require('express');
var router = express.Router();

var userModal = require('./modal/userModal');



/* GET users listing. */
/*http://localhost:3000/users*/
router.get('/', function(req, res, next) {
  userModal.getAllUser(function(err, rows, fields){
  	res.json(rows);
  });
});



module.exports = router;
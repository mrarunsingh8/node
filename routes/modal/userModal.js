var db = require('../../bin/mysql-db');

let userModal = {
	getAllUser:function(callback){
		db.query('SELECT * from user ', function(err, rows, fields) {
		  if (err) throw err;
		  callback(rows, fields);
		});
	},
	userDetail:function(userId, callback){
		db.query('SELECT * FROM user WHERE id="'+userId+'"', function(err, rows, fields){
			if(err) throw err;
			callback(rows);
		});
	},
}

module.exports = userModal;
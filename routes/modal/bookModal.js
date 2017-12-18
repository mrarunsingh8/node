var db = require('../../bin/mysql-db');

let bookModal = {
	getAllBook:function(callback){
		db.query('SELECT * from book limit 0,50', function(err, rows, fields) {
		  if (err) throw err;
		  callback(rows, fields);
		});
	},
	bookDetail:function(userId, callback){
		db.query('SELECT * FROM book WHERE id="'+userId+'"', function(err, rows, fields){
			if(err) throw err;
			callback(rows);
		});
	},
}

module.exports = bookModal;
var db = require('../../bin/mysql-db');

let userModal = {
	getAllUser:function(){
		return new Promise(function (resolve, reject) {
            db.query('SELECT * from user limit 0,50', function(err, rows, fields) {
                if (err) reject(err);
                resolve(rows, fields);
            });
        })
	},
	userDetail:function(userId){
		return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM user WHERE id="'+userId+'"', function(err, rows, fields){
                if(err) reject(err);
                resolve(rows);
            });
        });
	},

    AddNewUser: function (userData) {
        return new Promise(function (resolve, reject) {
            db.query('INSERT INTO user SET name="'+userData.name+'", email="'+userData.email+'", username="'+userData.username+'", password="'+userData.password+'", contact="'+userData.contact+'" ', function(err, rows){
                if(err) reject(err);
                resolve({affectedRows: rows.affectedRows, insertId:rows.insertId});
            });
        });
    },

    UpdateUser: function (userData, userId) {
        return new Promise(function (resolve, reject) {
            db.query('UPDATE user SET name="'+userData.name+'", email="'+userData.email+'", username="'+userData.username+'", password="'+userData.password+'", contact="'+userData.contact+'" WHERE id="'+userId+'" ', function(err, rows){
                if(err) reject(err);
                resolve({affectedRows: rows.affectedRows, updateId:userId});
            });
        });
    },

    DeleteUser: function (userId) {
        return new Promise(function (resolve, reject) {
            db.query('DELETE FROM user  WHERE id="'+userId+'" ', function(err, rows){
                if(err) reject(err);
                resolve({affectedRows: rows.affectedRows, deletedId:userId});
            });
        });
    }
}

module.exports = userModal;
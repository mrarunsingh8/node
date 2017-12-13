var jwt =  require('jsonwebtoken');
var db  =  require('../../bin/mysql-db');

let authModal = {
	isExistUsername:function(username, callback){
		db.query(" SELECT * FROM user WHERE username='"+username+"' ", function(err, rows, fields){
			if (err) throw err;
			if(rows.length){
				callback(true);
			}else{
				callback(false);
			}			
		});
	},
	isExistUsernamePassword:function(data, callback){
		db.query(" SELECT * FROM user WHERE username='"+data.username+"' AND password='"+data.password+"' ", function(err, rows, fields){
			if (err) throw err;
			if(rows.length){
				callback({success:true, data:rows[0]});
			}else{
				callback({success:false, data:{}});
			}			
		});
	},
	setNewToken:function(userId, token){
		if(token != null){
			db.query('UPDATE user SET token="'+token+'" WHERE id="'+userId+'" ' , function(err, rows, fields){
				if(err) throw err;
				console.log("Rows: -> ", rows);
				console.log("Fields: -> ", fields);
			});
		}
	},
	isAuthenticateUser:function(data, callback){
		let self = this;
		this.isExistUsername(data.username, function(isExistUser){
			if(isExistUser){
				self.isExistUsernamePassword(data, function(result){
					if(result.success){	
						let token=null;
						if(result.data.token.length > 10){
							token = result.data.token;
						}else{
							token=jwt.sign({username:result.data.username},process.env.SECRET_KEY,{
			                    expiresIn:5000
			                });
							self.setNewToken(result.data.id, token);
						}
						callback({success:true,token:token});
					}else{
						let res = {success:false,message:'Authentication failed. Passwords did not match.'};
						callback(res);
					}
				});
			}else{
				let res = {success:false,message:'Authentication failed. User not found.'};
				callback(res);
			}
		});
	},
}

module.exports = authModal;
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
	getDateObjectToDateFormate(date){
		return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	},
	setNewToken:function(userId, token, expTime){
		let self = this;
		let tokenExpTime = (typeof expTime == 'number' && expTime > 0)?expTime:5000;

		let getExpiretionTime= function(){
			let tokenExp = new Date();
			tokenExp = new Date(tokenExp.getTime()+(1000*tokenExpTime));
			return self.getDateObjectToDateFormate(tokenExp);
		}
		let tokenExpireIn = getExpiretionTime();
		if(token != null){
			db.query('UPDATE user SET token="'+token+'", tokenExpireIn="'+tokenExpireIn+'"  WHERE id="'+userId+'" ' , function(err, rows, fields){
				if(err) throw err;
			});
		}
	},
	generateNewToken:function(result){
		let tokenExpireTime = 60*60*24;
		token=jwt.sign({username:result.data.username},process.env.SECRET_KEY,{
            expiresIn: tokenExpireTime,
        });
		this.setNewToken(result.data.id, token, tokenExpireTime);
		return token;
	},
	validateToken:function(result, callback){
		let token=null;
		if(result.data.token.length > 10){
			if((new Date().getTime()) > (new Date(result.data.tokenExpireIn))){
				console.log("Token Expired");
				token = this.generateNewToken(result);
			}else{
				token = result.data.token;
			}
		}else{
			token = this.generateNewToken(result);
		}
		callback({success:true,token:token});
	},
	isAuthenticateUser:function(data, callback){
		let self = this;
		this.isExistUsername(data.username, function(isExistUser){
			if(isExistUser){
				self.isExistUsernamePassword(data, function(result){
					if(result.success){	
						self.validateToken(result, function(responce){
							callback(responce);
						});
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
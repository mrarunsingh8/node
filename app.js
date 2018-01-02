var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var jwt        = require("jsonwebtoken");
var basicAuth = require('express-basic-auth');

var index = require('./routes/index');
var auth = require('./routes/auth');
var api = require('./routes/api');

var app = express();

app.use(cors());

process.env.SECRET_KEY= "SECRETKEYSGOESHERE1";//"thisismysecretkey1";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/authenticate', auth);

app.use('/api', router);

router.use(function(req, res, next){	
	var expressBasicAuth = req.get('authorization');
	if (!expressBasicAuth) {
		res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
		//return res.status(401).send("Authorization Required");
		return res.status(401).send({ success: false, message: 'Authorization Required'});
	}else{
		var credentials = new Buffer(expressBasicAuth.split(" ").pop(), "base64").toString("ascii").split(":");
		if (!(credentials[0] === "admin" && credentials[1] === "admin")) {
	      //return res.status(403).send("Access Denied (incorrect credentials)");
	      return res.status(403).send({ success: false, message: 'Access Denied (incorrect credentials)'});
	    }
	}
	next();
});

router.use(function(req, res, next){
	var token=req.body.token || req.headers['token'];
	if(token){
		jwt.verify(token,process.env.SECRET_KEY,function(err,result){
            if(err){
                return res.status(403).send({ success: false, message: 'Failed to authenticate token.'});
            }else{
            	next();
            }
        });
	}else{
		return res.status(403).send({success: false,message: 'No token provided.'});
	}
});
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

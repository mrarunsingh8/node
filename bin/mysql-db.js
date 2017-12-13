var mysql = require('mysql');

var dbConfig = {
   host:'localhost',
   user:'root',
   password:'usbw',
   database:'ang'
};
var conection = mysql.createConnection({
  host     : dbConfig.host,
  user     : dbConfig.user,
  password : dbConfig.password,
  database : dbConfig.database,
  port:3307,
});
conection.connect(function(err) {
    if (err) throw err;
});

module.exports = conection;
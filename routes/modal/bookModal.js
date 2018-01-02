var db = require('../../bin/mysql-db');

let bookModal = {
    getAllBook: function () {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * from book ORDER BY id DESC limit 0,50 ', function (err, rows, fields) {
                if (err) reject(err);
                resolve(rows, fields);
            });
        });
    },
    bookDetail: function (bookId) {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM book WHERE id="' + bookId + '"', function (err, rows, fields) {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    AddNewBook: function (bookData, callback) {
        return new Promise(function (resolve, reject) {
            db.query('INSERT INTO book SET bookname="'+bookData.bookname+'", authorname="'+bookData.authorname+'", version="'+bookData.version+'", description="'+bookData.description+'", price="'+bookData.price+'" ', function(err, rows){
                if(err) reject(err);
                resolve({affectedRows: rows.affectedRows, insertId:rows.insertId});
            });
        });
    },

    UpdateBook: function (bookData, bookId) {
        return new Promise(function (resolve, reject) {
            db.query('UPDATE book SET  bookname="'+bookData.bookname+'", authorname="'+bookData.authorname+'", version="'+bookData.version+'", description="'+bookData.description+'", price="'+bookData.price+'" WHERE id="'+bookId+'" ', function(err, rows){
                if(err) reject(err);
                resolve({affectedRows: rows.affectedRows, updateId:bookId});
            });
        });
    },

    DeleteBook: function (bookId) {
        return new Promise(function (resolve, reject) {
            db.query('DELETE FROM book  WHERE id="'+bookId+'" ', function(err, rows){
                if(err) reject(err);
                resolve({affectedRows: rows.affectedRows, deletedId:bookId});
            });
        });
    }

}

module.exports = bookModal;
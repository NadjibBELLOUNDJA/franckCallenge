var express = require('express');
var session = require('cookie-session');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'franck_challenge'
});

var app = express();

function Order(name, deliveryHour, orderNumber, status, items)
{
	this.name = name;
	this.deliveryHour = deliveryHour;
	this.orderNumber = orderNumber;
	this.status = status;
	this.items = items;
}

connection.connect();


app.use(session({secret: 'secret'}))
.use(function(req, res, next) {
	if (typeof(req.session.orderslist) !== 'undefined')
		req.session.orderslist = [];
	next();
})

app.get('/orderslist', function(req, res) {
	connection.query('SELECT * FROM orders', function(err, rows, fields) {
		res.setHeader('200', {"Content-type": "text/html"});
		res.render("orders-list.ejs", {"orderslist": rows });
	});
})

.get('/orderslist/finish/:id', function(req, res) {
	if (req.params.id != '')
	{
		connection.query("UPDATE orders SET status = ? WHERE id = ? ", ["pending", req.params.id], function(err, rows, fields) {
			console.log(req.params.id);
			res.redirect('/orderslist');
		});
	}
})

.use(function(req, res) {
	res.redirect('/orderslist');
})

.listen('8080');

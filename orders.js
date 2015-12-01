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
	connection.query('SELECT * FROM menus ', function(err, ordersList, fields) {
		res.setHeader('200', {"Content-type": "text/html"});
		res.render("orders-list.ejs", {"ordersList": ordersList });
	});
})

.get('/orderslist/finish/:id', function(req, res) {
	if (req.params.id != '')
	{
		connection.query("UPDATE menus SET status = ? WHERE id = ? ", ["finished", req.params.id], function(err, rows, fields) {
			res.redirect('/orderslist');
		});
	}
})

.get('/orderitems/:menuId', function(req, res) {
	if (req.params.menuId != '')
	{
		connection.query("SELECT name FROM items LEFT JOIN menu_item ON items.id=menu_item.itemId WHERE menu_item.menuId = ?", [req.params.menuId],  function(err, menuItems, fields) {
			res.render('order-items.ejs', {"menuItems": menuItems});
		});
	}
})

.use(function(req, res) {
	res.redirect('/orderslist');
})

.listen('8080');

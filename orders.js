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
	connection.query('SELECT * FROM orders LEFT JOIN order_menu ON orders.id = order_menu.orderId LEFT JOIN menus ON order_menu.menuId=menus.id', function(err, ordersList, fields) {
		res.setHeader('200', {"Content-type": "text/html"});
		res.render("orders-list.ejs", {"ordersList": ordersList });
	});
})

.get('/orderslist/finish/:id', function(req, res) {
	if (req.params.id != '')
	{
		connection.query("UPDATE orders SET status = 1 WHERE id = ? ", [req.params.id], function(err, rows, fields) {
			res.redirect('/orderslist');
		});
	}
})

.get('/orderitems/:menuId', function(req, res) {
	if (req.params.menuId != '')
	{
		connection.query("SELECT items.name, menus.name FROM orders INNER JOIN order_menu ON orders.id=order_menu.orderId INNER JOIN menus ON order_menu.menuId=menus.id INNER JOIN menu_item ON menus.id=menu_item.menuId INNER JOIN items ON menu_item.itemId=items.id WHERE orders.id = ?", [req.params.menuId],  function(err, menuItems, fields) {
			res.render('order-items.ejs', {"menuItems": menuItems});
		});
	}
})

.use(function(req, res) {
	res.redirect('/orderslist');
})

.listen('8080');
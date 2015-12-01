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

connection.connect();

app.use(session({secret: 'secret'}))
.use('/js', express.static(__dirname + '/js'))
.get('/orderslist', function(req, res) {
	connection.query('SELECT orders.id, orders.deliveryHour, orders.status, menus.name as menuName FROM orders LEFT JOIN order_menu ON orders.id = order_menu.orderId LEFT JOIN menus ON order_menu.menuId=menus.id', function(err, ordersList, fields) {
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

.get('/orderitems/:orderId', function(req, res) {
	if (req.params.orderId != '')
	{
		connection.query("SELECT items.name as itemName, menus.name as menuName FROM orders INNER JOIN order_menu ON orders.id=order_menu.orderId INNER JOIN menus ON order_menu.menuId=menus.id INNER JOIN menu_item ON menus.id=menu_item.menuId INNER JOIN items ON menu_item.itemId=items.id WHERE orders.id = ?", [req.params.orderId],  function(err, orderItems, fields) {
			res.render('order-items.ejs', {"orderItems": orderItems});
		});
	}
})

.use(function(req, res) {
	res.redirect('/orderslist');
})

.listen('8080');
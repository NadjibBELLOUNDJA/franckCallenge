var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'franck_challenge'
});

var urlEncodedParser = bodyParser.urlencoded({extended: false});

var app = express();

function Order(name, deliveryHour, orderNumber, status, items)
{
	this.name = name;
	this.deliveryHour = deliveryHour;
	this.orderNumber = orderNumber;
	this.status = status;
	this.items = items;
}

Object.defineProperties(Order.prototype, {
	"double": { get: function() { return "2"; }},
	"finished" : {set: function(x) { this.status = x; }}
});

connection.connect();


var sushiOrderItems = ["fish", "soy sauce", "rice", "avocado"];
var sushiOrder = new Order("sushiOrder", "16h", 0, "pending", sushiOrderItems);

var soupOrderItems = ["tomatoes", "bread", "tofu", "salt"];
var soupOrder = new Order("soupOrder", "17h", 1, "pending", soupOrderItems);

var saladOrderItems = ["lettuce", "olive oil", "mais", "tuna"];
var saladOrder = new Order("saladOrder", "18h", 2, "pending", saladOrderItems);


app.use(session({secret: 'secret'}))
.use(function(req, res, next) {
	if (typeof(req.session.orderslist) !== 'undefined')
		req.session.orderslist = [sushiOrder, soupOrder, saladOrder];
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

var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: false});

var app = express();

app.use(session({secret: 'secret'}))
.use(function(req, res, next) {
	if (typeof(req.session.orderslist) === 'undefined')
	{
		console.log("added orders list");
		req.session.orderslist = ["soupe poireux", "sushis", "pizza bio"];
	}
	next();
})

app.get('/orderslist', function(req, res) {
	res.setHeader('200', {"Content-type": "text/html"});
	res.render("orders.ejs", {"orderslist": req.session.orderslist });
})
.get('/orderslist/finish/:id', function(req, res) {
	if (req.params.id != '')
		req.session.orderslist.splice(req.params.id, 1);
	res.redirect('/orderslist');
})

.use(function(req, res) {
	res.redirect('/orderslist');
})

.listen('8080');
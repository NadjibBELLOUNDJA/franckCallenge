var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var urlEncodedParser = bodyParser.urlencoded({extended: false});

var app = express();

function Order(name, deliveryHour, orderNumber, status)
{
	this.name = name;
	this.deliveryHour = deliveryHour;
	this.orderNumber = orderNumber;
	this.status = status;
}

Object.defineProperties(Order.prototype, {
	"double": { get: function() { return "2"; }},
	"finished" : {set: function(x) { this.status = x; }}
});

var sushiOrder = new Order("sushiOrder", "16h", 0, "pending");
var soupOrder = new Order("soupOrder", "17h", 1, "pending");
var saladOrder = new Order("saladOrder", "18h", 2, "pending");

// Object.defineProperties(sushiOrder, {
// 	"double": { get: function() { return "2"; }},
// 	"finished" : {set: function(x) { this.status = x; }}
// });


app.use(session({secret: 'secret'}))
.use(function(req, res, next) {
	if (typeof(req.session.orderslist) !== 'undefined')
		req.session.orderslist = [sushiOrder, soupOrder, saladOrder];
	next();
})

app.get('/orderslist', function(req, res) {
	res.setHeader('200', {"Content-type": "text/html"});
	res.render("orders.ejs", {"orderslist": req.session.orderslist });
})
.get('/orderslist/finish/:id', function(req, res) {
	if (req.params.id != '')
		req.session.orderslist[req.params.id].finished = "finished";
		// req.params.id.finished;
		// req.session.orderslist.splice(req.params.id, 1);
	res.redirect('/orderslist');
})

.use(function(req, res) {
	res.redirect('/orderslist');
})

.listen('8080');
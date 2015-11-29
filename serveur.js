var http = require('http');
var url = require("url");
var querystring = require('querystring');
// var EventEmitter = require('events').EventEmitter;
// var jeu = new EventEmitter();
// var markdown = require('markdown').markdown;
var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var app = express();

app.get('/to-do-list', function(req, res) {
	res.setHeader('200', 'plain/text');
	res.render("to-do-list.ejs");
});
	
// app.get('/', function(req, res) {
// 	res.setHeader('200', {"Content-type": "text/plain"} );
// 	res.end("Bienvenu dans le home page");
// })
// .get('/sous-sol', function(req, res) {
// 	res.setHeader('200', {"Content-type": "text/plain"} );
// 	res.end("Bienvenu dans le sous-sol");
// })
// .get('/chambre/:numeroChambre/:nombrePersonnes', function(req, res) {
// 	var noms = ["Nadjib", "Franck", "Hugo", "Laurene"];
// 	res.setHeader('200', {"Content-type": "text/plain"});
// 	res.render("chambre.ejs", {"numeroChambre": req.params.numeroChambre, "nombrePersonnes": req.params.nombrePersonnes,"noms": noms});	
// })
// .use(function(req, res, next) {
// 	res.setHeader('404', 'text/plain');
// 	res.send(404, "Pièce non trouvée");
// });

// app.use(morgan('combined'))
// .use(express.static(__dirname + '/public/'))
// .use(favicon(__dirname +'/public/favicon.ico'))
// .use(function(req, res) {
// 	res.setHeader('200', {"Content-type": "text/html"});
// 	res.end("J'ai chargé les middelwares");
// });


app.listen('8080');

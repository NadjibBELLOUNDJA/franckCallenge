var express = require('express');
var forms = require('forms');
var fields = forms.fields;
var validator = forms.validator;

var toDoListForm = forms.create({
	newTask: fields.string({required: true})
});

var app = express();

app.get('/to-do-list', function(req, res) {
	toDoListForm.handle(req, {
		success: function(form) {
			res.setHeader('200', {"Content-type": "text/html"});
			res.send("Formualire réussi");

		},
		other: function(form) {
			res.setHeader('200', {"Content-type": "text/html"});
			res.render("to-do-list.ejs", {"toDoListForm": form.toHTML() });
		}
	});
});

app.listen('8080');
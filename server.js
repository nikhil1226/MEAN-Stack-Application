var express = require('express');
var app = express();
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var db = mongojs('contactList', ['contactList']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contact-list', function (req, res) {
	db.contactList.find(function (err, docs) {
		res.json(docs);
	});
});

app.post('/contact-list', function (req, res) {
	db.contactList.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

app.get('/contact-list/:id', function (req, res) {
	var id = req.params.id;
	db.contactList.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
		res.json(doc);
	});
});

app.put('/contact-list/:id', function (req, res) {
	var id = req.params.id;
	db.contactList.findAndModify({
		query: { _id: mongojs.ObjectId(id) },
		update: { $set: { empName: req.body.empName, empId: req.body.empId } },
		new: true
	}, function (err, doc) {
		res.json(doc);
	});
});

app.delete('/contact-list/:id', function (req, res) {
	var id = req.params.id;
	db.contactList.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
		res.json(doc);
	});
});

app.listen(3000);
console.log('server is running!');
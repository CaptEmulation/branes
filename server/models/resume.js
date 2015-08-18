exports.init = function (app) {
	
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var logger = app.logger;
	
	var NAME = 'Resume';
	
	var schema = new Schema({
		bio: {
			name: String
		},
		contact: [{
			method: String,
			address: String
		}],
		references: [{
			name: String,
			address: String
		}],
		companies: [{
			name: String,
			summary: String,
			role: String,
			responsabilities: [ String ]
		}]
	});
	
	var Model = mongoose.model(NAME, schema);
	
	app.route('/resume')
		.get(function (req, res) {
			Model.findOne().then(function (resume) {
				res.json(resume);
			});
		});
		
	app.get('/default', function (req, res) {
		var model = new Model(require('./defaults'));
		model.save().then(function (model) {
			res.send(200, "OK");
		});
	});
	
	// var web = require('../service/web');
	
	// web.service({
	// 	name: NAME,
	// 	route: '/resume'
	// })
	// 	.justOne()
	// 	.installTo(app);
		
    // app.route('/test')
	// 	.get(function (req, res) {
	// 		Model.findOne().then(function (resume) {
	// 			res.json(resume);
	// 		});;
	// 	});

}


var mongoose = require('mongoose');

var bookModel =  mongoose.Schema({
	title: {
		type: String
	}
});


module.exports =  mongoose.model('Book', bookModel);
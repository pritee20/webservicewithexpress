var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost:27017/books');
var Book = require('./models/bookModel');
var app =  express();
var port =  process.env.PORT || 3000;



// parse application/json
app.use(bodyParser.json()); //middleware read the body and parse the json object that we can understand 

//To serve static files such as images, CSS files, and JavaScript files
//use the express.static built-in middleware function in Express
app.use(express.static(__dirname + '/'));

//setting up route
app.get('/', function(req,res){
	res.sendFile('index.html'); //// load the single view file (angular will handle the page changes on the front-end

});

//api routing
var bookRouter = express.Router();
// getting all item (Get verb)
bookRouter.route('/books')
//Post verb add new item to the list
.post(function(req,res){
	var book =  new Book(req.body);
	book.save(function(){
		Book.find(function(err,books){
		if(err){
			res.status(500).send(err);
		} else {
			res.json(books)
		}
	});
	}); // it will create my object in mongodb
	//res.status(201).send(book); // 201 means created

})
.get(function(req,res){
	Book.find(function(err,books){
		if(err){
			res.status(500).send(err);
		} else {
			res.json(books)
		}
	});
});
// getting per item 
bookRouter.route('/books/:bookId').get(function(req,res){
	Book.findById(req.params.bookId,function(err,book){
		if(err){
			res.status(500).send(err);
		} else {
			res.json(book);
		}
	});
});



app.use('/api', bookRouter);








//express strat listiening of route
app.listen(port, function(){
	console.log('GULP is Running my App combo with expres and node on Port' + port);
});


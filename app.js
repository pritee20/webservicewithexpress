var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost:27017/books');
var Book = require('./models/bookModel');
var app =  express();
var port =  process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json()); //middleware

//cleaner way to to api routing
var bookRouter = express.Router();
app.use('/api',bookRouter);

app.use('/:bookId', function(req,res,next){
	Book.findById(req.params.bookId, function(err, book){
		if(err){
			console.log(err);
		} else if(book){
			req.book = book;
			next();
		}
		else {
			res.status(404).send('no book found');
		}
	});	
});

//get all call
bookRouter.route('/books').get(function(req,res){
	Book.find({read:true},'-_id',function(err, books){
		console.log(err, books);
		if(err){
			res.status(500).send(err);
		} else{
			res.json(books);
		}
	});

});

//get param id
bookRouter.route('/books/:bookId').get(function(req,res){
	res.json(req.book);
});

// post call to update new entry 
bookRouter.route('/books').post(function(req,res){
	var book = new Book(req.body);
	book.save(function(err, book){
		console.log(err,book);
	})
	console.log(req.body);
	res.json(req.body);

});

// put call to replace exiting entry

bookRouter.route('/books/:bookId').put(function(req,res){
	Book.findById(req.params.bookId, function(err, book){
		if(err){
			console.log(err);
		} else {

			book.title =  req.body.title;
			book.author =  req.body.author;
			book.genre =  req.body.genre;
			book.read =  req.body.read;
			book.save(); //to save new entry
			res.json(book);
		}

	});
});

//delete call

/*bookRouter.route('/books').delete(function(req,res){
	req.book.remove(function(err){
		if(err){
			console.log(err);
		}else{
			req.status(204).send('Removed');
		}
	});
});*/


//setting up route
app.get('/', function(req,res){
	res.send('Welcome To My API');
});

//express strat listiening of route
app.listen(port, function(){
	console.log('GULP is Running my App combo with expres and node on Port' + port);
});
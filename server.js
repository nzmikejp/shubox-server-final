//this is a Node Express server
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var fileUpload = require('express-fileupload')

var Listing = require('./listing-model')
var Type = require('./type-model')
var User = require('./user-model')
var Category = require('./category-model')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(fileUpload())

app.use(logger('dev'))

var connectionString = 'mongodb://admin:shuboxpass123@cluster0-shard-00-00.58ov6.mongodb.net:27017,cluster0-shard-00-01.58ov6.mongodb.net:27017,cluster0-shard-00-02.58ov6.mongodb.net:27017/ShuBox?ssl=true&replicaSet=atlas-i1bkj5-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(connectionString,{ useNewUrlParser: true })
var  db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'))

//setup routes
var router = express.Router();

//---------------------listings route---------------------
router.get('/listings', (req, res) => {
	Listing.find()
	.populate('type',)
	.populate('user',)
	.populate('category',)
	.then((listings) => {
		res.json(listings)
	})
})

router.get('/listings/:id', (req, res) => {
	Listing.findOne({id:req.params.id})
	.populate('type',)
	.populate('user',)
	.populate('category',)
	.then((listing) => {
		res.json(listing)
	})
})

router.post('/listings', (req, res) => {
	var listing = new Listing()
	listing.id = Date.now()

	var data = req.body
	Object.assign(listing, data)
	listing.save()
	.then((listing) => {
		res.json(listing)
	})
})

router.put('/listings/:id', (req, res) => {
	Listing.findOne({id:req.params.id})
	.then((listing) => {
		var data = req.body
		Object.assign(listing, data)
		return listing.save()
	})
	.then((listing) => {
		res.json(listing)
	})
})

router.delete('/listings/:id', (req, res) => {
	Listing.deleteOne({id:req.params.id})
	.then(() => {
		res.json('deleted')
	})	
})

//---------------------types route---------------------
router.get('/types', (req, res) => {
	Type.find()
	.then((types) => {
		res.json(types)
	})
})

router.get('/types/:id', (req, res) => {
	Type.findOne({id:req.params.id})
	// .populate('listings')
	.populate({ 		
		path:'listings',
		populate:'category'
	})
	.then((type) => {
		res.json(type)
	})
})

//---------------------users route---------------------
router.get('/users', (req, res) => {
	User.find()
	.populate('listings')
	.then((users) => {
		res.json(users)
	})
})

router.get('/users/:id', (req, res) => {
	User.findOne({id:req.params.id})
	.populate('listings')
	.then((user) => {
		res.json(user)
	})
})

router.post('/users', (req,res) => {
	var user = new User()
	user.id = Date.now()

	var data = req.body
	
	Object.assign(user, data)	
	user.save()
	.then((user) => {
		res.json(user)
	})
})

router.put('/users/:id', (req, res) => {
	User.findOne({id:req.params.id})
	.then((user) => {
		var data = req.body
		Object.assign(user, data)
		return user.save()
	})
	.then((user) => {
		res.json(user)
	})
})

router.delete('/users/:id', (req, res) => {
	User.deleteOne({id:req.params.id})
	.then(() => {
		res.json('deleted')
	})	
})

router.post('/users/authenticate', (req, res) => {
	var {username, password} = req.body;
	var credential = {username, password}
	User.findOne(credential)
	.then((user) => {
		return res.json(user)
	})
})

//--- Category ---
router.get('/categories', (req, res) => {
	Category.find()
	.populate('listings')
	.then((categories) => {
		res.json(categories)
	})
})

router.get('/categories/:id', (req, res) => {
	Category.findOne({id:req.params.id})
	.populate('listings')
	.then((category) => {
		res.json(category)
	})
})

//--- File upload ---

router.post('/upload', (req, res) => {
	var files = Object.values(req.files)
	var uploadedFile = files[0]

	var newName = Date.now() + uploadedFile.name

	uploadedFile.mv('public/' + newName, function(){
		res.send(newName)
	})
})

//use server to serve up routes
app.use('/api', router);

// launch our backend into a port
const apiPort = 4000;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));
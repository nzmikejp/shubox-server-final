//this is a Node Express server
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

var Item = require('./item-model')
var Type = require('./type-model')
var User = require('./user-model')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

var connectionString = 'mongodb://khoi:Khoitran2004@group-summative-shard-00-00.2tjnk.mongodb.net:27017,group-summative-shard-00-01.2tjnk.mongodb.net:27017,group-summative-shard-00-02.2tjnk.mongodb.net:27017/ShuBox?ssl=true&replicaSet=atlas-g9aucv-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(connectionString,{ useNewUrlParser: true })
var  db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'))

//setup routes
var router = express.Router();
router.get('/testing', (req, res) => {
  res.send('<h1>Testing is working</h1>')
})

//---------------------items route---------------------
router.get('/items', (req, res) => {
	Item.find()
	.then((items) => {
		res.json(items)
	})
})

router.get('/items/:id', (req, res) => {
	Item.findOne({id:req.params.id})
	.then((item) => {
		res.json(item)
	})
})

router.post('/items', (res, req) => {
	var item = new Item()
	item.id = Date.now()

	var data = req.body
	Object.assign(item, data)
	item.save()
	.then((item) => {
		res.json(item)
	})
})

router.put('/items/:id', (req, res) => {
	Item.findOne({id:req.params.id})
	.then((item) => {
		var data = req.body
		Object.assign(item, data)
		return item.save()
	})
	.then((item) => {
		res.json(item)
	})
})

router.delete('/items/:id', (req, res) => {
	Item.deleteOne({id:req.params.id})
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
	.then((type) => {
		res.json(type)
	})
})

router.post('/types', (res, req) => {
	var type = new Type()
	type.id = Date.now()

	var data = req.body
	Object.assign(type, data)
	type.save()
	.then((type) => {
		res.json(type)
	})
})

router.put('/types/:id', (req, res) => {
	Type.findOne({id:req.params.id})
	.then((type) => {
		var data = req.body
		Object.assign(type, data)
		return type.save()
	})
	.then((type) => {
		res.json(type)
	})
})

router.delete('/types/:id', (req, res) => {
	Type.deleteOne({id:req.params.id})
	.then(() => {
		res.json('deleted')
	})	
})

//---------------------users route---------------------
router.get('/users', (req, res) => {
	User.find()
	.then((users) => {
		res.json(users)
	})
})

router.get('/users/:id', (req, res) => {
	User.findOne({id:req.params.id})
	.then((user) => {
		res.json(user)
	})
})

router.post('/users', (res, req) => {
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

//use server to serve up routes
app.use('/api', router);

// launch our backend into a port
const apiPort = 4000;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));
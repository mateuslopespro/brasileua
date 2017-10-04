const express = require('express')
let mongoose = require('mongoose')
const cors = require('cors')
const database = process.env.DB
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(cors())
let db = mongoose.connect(database, { useMongoClient: true})
//home
app.get('/', function(req, res){
	
	let Places = require('./models/Places.model')
	Places.find({}, { '_id': 0},{sort: {state: 1}}, function(err, results){
		if (err) throw err;
		return results
	}).then(function(results){
		res.render('pages/index',{title: 'Encontre empresas brasileiras nos EUA.', places: results})
	})
	
})
//contact
app.get('/contact', function(req, res){
	res.render('pages/contact',{title: ''})
})
//results
app.all('/search/:state/:city/:category/:page*?', function(req, res){
	let Companies = require('./models/Companies.model')
	Companies.find({state:req.params.state,city:req.params.city,category:req.params.category},{'_id': 0},{sort: {name: 1}}, function(err,results){
		res.render('pages/search',{title: req.params.category+' | '+req.params.city, state: req.params.state, city: req.params.city, category: req.params.category, companies: results})

	})
})
//page
app.get('/page/:friendlyUrl', function(req, res){
	let Companies = require('./models/Companies.model')
	Companies.findOne({url:req.params.friendlyUrl},{'_id': 0},{sort: {name: 1}}, function(err,results){
		res.render('pages/page',{title: results.name + ' | ' + results.city + ' | ' + results.state || '', company: results})
	})
	
})
//404 Not Found
app.use(function(req, res) {
  res.status(404).render('pages/404');
})


app.listen(port)
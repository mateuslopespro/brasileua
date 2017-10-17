const express = require('express')
let mongoose = require('mongoose')
mongoose.Promise = global.Promise
const cors = require('cors')
const database = process.env.DB
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(cors())
mongoose.connect(database,{ useMongoClient: true, /* other options */ })
//home
app.get('/', function(req, res){
	
	let Places = require('./models/Places.model')
	Places.find({}, { '_id': 0},{sort: {state: 1}}, function(err, results){
		if (err) throw err;
		return results
	}).then(function(results){
		let googleDescription = '<meta name="description" content="Encontre empresas brasileiras nos EUA e negocie com a comunidade brasileira nos Estados Unidos da América." />'
		let googleMedias = '<script type="application/ld+json">{"@context": "http://schema.org","@type": "Person","name": "Brazbiss","url": "http://www.brazbiss.com","sameAs": ["https://www.facebook.com/Brazbiss-1568609906532929/","https://medium.com/brazbiss"]}</script>'
		let facebook = '<meta property="og:url" content="http://www.brazbiss.com" /><meta property="og:type" content="article" /><meta property="og:title" content="Encontre empresas brasileiras nos EUA | Brazbiss.com<" /><meta property="og:description" content="Encontre empresas brasileiras nos EUA e negocie com a comunidade brasileira nos Estados Unidos da América." /><meta property="og:image" content="https://i.imgur.com/F7scg9x.png" />'
		let linkedIn = ''

		res.render('pages/index',{title: 'Encontre empresas brasileiras nos EUA.', places: results, metatags: {google: googleDescription, googleMedias: googleMedias, facebook: facebook, linkedin: linkedIn}})
	})
	
})
//contact
app.get('/contact', function(req, res){
	let googleDescription = '<meta name="description" content="Encontre empresas brasileiras nos EUA e negocie com a comunidade brasileira nos Estados Unidos da América." />'
	let googleMedias = '<script type="application/ld+json">{"@context": "http://schema.org","@type": "Person","name": "Brazbiss","url": "http://www.brazbiss.com","sameAs": ["https://www.facebook.com/Brazbiss-1568609906532929/","https://medium.com/brazbiss"]}</script>'
	let facebook = '<meta property="og:url" content="http://www.brazbiss.com" /><meta property="og:type" content="article" /><meta property="og:title" content="Encontre empresas brasileiras nos EUA | Brazbiss.com<" /><meta property="og:description" content="Encontre empresas brasileiras nos EUA e negocie com a comunidade brasileira nos Estados Unidos da América." /><meta property="og:image" content="https://i.imgur.com/F7scg9x.png" />'
	let linkedIn = ''

	res.render('pages/contact',{title: 'Anuncie empresas brasileiras nos EUA.',metatags: {google: googleDescription, googleMedias: googleMedias, facebook: facebook, linkedin: linkedIn}})
})
//results
app.all('/search/:state/:city/:category/:page*?', function(req, res){
	let Companies = require('./models/Companies.model')
	Companies.find({state:req.params.state,city:req.params.city,category:req.params.category},{'_id': 0},{sort: {name: 1}}, function(err,results){
		let googleDescription = '<meta name="description" content="Encontre empresas brasileiras nos EUA e negocie com a comunidade brasileira nos Estados Unidos da América." />'
		let googleMedias = '<script type="application/ld+json">{"@context": "http://schema.org","@type": "Person","name": "Brazbiss","url": "http://www.brazbiss.com","sameAs": ["https://www.facebook.com/Brazbiss-1568609906532929/","https://medium.com/brazbiss"]}</script>'
		let facebook = '<meta property="og:url" content="http://www.brazbiss.com" /><meta property="og:type" content="article" /><meta property="og:title" content="Encontre empresas brasileiras nos EUA | Brazbiss.com" /><meta property="og:description" content="Encontre empresas brasileiras nos EUA e negocie com a comunidade brasileira nos Estados Unidos da América." /><meta property="og:image" content="https://i.imgur.com/F7scg9x.png" />'
		let linkedIn = ''
		res.render('pages/search',{title: req.params.category+' | '+req.params.city, state: req.params.state, city: req.params.city, category: req.params.category, companies: results,  metatags: {google: googleDescription, googleMedias: googleMedias, facebook: facebook, linkedin: linkedIn}})

	})
})
//page
app.get('/page/:friendlyUrl', function(req, res){
	let Companies = require('./models/Companies.model')
	Companies.findOne({url:req.params.friendlyUrl},{'_id': 0},{sort: {name: 1}}, function(err,results){
		let googleDescription = '<meta name="description" content="'+results.metatags.googleDescription+'" />'
		let facebook = '<meta property="og:url" content="http://www.brazbiss.com/page/'+results.url+'" /><meta property="og:type" content="article" /><meta property="og:title" content="'+results.metatags.facebookTitle+'" /><meta property="og:description" content="'+results.metatags.facebookDescription+'" /><meta property="og:image" content="'+results.medias.image+'" />'
		let linkedIn = ''
		res.render('pages/page',{title: results.name + ' | ' + results.city + ' | ' + results.state || '', company: results, metatags: {google: googleDescription, facebook: facebook, linkedin: linkedIn}})
	})
	
})
//404 Not Found
app.use(function(req, res) {
  res.status(404).render('pages/404');
})


app.listen(port)
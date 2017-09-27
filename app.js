const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use('/static', express.static('public'))
app.use(cors())
//home
app.get('/', function(req, res){
	res.render('pages/index',{title: 'Encontre empresas brasileiras nos EUA.'})
})
//contact
app.get('/contact', function(req, res){
	res.render('pages/contact',{title: ''})
})
//results
app.post('/search/:state/:city/:category', function(req, res){
	res.render('pages/search',{title: req.params.category+' | '+req.params.city, state: null, city: null, area: null})
})
//page
app.get('/page', function(req, res){
	res.render('pages/page',{idPage: null})
})
app.get('/i/states', function(req, res){
	res.json({states: ['Massachusetts']})
})
app.get('/i/:state/cities', function(req, res){
	res.json({cities: ['Boston city']})
})
app.get('/i/:state/:city/categories', function(req, res){
	res.json({categories: ['Restaurantes']})
})
app.get('/i/:state/:city/:area/results/:page', function(req, res){
	res.render('pages/page',{idPage: null})
})
//404 Not Found
app.use(function(req, res) {
  res.status(404).render('pages/404');
})


app.listen(port)
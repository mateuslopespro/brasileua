const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'ejs');
app.use(express.static('public'))
//home
app.get('/', function(req, res){
	res.render('pages/index',{title: 'Encontre empresas brasileiras nos EUA.'})
})
//contact
app.get('/contact', function(req, res){
	res.render('pages/contact')
})
//results
app.get('/results', function(req, res){
	res.render('pages/results',{state: null, city: null, area: null})
})
//page
app.get('/page', function(req, res){
	res.render('pages/page',{idPage: null})
})
//404 Not Found
app.use(function(req, res) {
  res.status(404).render('pages/404');
})


app.listen(port)
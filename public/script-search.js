$(document).ready(function(){
	//page: search
	let state = window.location.pathname.split('/')[2] || 'Massachusetts'
	let city = window.location.pathname.split('/')[3] || 'Boston city'
	let category = window.location.pathname.split('/')[4] || 'Restaurantes'
	let host = 'http://brazbiss.com'

	for(let i = 0;i<companies.length;i++){
		let html = '<div class="col-md-8 item-result">'
		html += '<div class="item-result-title"><a href="http://brazbiss.com/page/'+companies[i].url+'">'+companies[i].name+'</a></div>'
		html += '<div class="item-result-intro">'
		html += companies[i].intro
		html += '</div>'
		html += '<div class="item-result-address">'
		html += companies[i].address
		html += '</div>'
		html += '<div class="item-result-button">'
		html += '<a href="http://brazbiss.com/page/'+companies[i].url+'" class="btn">Mais Informações</a>'
		html += '</div>'
		html +='</div>'
		$('.search-results').append(html)
	}

})
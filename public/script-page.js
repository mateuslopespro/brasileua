$(document).ready(function(){
	$('.name h1').text(company.name)
	$('.intro p').text(company.name)
	$('.address address').text(company.address)
	$('.about div').text(company.description)
	if(company.phones.landline.length>1){
		$('.landline p').text(company.phones.landline)
	}else{
		$('.landline p').text('Nenhum telefone.')
	}
	if(company.phones.cell.length>1){
		$('.cell p').text(company.phones.cell)
	}else{
		$('.cell p').text('Nenhum telefone.')
	}
	if(company.phones.whatsapp.length>1){
		$('.whatsapp p').text(company.phones.whatsapp)
	}else{
		$('.whatsapp p').text('Sem whatsapp.')
	}
	if(company.medias.website.length>1){
		$('.website p').html('<a href="'+company.medias.website+'">Acessar: '+company.medias.website+'</a>')
	}else{
		$('.website p').text('Nenhum site.')	
	}
	if(company.medias.facebook.length>1){
		$('.social-medias div').append('<a href="'+company.medias.facebook+'" class="fa fa-facebook"></a>')
	}
	if(company.medias.instagram.length>1){
		$('.social-medias div').append('<a href="'+company.medias.instagram+'" class="fa fa-instagram"></a>')
	}
	if(company.medias.youtube.length>1){
		$('.social-medias div').append('<a href="'+company.medias.youtube+'" class="fa fa-youtube"></a>')
	}
	if(company.medias.twitter.length>1){
		$('.social-medias div').append('<a href="'+company.medias.twitter+'" class="fa fa-twitter"></a>')
	}
})
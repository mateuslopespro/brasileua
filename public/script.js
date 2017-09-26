$(document).ready(function(){
	//banner-home, text-contact, form-search height
	$('.banner-home').height($(window).height())
	$('.text-contact').height($(window).height())
	$('.form-search').height($(window).height())
	//banner menu
	$('.encontrar').on('click touchstart', function(){
		window.scroll({
		  top: $('.form-search').position().top,
		  left: 0, 
		  behavior: 'smooth' 
		})
	})
	
	$('.form-search form select').width(($('.form-search div').width())*0.8)
	//footer
	if ($(".container-fluid").height()<$(window).height()){
	        $("footer").addClass("fixed");
	    }else{
	        $("footer").removeClass("fixed");
	    }

	//json responses to /i
	$.get('i/states',function(data){
		for(let i = 0; i<data.states.length;i++){
				$('.selectState').append('<option>'+data.states[i]+'</option>')
		}
	})
	$('.selectState').on('change', function(){
		let state = $('.selectState').val()
		if(state!=0){
			$.get('i/'+state+'/cities', function(data){
				for(let i = 0; i<data.cities.length;i++){
					$('.selectCity').append('<option>'+data.cities[i]+'</option>')
				}
			})
		}
		else{
			$('.selectCity').html('<option>Escolha a cidade</option>')
			$('.selectCategory').html('<option>Escolha a categoria</option>')
		}
	})
	$('.selectCity').on('change', function(){
		let state = $('.selectState').val()
		let city = $('.selectCity').val()
		if(city!=0 && state!=0){
			$.get('i/'+state+'/'+city+'/categories', function(data){
				for(let i = 0; i<data.categories.length;i++){
					$('.selectCategory').append('<option>'+data.categories[i]+'</option>')
				}
			})
		}
		else{
			$('.selectCategory').html('<option>Escolha a categoria</option>')
		}
	})

})
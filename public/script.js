$(document).ready(function(){
	//banner-home, text-contact, form-search height
	$('.banner-home').height($(window).height())
	$('.text-contact').height($(window).height())
	$('.form-search').height($(window).height())
	//banner menu
	$('.encontrar').on('click', function(){
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

})
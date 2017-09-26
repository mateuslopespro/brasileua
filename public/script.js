$(document).ready(function(){
	//banner-home, text-contact, form-search height
	$('.banner-home').height($(window).height())
	$('.text-contact').height($(window).height())
	$('.form-search').height($(window).height())
	//banner menu
	$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
	
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
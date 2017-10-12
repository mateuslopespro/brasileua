$(document).ready(function(){
	let host = 'http://'+window.location.host
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
    // On-page links smooth scroll
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

	//footer
	if ($(".container-fluid").height()<$(window).height()){
	        $("footer").addClass("fixed");
	    }else{
	        $("footer").removeClass("fixed");
	    }

	//index form places
	$('.form-search form select').width(($('.form-search div').width())*0.8)
	let states = []
	let cities = Array
		for(let i = 0;i<places.length;i++){
			$('.form-search .selectState').append('<option>'+places[i].state+'</option>')
			states.push(places[i].state)
		}
	
		$('.form-search .selectState').on('change', function(){
			if($('.form-search .selectState').val()!="none"){
				$('.form-search .selectCity').html('<option value="none">Escolha o estado</option>')
				state = $('.form-search .selectState').val()
				let iState = states.indexOf(state)
				for(let y = 0; y<places[iState].cities.length;y++){
					$('.form-search .selectCity').append('<option>'+places[iState].cities[y]+'</option>')
				}
			}
			else{
				$('.form-search .selectCity').html('<option value="none">Escolha a cidade</option>')
				$('.form-search .selectCategory').html('<option value="none">Escolha o estado</option>')
				$('.form-search .btn').addClass('disabled')
			}
		})
		$('.form-search .selectCity').on('change', function(){
			if($('.form-search .selectCity').val()!="none"){
				state = $('.form-search .selectState').val()
				let iState = states.indexOf(state)
				for(let z = 0; z<places[iState].categories.length; z++){
					$('.form-search .selectCategory').append('<option>'+places[iState].categories[z]+'</option>')
				}
			}
			else{
				$('.form-search .selectCategory').html('<option value="none">Escolha a categoria</option>')
				$('.form-search .btn').addClass('disabled')
			}
		})
		$('.form-search .selectCategory').on('change', function(){
			if($('.form-search .selectCategory').val()!="none"){
				let state = $('.form-search .selectState').val()
				let city = $('.form-search .selectCity').val()
				let category = $('.form-search .selectCategory').val()
				if(state!="none" && city!="none" && category!="none"){
					let actionUrl = '/search'
					let stateUrl = $('.selectState').val()
					let cityUrl = $('.selectCity').val()
					let categoryUrl = $('.selectCategory').val()
					actionUrl += '/'+stateUrl+'/'+cityUrl+'/'+categoryUrl
					$('form').attr('action',actionUrl)
					$('.form-search .btn ').removeClass('disabled')
				}
				else{
					$('.form-search .btn').addClass('disabled')
				}

			}
			else{
				$('.form-search .btn').addClass('disabled')
			}
		})

})
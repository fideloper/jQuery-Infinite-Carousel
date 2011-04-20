(function($) {
	
	var environment = {
		sliderList: null,
		curSliderList: null,
		slideBullets: null,
		firstElementOnViewPort: 1,
		isAnimating: false,
		increment: 0,
		easing: 'swing',
		sizeFirstElmnt: 0
	};
	
	var methods = {
		init:function(options) {
			
			var options = $.extend({
				slide_pages : '.slide_pages',
				easing : 'swing'
			}, options);
			
			environment.easing = options.easing;
			
			
			return this.each(function() {
				var sliderList = $($(this).children()[0]);
				if (sliderList) {
				
					environment.increment = sliderList.children().outerWidth("true");
					environment.sizeFirstElmnt = environment.increment;
					
					var elmnts = sliderList.children(),
						numElmts = elmnts.length,
						shownInViewport = Math.round($(this).width() / environment.sizeFirstElmnt);
					
					for (i = 0; i < shownInViewport; i++) {
						sliderList.append($(elmnts[i]).clone()/*.css('left', environment.increment * (i + numElmts))*/);
					}
					sliderList.css('width',((numElmts+shownInViewport)*environment.increment + environment.increment) + "px");
				}
			});
		},
		unbind:function() {
			return this.unbind('.carousel');
		},
		bind:function(args) {
			environment.curSliderList = $($(this).children()[0]);
			environment.firstElementOnViewPort = 1;
			
			$(args.prev).bind('click.carousel', function() {
				$(this).carousel('prev');
				return false;
			});
			
			$(args.next).bind('click.carousel', function() {
				$(this).carousel('next');
				return false;
			});
		},
		next:function() {
			if (!environment.isAnimating) {
				if (environment.firstElementOnViewPort > (environment.curSliderList.children().length-1)) {
					environment.firstElementOnViewPort = 2;
					environment.curSliderList.css('left', "0px");
				} else {
					environment.firstElementOnViewPort++;
				}
				environment.curSliderList.animate({
					left: "-=" + environment.increment,
					y: 0,
					queue: true
				}, environment.easing, function(){environment.isAnimating = false;});
				environment.isAnimating = true;
			}
			return false;
		},
		prev:function() {
			if (!environment.isAnimating) {
				if (environment.firstElementOnViewPort == 1) {
					environment.curSliderList.css('left', "-" + (environment.curSliderList.children().length-1) * environment.sizeFirstElmnt + "px");
					environment.firstElementOnViewPort = (environment.curSliderList.children().length-1);
				} else {
					environment.firstElementOnViewPort--;
				}
				
				environment.curSliderList.animate({
					left: "+=" + environment.increment,
					y: 0,
					queue: true
				}, environment.easing, function(){environment.isAnimating = false;});
				environment.isAnimating = true;
			}
		}
	};
	
	$.fn.carousel = function(method){
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.carousel' );
		} 
		
	};
})(jQuery);
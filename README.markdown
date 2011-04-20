# jQuery Infinte Carousel
This is a recoded and re-implemented version of: http://code.google.com/p/jquery-infinite-carousel/

See the example for HTML and CSS usage.

## Methods
Initialize:
	$('#ul_parent_item).carousel();

Bind next and previous buttons:
	$('#ul_parent_item).carousel('bind', {prev:'#prev_button_selector', next:'#next_button_selector'});

Or chain them:
	$('#ul_parent_item).carousel().carousel('bind', {prev:'#prev_button_selector', next:'#next_button_selector'});

Unbind buttons - Note the selector changed to the previously bound buttons. This may change in the future implementation:
	$('#next_button_selector, #prev_button_selector').carousel('unbind');


### License
Released under GNU GPLv2: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
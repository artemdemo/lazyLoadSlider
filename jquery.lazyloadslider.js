/*!
 * jQuery lazyLoadSlider
 * (c) 2013 Artem Demo <artemdemo@gmail.com>
 * MIT Licensed.
 *
 * https://github.com/artemdemo/lazyLoadSlider
 */

// http://stackoverflow.com/questions/19396390/load-image-from-javascript

(function($) {
$.fn.lazyloadslider = function(config) {

	var defConfig = {
		controllerPrev: '',
		controllerNext: '',
		loadingGif: '',
		classOfLoadingGifContainer: '',
		direction: 'ltr',
		speed: '700',
		itemWidth: 0		//because of lazy loading I need to get this property manually
	}
	config = $.extend(defConfig, config);

	var $container = $(this);
	var $list = $( $(this).children()[0] );

	if ( $(this).children()[0] == undefined ) {
		console.error('scrollinglist --> Error: There are NO LIST in container. Function has been aborted.');
		return;
	}

	$container.css('position', 'relative');
	$list.css('position', 'absolute');

	var list_length = $list.children().length;
	var list_is_moving = false;
	var list_left_start_position = $list.position().left;
	//because of lazy loading I need to claculate elemnt width in this way and not use build in jQuery functions
	var $firstItem = $( $list.children()[0] );
	var firstItemMargin = parseInt($firstItem.css('margin-left')) + parseInt($firstItem.css('margin-right'));
	var totalItemWidth = parseInt(config.itemWidth) + firstItemMargin;
	var listWidth = list_length * totalItemWidth;

	$list.css('width', listWidth);

	for (var i = 0; i < list_length; i++) {
		var $child = $( $list.children()[i] );
		$child.css('width', config.itemWidth);
		$child.attr('data-loaded', 'false');
		//I'm adding loading gif to all elements, because in any case it doesn't loading each time, it's only one element
		if ( config.classOfLoadingGifContainer == '' ) {
			$child.append('<img src="'+ config.loadingGif +'" class="ll-loading" />');
		} else {
			$child.find( config.classOfLoadingGifContainer ).append('<img src="'+ config.loadingGif +'" class="ll-loading" />');
		}
	};

	//get visibel part of container. Width without padding.
	container_inner_width = getInnerWidth($container);
	var start_container_inner_width = container_inner_width;

	var visible_items_num = Math.floor(container_inner_width / totalItemWidth);
	var last_visible_item = visible_items_num;

	for (var i = 0; i < visible_items_num; i++) {
		var $child = $( $list.children()[i] );
		var $image = $child.find('.ll-image');
		var src = $image.attr('data-src');
		$image.attr('src', src);
		$child.find('.ll-loading').css('display','none');
		$child.attr('data-loaded', 'true')
	}

	$(config.controllerPrev).click(function(){
		if ( list_is_moving == false ) {
			list_is_moving = true;
			move_list('left');
		}
	});

	$(config.controllerNext).click(function(){
		if ( list_is_moving == false ) {
			list_is_moving = true;
			move_list('right');
		}
	});

	$(window).resize(function(){
		var container_inner_width = getInnerWidth($container);
		if ( container_inner_width != start_container_inner_width) {
			var left = $list.position().left;
			last_visible_item = Math.floor( ( Math.abs(left) + $container.innerWidth() ) / config.itemWidth );
			console.log( last_visible_item );
			for (var i = 0; i < last_visible_item; i++) {
				var $child = $( $list.children()[i] );
				if ( $child.attr('data-loaded') == 'false' ) {
					var $image = $child.find('.ll-image');
					var newImg = new Image;
					newImg.onload = function() {
						$image.attr('src', this.src);
						$child.find('.ll-loading').css('display','none');
						$child.attr('data-loaded', 'true');
					}
					newImg.src = $image.attr('data-src');
				}
			}
			start_container_inner_width = container_inner_width;
		}
	});

	function move_list(direction){
		var left = $list.position().left;
		var move = 0;

		if (direction == 'left') {
			move = left - config.itemWidth;
		} else {
			move = left + config.itemWidth;
		}

		if ( list_left_start_position < move ) {
			list_is_moving = false;
			return 0;
		}

		if ( listWidth + left < container_inner_width && direction == 'left' ) {
			list_is_moving = false;
			return 0;
		}

		//container width is not constant, especially if it depends on main window width
		container_inner_width = getInnerWidth($container);
		//in this calculation I'm using innerWidth() bacuase otherwise I'm getting wrong result for last_visible_item
		last_visible_item = Math.floor( ( Math.abs(left) + $container.innerWidth() ) / config.itemWidth );

		if ( direction == 'left' ) {
			last_visible_item++;
		} else {
			last_visible_item--;
		}

		if( last_visible_item > list_length ) last_visible_item = list_length;
		var i = last_visible_item - 1;
		var $child = $( $list.children()[i] );
		if ( $child.attr('data-loaded') == 'false' ){
			var $image = $child.find('.ll-image');
			var newImg = new Image;
			newImg.onload = function() {
				$image.attr('src', this.src);
				$child.find('.ll-loading').css('display','none');
				$child.attr('data-loaded', 'true');
			}
			newImg.src = $image.attr('data-src');
		}

		console.log( last_visible_item );

		$list.animate({
				left: move,
			}, {
				duration: config.speed,
				step: function() {
				},
				complete: function(){
					list_is_moving = false;
				}
			});
	}

	// return inner width without padding
	function getInnerWidth( $element ){
		var totalInnerWidth = $element.innerWidth();
		var paddingLeft = parseInt($element.css('padding-left'));
		var paddingRight = parseInt($element.css('padding-right'));
		var innerWidth = totalInnerWidth - ( paddingLeft + paddingRight );

		return innerWidth;
	}

}
}(jQuery));
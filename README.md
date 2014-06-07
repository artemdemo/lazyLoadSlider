# Horizontal Image LazyLoad Slider


## Features

* Simple and lightweight
* Horizontal scroll
* Lazy load images
* Multiple instances on one page
* Useful options to customize your slider


## Basic Usage

### 1. Include the latest jQuery library and jQuery slider Plugin on the page
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="jquery.lazyloadslider.js"></script>
```

### 2. Create a list of text you want to scroll
```html
<div class="ll-list-wrap">
	<div id="ll-prev-item">
		&lt;
	</div>
	<div id="lazy-list" class="ll-list-container">
		<ul class="ll-image-list">
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/01.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/02.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/03.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/04.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/05.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/06.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/07.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/08.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/09.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/10.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/11.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/12.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/13.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/14.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/15.jpg" /></li>
			<li class="ll-image-list-item"><img class="ll-image" data-src="img/16.jpg" /></li>
		</ul>
	</div>
	<div id="ll-next-item">
		&gt;
	</div>
</div>
```

### 3. Initialization
```js
$(document).ready(function(){
	$('#lazy-list').lazyloadslider({
		controllerMoveLeft: '#ll-prev-item',
		controllerMoveRight: '#ll-next-item',
		loadingGif: 'img/loading.gif',
		itemWidth: 150
	});
});
```

## License

jQuery Scrollbox is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

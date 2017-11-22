'use strict';

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}
	return obj;
}
var $html = $('html'),
	$win = $(window),
	navbar = $('.navbar-nav'),
	MEDIAQUERY = {};
MEDIAQUERY = {
	desktopXL: 1200,
	desktop: 992,
	tablet: 768,
	mobile: 576,
	phone: 480
};
var navbarHandler = function navbarHandler() {
	var elem = $('.navbar-nav'),
		$this = void 0;
	$(document).on('click', '.nav-link', function(e) {
		$this = $(this);
		if (isSmallDevice() && !$this.parent().hasClass('active')) {
			e.preventDefault();
			$this.closest('.navbar-nav').find('.active').removeClass('active');
			$this.parent().addClass('active');
		}
	});
	$(document).on('mouseover', '.nav-link', function(e) {
		$this = $(this);
		$this.closest('.navbar-nav').find('.hover').removeClass('hover');
		$this.parent().addClass('hover');
		if (!$('.navbar-nav__backdrop').is(':visible')) {
			$('<div class="navbar-nav__backdrop"></div>').insertAfter(navbar.parents('.navbar'));
			$('.navbar-nav__backdrop').fadeIn(150);
		}
	});
	$(document).on('mouseleave', '.nav-link', function(e) {
		if (!$(this).parent().hasClass('hover')) {
			navbar.parents('.navbar').next('.navbar-nav__backdrop').fadeOut(50).remove();
		}
	});
	navbar.on('mouseleave', function(e) {
		$('.active', navbar).removeClass('active');
		$('.hover', navbar).removeClass('hover');
		$(this).parents('.navbar').next('.navbar-nav__backdrop').fadeOut(50).remove();
	});
	$win.on('resize', function() {
		if (!isSmallDevice()) {
			$('.active', navbar).removeClass('active');
		}
	});
};
var toggleClassOnElement = function toggleClassOnElement() {
	var toggleAttribute = $('*[data-toggle-class]');
	toggleAttribute.each(function() {
		var $this = $(this);
		var toggleClass = $this.attr('data-toggle-class');
		var outsideElement = void 0;
		var toggleElement = void 0;
		typeof $this.attr('data-toggle-target') !== 'undefined' ? toggleElement = $($this.attr('data-toggle-target')) : toggleElement = $this;
		$this.on('click', function(e) {
			if ($this.attr('data-toggle-type') !== 'undefined' && $this.attr('data-toggle-type') == 'on') {
				toggleElement.addClass(toggleClass);
			} else if ($this.attr('data-toggle-type') !== 'undefined' && $this.attr('data-toggle-type') == 'off') {
				toggleElement.removeClass(toggleClass);
			} else {
				toggleElement.toggleClass(toggleClass);
			}
			e.preventDefault();
			if ($this.attr('data-toggle-click-outside')) {
				outsideElement = $($this.attr('data-toggle-click-outside'));
				$(document).on('mousedown touchstart', toggleOutside);
			};
		});
		var toggleOutside = function toggleOutside(e) {
			if (outsideElement.has(e.target).length === 0 && !outsideElement.is(e.target) && !toggleAttribute.is(e.target) && toggleElement.hasClass(toggleClass)) {
				toggleElement.removeClass(toggleClass);
				$(document).off('mousedown touchstart', toggleOutside);
			}
		};
	});
};
var filterSlider = {
	elem: null,
	init: function init($element, opts) {
		opts = opts || {};
		var defaultOptions = {
			orientation: !isSmallDevice() ? 'vertical' : 'horizontal',
			range: true,
			reversed: !isSmallDevice() ? true : false,
			scale: 'logarithmic',
			tooltip: 'always',
			tooltip_position: !isSmallDevice() ? 'right' : 'top',
			tooltip_split: true,
			formatter: function formatter(num) {
				var n = num.toString();
				return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ') + ' ₽';
			}
		};
		var options = $.extend({}, defaultOptions, opts);
		$element.slider(options);
		$win.on('resize', function() {
			if (isSmallDevice()) {
				defaultOptions.orientation = 'horizontal';
				defaultOptions.reversed = false;
				defaultOptions.tooltip_position = 'top';
				$element.slider(defaultOptions);
				$element.slider('refresh');
			} else {
				defaultOptions.orientation = 'vertical';
				defaultOptions.reversed = true;
				defaultOptions.tooltip_position = 'right';
				$element.slider(defaultOptions);
				$element.slider('refresh');
				$element.slider('relayout');
			}
		});
	},
	destroy: function destroy($element) {
		$element.slider('destroy');
	}
};
var modalSearch = function modalSearch() {
	var elem = $('.modal-search');
	$(document).on('click', '.js-modal-search', function() {
		$('body').addClass('modal-open').addClass('modal-visible');
		elem.addClass('fade-in').show();
	});
	$(document).on('click', '.js-modal-search-close', function() {
		elem.removeClass('fade-in').addClass('fade-out').find('.form-control').val('');
		$('body').removeClass('modal-open').removeClass('modal-visible').addClass('modal-hidden');
		setTimeout(function() {
			$('body').removeClass('modal-hidden');
			elem.removeClass('fade-out').hide();
		}, 300);
	});
};
var modalFilter = function modalFilter() {
	var elem = $('.modal-filter');
	$(document).on('click', '.js-modal-filter', function() {
		$('html, body').animate({
			scrollTop: $('html').offset().top
		}, 300);
		$('body').addClass('modal-visible');
		elem.addClass('fade-in').show();
		filterSlider.elem = $('#filter-slider');
		filterSlider.init(filterSlider.elem);
		spollerMobile.hiddenSpoller.call();
	});
	$(document).on('click', '.js-modal-filter-close', function() {
		elem.removeClass('fade-in').addClass('fade-out');
		$('body').removeClass('modal-visible').addClass('modal-hidden');
		filterSlider.destroy(filterSlider.elem);
		setTimeout(function() {
			$('body').removeClass('modal-hidden');
			elem.removeClass('fade-out').hide();
		}, 300);
	});
};
var spollerMobile = {
	hiddenSpoller: function hiddenSpoller() {
		if (!isSmallDevice()) {
			$('.js-drop-mobile-content').removeAttr('style');
			$('.js-drop-mobile-handler').removeClass('is-opened');
		} else {
			if (!$('.js-drop-mobile-handler').hasClass('is-opened') && $('.js-drop-mobile-content').is(':visible')) {
				$('.js-drop-mobile-handler').closest('.js-drop-mobile').find('.js-drop-mobile-content').hide();
			}
		}
	},
	init: function init() {
		$(document).on('click', '.js-drop-mobile-handler', function() {
			if (isSmallDevice()) {
				$(this).toggleClass('is-opened').closest('.js-drop-mobile').toggleClass('is-opened').find('.js-drop-mobile-content').filter(':first').stop().slideToggle(200);
				if (typeof $.fn.bootstrapSlider != "undefined" && typeof filterSlider.elem !== "null") {
					filterSlider.elem.slider('relayout');
				}
			}
		});
		$(window).on('resize', function() {
			spollerMobile.hiddenSpoller.call();
		});
	}
};
var sendRequest = {
	elem: $('.modal-request'),
	toShow: function toShow(handler) {
		var offsetTop = void 0;
		var offsetLeft = void 0;
		offsetTop = Math.floor(handler.offset().top - sendRequest.elem.outerHeight() / 2);
		offsetLeft = Math.floor(handler.offset().left + handler.outerWidth() / 2 - sendRequest.elem.outerWidth() / 2);
		if (isSmallDevice()) {
			sendRequest.elem.css({
				"top": offsetTop > 0 ? offsetTop : 30 + "px"
			}).addClass('fade');
		} else {
			sendRequest.elem.css({
				"top": offsetTop > 0 ? offsetTop : 30 + "px",
				"left": offsetLeft + "px"
			}).addClass('fade');
		}
		$(document).on('mousedown touchstart', sendRequest.toggleOutside);
	},
	toClose: function toClose() {
		if (sendRequest.elem.is(':visible')) {
			sendRequest.elem.removeClass('fade').removeAttr('style');
			sendRequest.elem.find('input.form-control').val('');
			$(document).off('mousedown touchstart', sendRequest.toggleOutside);
		}
	},
	toggleOutside: function toggleOutside(e) {
		if (sendRequest.elem.has(e.target).length === 0 && !sendRequest.elem.is(e.target)) {
			sendRequest.toClose();
		}
	},
	init: function init() {
		$(document).on('click', '.js-send-request', function(e) {
			e.preventDefault();
			sendRequest.toShow($(this));
		});
		$win.on('resize', function() {
			if (sendRequest.elem.is(':visible')) {
				sendRequest.toClose();
			}
		});
		$(document).on('click', '.js-modal-request-close', sendRequest.toClose);
	}
};

function navbarLeave() {
	navbar.trigger('mouseleave');
}

function isSmallDevice() {
	return $win.width() < MEDIAQUERY.desktop;
}

function isTouch() {
	return $html.hasClass('touch');
}
jQuery.fn.exists = function() {
	return this.length > 0;
};
var mainSlider = {
	slider: $('.js-main-carousel'),
	sliderSettings: function sliderSettings() {
		return {
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			focusOnSelect: false,
			arrows: true,
			dots: true,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 5000,
			fade: true,
			cssEase: 'linear'
		};
	},
	init: function init() {
		var slider = void 0;
		if ($('.js-main-carousel').exists()) {
			slider = mainSlider.slider.slick(mainSlider.sliderSettings());
		}
	}
};
var promoBox = {
	slider: $('.js-promo-box'),
	sliderSettings: function sliderSettings() {
		return {
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			focusOnSelect: false,
			variableWidth: true,
			arrows: false,
			dots: false,
			speed: 500,
			responsive: [{
				breakpoint: 1199,
				settings: {
					variableWidth: false,
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true
				}
			}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1, // centerMode: true,
					variableWidth: false,
					dots: true
				}
			}]
		};
	},
	init: function init() {
		if ($('.js-promo-box').exists()) {
			promoBox.slider.slick(promoBox.sliderSettings());
		}
	}
};
var productCarousel = {
	slider: $('.js-product-carousel'),
	sliderSettings: function sliderSettings() {
		var _ref;
		var counts = productCarousel.slider.children().length;
		counts = counts > 6 ? 6 : counts;
		return _ref = {
			infinite: false,
			slidesToShow: counts,
			slidesToScroll: 1
		}, _defineProperty(_ref, 'infinite', false), _defineProperty(_ref, 'focusOnSelect', false), _defineProperty(_ref, 'dots', true), _defineProperty(_ref, 'arrows', false), _defineProperty(_ref, 'speed', 300), _defineProperty(_ref, 'responsive', [{
			breakpoint: 1199,
			settings: {
				variableWidth: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				dots: true
			}
		}, {
			breakpoint: 767,
			settings: {
				variableWidth: false,
				slidesToShow: 3,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				variableWidth: false
			}
		}]), _ref;
	},
	init: function init() {
		if ($('.js-product-carousel').exists()) {
			productCarousel.slider.slick(productCarousel.sliderSettings());
		}
	}
};
var salonCarousel = {
	slider: $('.js-salon-carousel'),
	sliderSettings: function sliderSettings() {
		var _ref2;
		var counts = salonCarousel.slider.children().length;
		counts = counts > 6 ? 6 : counts;
		return _ref2 = {
			infinite: false,
			slidesToShow: counts,
			slidesToScroll: 1
		}, _defineProperty(_ref2, 'infinite', false), _defineProperty(_ref2, 'focusOnSelect', false), _defineProperty(_ref2, 'dots', false), _defineProperty(_ref2, 'arrows', true), _defineProperty(_ref2, 'speed', 300), _defineProperty(_ref2, 'responsive', [{
			breakpoint: 1199,
			settings: {
				variableWidth: false,
				slidesToShow: 5,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 991,
			settings: {
				variableWidth: false,
				slidesToShow: 4,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 767,
			settings: {
				variableWidth: false,
				arrows: false,
				slidesToShow: 3,
				slidesToScroll: 3,
				dots: true
			}
		}]), _ref2;
	},
	init: function init() {
		if ($('.js-salon-carousel').exists()) {
			salonCarousel.slider.slick(salonCarousel.sliderSettings());
		}
	}
};
var brandsCarousel = {
	slider: $('.js-brands-carousel'),
	sliderSettings: function sliderSettings() {
		return {
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			focusOnSelect: false,
			variableWidth: false,
			arrows: false,
			dots: true,
			speed: 500
		};
	},
	init: function init() {
		if ($('.js-brands-carousel').exists() && $(window).width() < 1199) {
			brandsCarousel.slider.slick(brandsCarousel.sliderSettings());
		}
		$(window).on('resize', function() {
			if ($(window).width() >= 1200) {
				if (brandsCarousel.slider.hasClass('slick-initialized')) {
					brandsCarousel.slider.slick('unslick');
				}
			} else {
				if (brandsCarousel.slider.hasClass('slick-initialized')) {
					brandsCarousel.slider.slick('unslick');
				}
				brandsCarousel.slider.slick(brandsCarousel.sliderSettings());
			}
		});
	}
};
var recommendedCarousel = {
	slider: $('.js-recommended-slider'),
	sliderSettings: function sliderSettings() {
		var counts = recommendedCarousel.slider.children().length;
		counts = counts > 3 ? 3 : counts;
		return {
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: counts,
			slidesToScroll: counts,
			responsive: [{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		};
	},
	init: function init() {
		if ($('.js-recommended-slider').exists()) {
			recommendedCarousel.slider.slick(recommendedCarousel.sliderSettings());
		}
	}
};
var productZoomCarousel = {
	slider: $('.js-product-zoom'),
	sliderSettings: function sliderSettings() {
		return {
			dots: true,
			arrows: false,
			infinite: true,
			speed: 500,
			fade: true,
			focusOnSelect: false,
			lazyLoad: "ondemand",
			cssEase: "linear",
			adaptiveHeight: true,
			mobileFirst: true,
			centerMode: true,
			responsive: [{
				breakpoint: 767,
				settings: {
					arrows: false,
					dots: true,
					customPaging: function customPaging(slider, i) {
						var item = $(slider.$slides[i]).find("img");
						return '<button class="product-zoom__tab"><img class="img-thumbnail" src="' + item.attr("data-thumb") + '" alt="' + item.attr("data-alt-thumb") + '"></button>';
					}
				}
			}]
		};
	},
	init: function init() {
		if ($('.product-zoom').exists()) {
			productZoomCarousel.slider.slick(productZoomCarousel.sliderSettings());
		}
	}
};
var initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM(gallerySelector) {
	var parseThumbnailElements = function parseThumbnailElements(el) {
		var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl = void 0,
			linkEl = void 0,
			size = void 0,
			item = void 0;
		for (var i = 0; i < numNodes; i++) {
			figureEl = thumbElements[i]; // <figure> element
			// include only element nodes 
			if (figureEl.nodeType !== 1) {
				continue;
			}
			linkEl = figureEl.children[0]; // <a> element
			size = linkEl.getAttribute('data-size').split('x'); // create slide object
			item = {
				src: linkEl.getAttribute('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10),
				alt: linkEl.getAttribute("data-alt-zoom")
			};
			if (figureEl.children.length > 1) { // <figcaption> content
				item.title = figureEl.children[1].innerHTML;
			}
			if (linkEl.children.length > 0) { // <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.children[0].getAttribute('src');
			}
			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}
		return items;
	}; // find nearest parent element
	var closest = function closest(el, fn) {
		return el && (fn(el) ? el : closest(el.parentNode, fn));
	}; // triggers when user clicks on thumbnail
	var onThumbnailsClick = function onThumbnailsClick(e) {
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		var eTarget = e.target || e.srcElement; // find root element of slide
		var clickedListItem = closest(eTarget, function(el) {
			return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
		});
		if (!clickedListItem) {
			return;
		} // find index of clicked item by looping through all child nodes
		// alternatively, you may define index via data- attribute
		var clickedGallery = clickedListItem.parentNode,
			childNodes = clickedListItem.parentNode.childNodes,
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index = void 0;
		for (var i = 0; i < numChildNodes; i++) {
			if (childNodes[i].nodeType !== 1) {
				continue;
			}
			if (childNodes[i] === clickedListItem) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}
		var link = $(clickedListItem).find("a").attr("href");
		if (index >= 0 && link !== undefined) { // open PhotoSwipe if valid index found
			openPhotoSwipe(index, clickedGallery);
		}
		return false;
	}; // parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function photoswipeParseHash() {
		var hash = window.location.hash.substring(1),
			params = {};
		if (hash.length < 5) {
			return params;
		}
		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if (!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');
			if (pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}
		if (params.gid) {
			params.gid = parseInt(params.gid, 10);
		}
		return params;
	};
	var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
		var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery = void 0,
			options = void 0,
			items = void 0;
		items = parseThumbnailElements(galleryElement); // define options (if needed)
		options = {
			barsSize: {
				top: 0,
				bottom: 0
			},
			closeEl: true,
			captionEl: false,
			fullscreenEl: false,
			shareEl: false,
			tapToToggleControls: false,
			history: false,
			zoomEl: false,
			counterEl: false,
			arrowEl: false,
			scaleMode: "orig", // define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),
			getThumbBoundsFn: function getThumbBoundsFn(index) { // See Options -> getThumbBoundsFn section of documentation for more info
				var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect();
				return {
					x: rect.left,
					y: rect.top + pageYScroll,
					w: rect.width
				};
			}
		}; // PhotoSwipe opened from URL
		if (fromURL) {
			if (options.galleryPIDs) { // parse real index when custom PIDs are used 
				// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
				for (var j = 0; j < items.length; j++) {
					if (items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else { // in URL indexes start from 1
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		} // exit if index not found
		if (isNaN(options.index)) {
			return;
		}
		if (disableAnimation) {
			options.showAnimationDuration = 0;
		} // Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		window.gallery = gallery;
		gallery.init();
	}; // loop through all gallery elements and bind events
	var galleryElements = document.querySelectorAll(gallerySelector);
	for (var i = 0, l = galleryElements.length; i < l; i++) {
		galleryElements[i].setAttribute('data-pswp-uid', i + 1);
		galleryElements[i].onclick = onThumbnailsClick;
	} // Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if (hashData.pid && hashData.gid) {
		openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
	}
};
$(function() {
	svg4everybody();
	navbarHandler();
	toggleClassOnElement();
	modalSearch();
	modalFilter();
	spollerMobile.init();
	sendRequest.init();
	mainSlider.init();
	promoBox.init();
	productCarousel.init();
	salonCarousel.init();
	brandsCarousel.init();
	recommendedCarousel.init();
	productZoomCarousel.init();
	initPhotoSwipeFromDOM('.product-zoom');
});

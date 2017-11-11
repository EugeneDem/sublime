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
var Main = function() {
	var $html = $('html'),
		$win = $(window),
		$winWidth = $(window).width(),
		$winHeight = $(window).height(),
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
		elem.on('click', '.nav-link', function(e) {
			$this = $(this);
			if (isSmallDevice() && !$this.parent().hasClass('active')) {
				e.preventDefault();
				$this.closest('.navbar-nav').find('.active').removeClass('active');
				$this.parent().addClass('active');
			}
		});
		navbar.on('mouseleave', function(e) {
			$('.active', navbar).removeClass('active');
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
		}
	};
	var modalSearch = function modalSearch() {
		var elem = $('.modal-search');
		$(document).on('click', '.js-modal-search', function() {
			$('body').addClass('modal-open');
			elem.addClass('fade');
		});
		$(document).on('click', '.js-modal-search-close', function() {
			elem.removeClass('fade').find('.form-control').val('');
			$('body').removeClass('modal-open');
		});
	};
	var modalFilter = function modalFilter() {
		var elem = $('.modal-filter');
		$(document).on('click', '.js-modal-filter', function() { // let sp;
			$('body').addClass('modal-open');
			elem.addClass('fade');
			filterSlider.elem = $('#filter-slider');
			filterSlider.init($('#filter-slider'));
			spollerMobile.hiddenSpoller.call(); // sp = $('.modal-filter__container:visible', elem).niceScroll({
			//     cursorcolor: '#d0ac80',
			//     cursoropacitymax: 0.3,
			//     cursorwidth: 6,
			//     cursorborder: '1px solid rgba(208, 172, 128, 0.5)',
			//     cursorborderradius: '3px',
			//     horizrailenabled: false,
			//     railpadding: { top: 0, right: -15, left: 0, bottom: 0 }
			// });
		});
		$(document).on('click', '.js-modal-filter-close', function() {
			elem.removeClass('fade');
			$('body').removeClass('modal-open');
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

	function navbarLeave() {
		navbar.trigger('mouseleave');
	}

	function isSmallDevice() {
		return $win.width() < MEDIAQUERY.desktop;
	}

	function isTouch() {
		return $html.hasClass('touch');
	}
	return {
		init: function init() {
			navbarHandler();
			toggleClassOnElement();
			modalSearch();
			modalFilter();
			spollerMobile.init();
		}
	};
}();
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
			speed: 500
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
					centerMode: true,
					variableWidth: false
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
$(function() {
	svg4everybody();
	Main.init();
	mainSlider.init();
	promoBox.init();
	productCarousel.init();
	brandsCarousel.init();
	recommendedCarousel.init();
	productZoomCarousel.init();
});

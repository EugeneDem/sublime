'use strict';
var Main = function() {
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
		return {
			slidesToShow: 6,
			slidesToScroll: 1,
			infinite: true,
			focusOnSelect: false,
			variableWidth: false,
			arrows: false,
			dots: false,
			speed: 500,
			responsive: [{
				breakpoint: 1199,
				settings: {
					variableWidth: false,
					slidesToShow: 4,
					dots: true
				}
			}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					centerMode: true,
					variableWidth: false,
					dots: true
				}
			}, {
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					variableWidth: false,
					dots: true
				}
			}]
		};
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
$(function() {
	svg4everybody();
	Main.init();
	mainSlider.init();
	promoBox.init();
	productCarousel.init();
	brandsCarousel.init();
});

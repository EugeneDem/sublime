'use strict';
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
					dots: true
				}
			}, {
				breakpoint: 767,
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
			variableWidth: true,
			arrows: false,
			dots: true,
			speed: 500,
			responsive: [{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: false,
					dots: true
				}
			}]
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
				brandsCarousel.slider.slick(brandsCarousel.sliderSettings());
			}
		});
	}
};
$(function() {
	svg4everybody();
	mainSlider.init();
	promoBox.init();
	productCarousel.init();
	brandsCarousel.init();
});

//# sourceMappingURL=main.js.map

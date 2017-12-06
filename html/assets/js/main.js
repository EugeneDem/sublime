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
		if (!isSmallDevice()) {
			$('.active', navbar).removeClass('active');
			$('.hover', navbar).removeClass('hover');
			$(this).parents('.navbar').next('.navbar-nav__backdrop').fadeOut(50).remove();
		}
	});
	$(document).on('click touchstart', '.navbar-nav__backdrop', function(e) {
		$('.active', navbar).removeClass('active');
		$('.hover', navbar).removeClass('hover');
		$(this).fadeOut(50).remove();
	});
	$win.on('resize', function() {
		if (!isSmallDevice()) {
			$('.active, .hover', navbar).removeClass('active').removeClass('hover');
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
		var navbarItem = $('.navbar-nav').children('.nav-item');
		typeof $this.attr('data-toggle-target') !== 'undefined' ? toggleElement = $($this.attr('data-toggle-target')) : toggleElement = $this;
		$this.on('click', function(e) {
			if (!$('.navbar').next('.navbar-nav__backdrop').length) {
				$('<div class="navbar-nav__backdrop"></div>').insertAfter($('.navbar'));
				$('.navbar-nav__backdrop').fadeIn(150);
			} else {
				$('.navbar').next('.navbar-nav__backdrop').fadeOut(50).remove();
			}
			if ($this.attr('data-toggle-type') !== 'undefined' && $this.attr('data-toggle-type') == 'on') {
				toggleElement.addClass(toggleClass);
			} else if ($this.attr('data-toggle-type') !== 'undefined' && $this.attr('data-toggle-type') == 'off') {
				toggleElement.removeClass(toggleClass);
			} else {
				toggleElement.toggleClass(toggleClass);
				navbarItem.removeClass('active').removeClass('hover');
				navbarItem.eq(0).addClass('active');
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
var wishlist = {
	addList: function addList(e) {
		var $this = $(e.currentTarget);
		if (!$this.hasClass('is-active')) {
			$this.addClass('is-active'); // TODO: add cookie
		} else {
			$this.removeClass('is-active'); // TODO remove cookie
		}
	},
	addListCurrent: function addListCurrent(e) {
		var $this = $(e.currentTarget);
		var parentEl = $this.parents('.product');
		if ($this.attr('href') !== undefined) {
			e.preventDefault();
		}
		if (!$this.hasClass('is-active')) {
			$($(e.data.class), parentEl).addClass('is-active'); // TODO: add cookie
		} else {
			$($(e.data.class), parentEl).removeClass('is-active'); // TODO remove cookie
		}
	},
	init: function init() {
		$(document).on('click', '.js-add-wishlist', wishlist.addList);
		$(document).on('click', '.js-add-wishlist-single', {
			class: '.js-add-wishlist-single'
		}, wishlist.addListCurrent);
	}
};;
(function($) {
	if (!$.IZ) {
		$.IZ = new Object();
	};
	$.IZ.ImageZoom = function(el, options) {
		var self = this;
		self.$el = $(el);
		self.el = el;
		self.$el.data('IZ.ImageZoom', self);
		self.init = function() {
			if (!$.fn.slick && self.options.useSlick) {
				throw new Error("Slick JS is not installed, but required to use this zoom");
			}
			if (typeof PhotoSwipe === 'undefined') {
				throw new Error('PhotoSwipe is not installed, but required to use this zoom');
			}
			self.options = $.extend({}, $.IZ.ImageZoom.defaultOptions, options);
			self.origImgObjects = self.options.imageObjects != null ? self.options.imageObjects : self.imageObject();
			self.initialSetup();
			if (self.options.useSlick) {
				self.slick();
			}
		};
		self.initialSetup = function() {
			$('body').append(self.pswpHtml());
			self.$trueEl = self.$el;
			self.$trueEl.addClass('image-zoom-hover');
			self.$trueEl.on('click', 'a', function(event) {
				event.preventDefault();
				var currentIndex = self.options.useSlick ? $(this).closest('.slick-slide').data('slick-index') : $(this).parent().index();
				var link = $(this).attr('href');
				if (currentIndex >= 0 && link !== undefined) {
					self.photoSwipe(currentIndex);
				}
			});
		};
		self.photoSwipe = function(index) {
			var options = $.extend({}, self.options.psOptions, {
				index: index
			});
			var pswp = $('.pswp.image-zoom-hover')[0];
			var zoom = new PhotoSwipe(pswp, PhotoSwipeUI_Default, self.origImgObjects, options);
			var realViewportWidth, useLargeImages = false,
				firstResize = true,
				imageSrcWillChange;
			zoom.listen('beforeResize', function() {
				realViewportWidth = zoom.viewportSize.x * window.devicePixelRatio;
				if (useLargeImages && realViewportWidth < 1000) {
					useLargeImages = false;
					imageSrcWillChange = true;
				} else if (!useLargeImages && realViewportWidth >= 1000) {
					useLargeImages = true;
					imageSrcWillChange = true;
				}
				if (imageSrcWillChange && !firstResize) {
					zoom.invalidateCurrItems();
				}
				if (firstResize) {
					firstResize = false;
				}
				imageSrcWillChange = false;
			});
			zoom.listen('gettingData', function(index, item) {
				if (useLargeImages) {
					item.src = item.originalImage.src;
					item.w = item.originalImage.w;
					item.h = item.originalImage.h;
				} else {
					item.src = item.originalImage.src;
					item.w = item.originalImage.w / 2;
					item.h = item.originalImage.h / 2;
				}
			});
			zoom.listen('afterChange', function() {
				if (self.options.mouseHover) {
					self.mouseHover(zoom.getCurrentIndex(), zoom.options.getNumItemsFn());
				}
			});
			zoom.init();
		};
		self.imageObject = function() {
			var imgArray = [];
			self.$el.children('figure').each(function() {
				var link = $(this).find('a');
				var image = $(this).find('img');
				var sizeLink = link.attr('data-size').split('x');
				var sizeImage = image.attr('data-size').split('x');
				var imageObj = {
					mediumImage: {
						src: image.attr('src'),
						w: parseInt(sizeImage[0], 10),
						h: parseInt(sizeImage[1], 10)
					},
					originalImage: {
						src: link.attr('href'),
						w: parseInt(sizeLink[0], 10),
						h: parseInt(sizeLink[1], 10)
					}
				};
				if (link.attr('href') !== undefined) {
					imgArray.push(imageObj);
				}
			});
			return imgArray;
		};
		self.slick = function() {
			var slickOptions = self.options.slickOptions;
			var slick = self.$trueEl.slick(slickOptions);
			return slick;
		};
		self.pswpHtml = function() {
			var pswpHtml = '<div class="pswp image-zoom-hover" tabindex="-1" role="dialog" aria-hidden="true"> \
                                <div class="pswp__bg"></div> \
                                <div class="pswp__scroll-wrap"> \
                                    <div class="pswp__container"> \
                                        <div class="pswp__item"></div> \
                                        <div class="pswp__item"></div> \
                                        <div class="pswp__item"></div> \
                                    </div> \
                                    <div class="pswp__ui pswp__ui--hidden"> \
                                        <div class="pswp__top-bar"> \
                                            <div class="pswp__counter"></div> \
                                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button> \
                                            <button class="pswp__button pswp__button--share" title="Share"></button> \
                                            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> \
                                            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> \
                                            <div class="pswp__preloader"> \
                                                <div class="pswp__preloader__icn"> \
                                                    <div class="pswp__preloader__cut"> \
                                                        <div class="pswp__preloader__donut"></div> \
                                                    </div> \
                                                </div> \
                                            </div> \
                                        </div> \
                                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> \
                                            <div class="pswp__share-tooltip"></div> \
                                        </div> \
                                        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> \
                                        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button> \
                                        <div class="pswp__caption"> \
                                            <div class="pswp__caption__center"></div> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div>';
			if (self.options.pswpHtml !== '') {
				pswpHtml = self.options.pswpHtml;
			}
			return pswpHtml;
		};
		self.mouseHover = function(index, counts) {
			var curIndex = index + 1 < counts ? index + 1 : 0;
			$('.pswp.image-zoom-hover').on('mousemove', function(e) {
				var currentEl = $('.pswp.image-zoom-hover .pswp__item').eq(curIndex);
				var image = currentEl.find('img.pswp__img');
				var widthImage = image.width();
				var heightImage = image.height();
				var scale = currentEl.find('.pswp__zoom-wrap').css('transform').split(',')[3]; // var image = $(this).find('.pswp__item').eq(index).find('img.pswp__img');
				// var widthImage = image.width();
				// var heightImage = image.height();
				// var scale = $(this).find('.pswp__item').eq(index).find('.pswp__zoom-wrap').css('transform').split(',')[3];
				var mouseX = event.x;
				var mouseY = event.y;
				var pageX, pageY;
				console.log('scale= ', scale);
				if (scale > 1) {
					pageX = (mouseX * scale - widthImage * scale) / 2;
					pageY = (mouseY * scale - heightImage * scale) / 2;
				} else {
					pageX = mouseX * scale - widthImage / 2 * scale;
					pageY = mouseY * scale - heightImage / 2 * scale;
				}
				$(this).find('.pswp__zoom-wrap').css({
					"transform": "translate3d(" + pageX + "px, " + pageY + "px, 0px) scale(" + scale + ")"
				});
			});
		};
		self.init();
	};
	$.IZ.ImageZoom.defaultOptions = {
		pswpHtml: '',
		psOptions: {
			bgOpacity: 1,
			showHideOpacity: true,
			clickToCloseNonZoomable: false,
			barsSize: {
				top: 0,
				bottom: 0
			},
			shareEl: false,
			fullscreenEl: false,
			closeOnScroll: false,
			closeEl: true,
			captionEl: false,
			tapToToggleControls: false,
			history: false,
			zoomEl: false,
			pinchToClose: false,
			loop: false,
			counterEl: false,
			arrowEl: false,
			scaleMode: "orig"
		},
		slickOptions: {
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
		},
		imageObjects: null,
		useSlick: true,
		mouseHover: true
	};
	$.fn.iz_hover = function(options) {
		return this.each(function() {
			new $.IZ.ImageZoom(this, options);
		});
	};
})(jQuery);
$(function() {
	var _slickOptions;
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
	brandsCarousel.init();
	recommendedCarousel.init();
	wishlist.init(); // salonCarousel.init();
	// productZoomCarousel.init();
	$('.js-product-zoom').iz_hover();
	var counts = $('.js-salon-gallery').children().length;
	counts = counts > 6 ? 6 : counts;
	$('.js-salon-gallery').iz_hover({
		psOptions: {
			bgOpacity: 0.9,
			barsSize: {
				top: 0,
				bottom: 0
			},
			showHideOpacity: true,
			shareEl: false,
			fullscreenEl: false,
			closeOnScroll: false,
			clickToCloseNonZoomable: false,
			closeEl: true,
			captionEl: false,
			tapToToggleControls: false,
			history: false,
			zoomEl: false,
			counterEl: false
		},
		slickOptions: (_slickOptions = {
			infinite: false,
			slidesToShow: counts,
			slidesToScroll: 1
		}, _defineProperty(_slickOptions, 'infinite', false), _defineProperty(_slickOptions, 'focusOnSelect', false), _defineProperty(_slickOptions, 'dots', false), _defineProperty(_slickOptions, 'arrows', true), _defineProperty(_slickOptions, 'speed', 300), _defineProperty(_slickOptions, 'responsive', [{
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
		}]), _slickOptions),
		imageObjects: null,
		useSlick: true,
		mouseHover: false
	});
});

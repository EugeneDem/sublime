'use strict';

let Main = function () {
    let $html = $('html'),
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

    let navbarHandler = () => {
        let elem = $('.navbar-nav'),
            $this;
    
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

    let toggleClassOnElement = () => {
        let toggleAttribute = $('*[data-toggle-class]');
        
        toggleAttribute.each(function () {
            let $this = $(this);
            let toggleClass = $this.attr('data-toggle-class');
            let outsideElement;
            let toggleElement;
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

            let toggleOutside = (e) => {
                if (outsideElement.has(e.target).length === 0
                && !outsideElement.is(e.target)
                && !toggleAttribute.is(e.target) && toggleElement.hasClass(toggleClass)) {
                    toggleElement.removeClass(toggleClass);
                    $(document).off('mousedown touchstart', toggleOutside);
                }
            };

        });
    };

    let filterSlider = {
        elem: null,
        init: function init($element, opts){
            opts = opts || {};

            let defaultOptions = {
                orientation: (!isSmallDevice()) ? 'vertical' : 'horizontal',
                range: true,
                reversed: (!isSmallDevice()) ? true : false,
                scale: 'logarithmic',
                tooltip: 'always',
                tooltip_position: (!isSmallDevice()) ? 'right' : 'top',
                tooltip_split: true,
                formatter: function(num) {
                    var n = num.toString();
                    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ') + ' ₽';
                }
            }

            let options = $.extend({}, defaultOptions, opts);

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
    }

    let modalSearch = () => {
        let elem = $('.modal-search');

        $(document).on('click', '.js-modal-search', function() {
            $('body').addClass('modal-open');
            elem.addClass('fade');
        });

        $(document).on('click', '.js-modal-search-close', function() {
            elem.removeClass('fade').find('.form-control').val('');
            $('body').removeClass('modal-open');
        });
    };

    let modalFilter = () => {
        let elem = $('.modal-filter');

        $(document).on('click', '.js-modal-filter', function() {
            // let sp;
            $('body').addClass('modal-open');
            elem.addClass('fade');
            filterSlider.elem = $('#filter-slider');
            filterSlider.init($('#filter-slider'));
            spollerMobile.hiddenSpoller.call();
            // sp = $('.modal-filter__container:visible', elem).niceScroll({
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

    let spollerMobile = {
        hiddenSpoller: () => {
            if (!isSmallDevice()) {
                $('.js-drop-mobile-content').removeAttr('style');
                $('.js-drop-mobile-handler').removeClass('is-opened');
            } else {
                if(!$('.js-drop-mobile-handler').hasClass('is-opened') && $('.js-drop-mobile-content').is(':visible')){
                    $('.js-drop-mobile-handler').closest('.js-drop-mobile').find('.js-drop-mobile-content').hide();
                }
            }
        },

        init: () => {

            $(document).on('click', '.js-drop-mobile-handler', function() {
                if (isSmallDevice()) {
                    $(this).toggleClass('is-opened').closest('.js-drop-mobile').toggleClass('is-opened').find('.js-drop-mobile-content').filter(':first').stop().slideToggle(200);
                    if (typeof($.fn.bootstrapSlider) != "undefined" && typeof(filterSlider.elem) !== "null") {
                        filterSlider.elem.slider('relayout');
                    }
                }
            });

            $(window).on('resize', function () {
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
        init: () => {
            navbarHandler();
            toggleClassOnElement();
            modalSearch();
            modalFilter();
            spollerMobile.init();
        }
    }
}();

jQuery.fn.exists = function () {
    return this.length > 0;
};


let mainSlider = {
    slider: $('.js-main-carousel'),
    sliderSettings: function () {
        return {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            focusOnSelect: false,
            arrows: true,
            dots: true,
            speed: 500
        }
    },
    init: function () {
        let slider;
        if ($('.js-main-carousel').exists()) {
            slider = mainSlider.slider.slick(mainSlider.sliderSettings());
        }
    }
};

let promoBox = {
    slider: $('.js-promo-box'),
    sliderSettings: function () {
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
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        // centerMode: true,
                        variableWidth: false,
                        dots: true
                    }
                }
            ]
        }
    },
    init: function () {
        if ($('.js-promo-box').exists()) {
            promoBox.slider.slick(promoBox.sliderSettings());
        }
    }
};

let productCarousel = {
    slider: $('.js-product-carousel'),
    sliderSettings: function () {
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
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        centerMode: true,
                        variableWidth: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: false,
                        dots: true
                    }
                }
            ]
        }
    },
    init: function () {
        if ($('.js-product-carousel').exists()) {
            productCarousel.slider.slick(productCarousel.sliderSettings());
        }
    }
};

let brandsCarousel = {
    slider: $('.js-brands-carousel'),
    sliderSettings: function () {
        return {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            focusOnSelect: false,
            variableWidth: false,
            arrows: false,
            dots: true,
            speed: 500
        }
    },
    init: function () {
        if ($('.js-brands-carousel').exists() && $(window).width() < 1199) {
            brandsCarousel.slider.slick(brandsCarousel.sliderSettings());
        }

        $(window).on('resize', function () {
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

$(function () {
    svg4everybody();
    Main.init();
    mainSlider.init();
    promoBox.init();
    productCarousel.init();
    brandsCarousel.init();

    if($('.product-media').length){
		$('.product-media').fotorama({
			thumbborderwidth: 3,
			thumbmargin: 0
		});
	}
});
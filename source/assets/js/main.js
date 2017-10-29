'use strict';

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
                        dots: true
                    }
                },
                {
                    breakpoint: 767,
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
                }
            ]
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
                brandsCarousel.slider.slick(brandsCarousel.sliderSettings());
            }
        });
    }
};

$(function () {
    svg4everybody();
    mainSlider.init();
    promoBox.init();
    productCarousel.init();
    brandsCarousel.init();
});
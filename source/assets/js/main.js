'use strict';

let $html = $('html'),
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

let navbarHandler = () => {
    let elem = $('.navbar-nav'),
        $this;

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

    $win.on('resize', () => {
        if (!isSmallDevice()) {
            $('.active', navbar).removeClass('active');
        }
    });
};

let toggleClassOnElement = () => {
    let toggleAttribute = $('*[data-toggle-class]');

    toggleAttribute.each(function() {
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
            if (outsideElement.has(e.target).length === 0 &&
                !outsideElement.is(e.target) &&
                !toggleAttribute.is(e.target) && toggleElement.hasClass(toggleClass)) {
                toggleElement.removeClass(toggleClass);
                $(document).off('mousedown touchstart', toggleOutside);
            }
        };

    });
};

let filterSlider = {
    elem: null,
    init: function init($element, opts) {
        opts = opts || {};

        let defaultOptions = {
            orientation: (!isSmallDevice()) ? 'vertical' : 'horizontal',
            range: true,
            reversed: (!isSmallDevice()) ? true : false,
            scale: 'logarithmic',
            tooltip: 'always',
            tooltip_position: (!isSmallDevice()) ? 'right' : 'top',
            tooltip_split: true,
            formatter: (num) => {
                var n = num.toString();
                return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ') + ' ₽';
            }
        }

        let options = $.extend({}, defaultOptions, opts);

        $element.slider(options);

        $win.on('resize', () => {
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

    destroy: ($element) => {
        $element.slider('destroy');
    }
};

let modalSearch = () => {
    let elem = $('.modal-search');

    $(document).on('click', '.js-modal-search', function() {
        $('body').addClass('modal-open').addClass('modal-visible');
        elem.addClass('fade-in').show();
    });

    $(document).on('click', '.js-modal-search-close', function() {
        elem.removeClass('fade-in').addClass('fade-out').find('.form-control').val('');
        $('body').removeClass('modal-open').removeClass('modal-visible').addClass('modal-hidden');

        setTimeout(function(){
            $('body').removeClass('modal-hidden');
            elem.removeClass('fade-out').hide();
        }, 300);
    });
};

let modalFilter = () => {
    let elem = $('.modal-filter');

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

        setTimeout(function(){
            $('body').removeClass('modal-hidden');
            elem.removeClass('fade-out').hide();
        }, 300);
    });
};

let spollerMobile = {
    hiddenSpoller: () => {
        if (!isSmallDevice()) {
            $('.js-drop-mobile-content').removeAttr('style');
            $('.js-drop-mobile-handler').removeClass('is-opened');
        } else {
            if (!$('.js-drop-mobile-handler').hasClass('is-opened') && $('.js-drop-mobile-content').is(':visible')) {
                $('.js-drop-mobile-handler').closest('.js-drop-mobile').find('.js-drop-mobile-content').hide();
            }
        }
    },

    init: () => {

        $(document).on('click', '.js-drop-mobile-handler', function() {
            if (isSmallDevice()) {
                $(this).toggleClass('is-opened').closest('.js-drop-mobile').toggleClass('is-opened').find('.js-drop-mobile-content').filter(':first').stop().slideToggle(200);
                if (typeof ($.fn.bootstrapSlider) != "undefined" && typeof (filterSlider.elem) !== "null") {
                    filterSlider.elem.slider('relayout');
                }
            }
        });

        $(window).on('resize', function() {
            spollerMobile.hiddenSpoller.call();
        });
    }
};

let sendRequest = {
    elem: $('.modal-request'),
    toShow: (handler) => {
        let offsetTop;
        let offsetLeft;

        offsetTop = Math.floor(handler.offset().top - (sendRequest.elem.outerHeight() / 2));
        offsetLeft = Math.floor((handler.offset().left + (handler.outerWidth() / 2)) - (sendRequest.elem.outerWidth() / 2));

        if (isSmallDevice()) {
            sendRequest.elem.css({
                "top": (offsetTop > 0) ? offsetTop : 30 + "px"
            }).addClass('fade');
        } else {
            sendRequest.elem.css({
                "top": (offsetTop > 0) ? offsetTop : 30 + "px",
                "left": offsetLeft + "px"
            }).addClass('fade');
        }

        $(document).on('mousedown touchstart', sendRequest.toggleOutside);
    },

    toClose: () => {
        if (sendRequest.elem.is(':visible')) {
            sendRequest.elem.removeClass('fade').removeAttr('style');
            sendRequest.elem.find('input.form-control').val('');
            $(document).off('mousedown touchstart', sendRequest.toggleOutside);
        }
    },

    toggleOutside: (e) => {
        if (sendRequest.elem.has(e.target).length === 0 && !sendRequest.elem.is(e.target)) {
            sendRequest.toClose();
        }
    },


    init: () => {
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
}

function navbarLeave() {
    navbar.trigger('mouseleave');
}

function isSmallDevice() {
    return $win.width() < MEDIAQUERY.desktop;
}

function isTouch() {
    return $html.hasClass('touch');
}

jQuery.fn.exists = function () {
    return this.length > 0;
};


let mainSlider = {
    slider: $('.js-main-carousel'),
    sliderSettings: () => {
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
        }
    },
    init: () => {
        let slider;
        if ($('.js-main-carousel').exists()) {
            slider = mainSlider.slider.slick(mainSlider.sliderSettings());
        }
    }
};

let promoBox = {
    slider: $('.js-promo-box'),
    sliderSettings: () => {
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
    init: () => {
        if ($('.js-promo-box').exists()) {
            promoBox.slider.slick(promoBox.sliderSettings());
        }
    }
};

let productCarousel = {
    slider: $('.js-product-carousel'),
    sliderSettings: () => {
        let counts = productCarousel.slider.children().length;
        counts = counts > 6 ? 6 : counts;
        return {
            infinite: false,
            slidesToShow: counts,
            slidesToScroll: 1,
            infinite: false,
            focusOnSelect: false,
            dots: true,
            arrows: false,
            speed: 300,
            responsive: [{
                    breakpoint: 1199,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        variableWidth: false
                    }
                }
            ]
        }
    },
    init: () => {
        if ($('.js-product-carousel').exists()) {
            productCarousel.slider.slick(productCarousel.sliderSettings());
        }
    }
};

let salonCarousel = {
    slider: $('.js-salon-carousel'),
    sliderSettings: () => {
        let counts = salonCarousel.slider.children().length;
        counts = counts > 6 ? 6 : counts;
        return {
            infinite: false,
            slidesToShow: counts,
            slidesToScroll: 1,
            infinite: false,
            focusOnSelect: false,
            dots: false,
            arrows: true,
            speed: 300,
            responsive: [{
                    breakpoint: 1199,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        variableWidth: false,
                        arrows: false,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true
                    }
                }
            ]
        }
    },
    init: () => {
        if ($('.js-salon-carousel').exists()) {
            salonCarousel.slider.slick(salonCarousel.sliderSettings());
        }
    }
};

let brandsCarousel = {
    slider: $('.js-brands-carousel'),
    sliderSettings: () => {
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
    init: () => {
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

let recommendedCarousel = {
    slider: $('.js-recommended-slider'),
    sliderSettings: () => {
        let counts = recommendedCarousel.slider.children().length;
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
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }
    },
    init: () => {
        if ($('.js-recommended-slider').exists()) {
            recommendedCarousel.slider.slick(recommendedCarousel.sliderSettings());
        }
    }
};

let productZoomCarousel = {
    slider: $('.js-product-zoom'),
    sliderSettings: () => {
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
                    customPaging: (slider, i) => {
                        let item = $(slider.$slides[i]).find("img");
                        return '<button class="product-zoom__tab"><img class="img-thumbnail" src="' + item.attr("data-thumb") + '" alt="' + item.attr("data-alt-thumb") + '"></button>'
                    }
                }
            }]
        }
    },

    init: () => {
        if ($('.product-zoom').exists()) {
            productZoomCarousel.slider.slick(productZoomCarousel.sliderSettings());
        }
    }
};

let initPhotoSwipeFromDOM = (gallerySelector) => {

    let parseThumbnailElements = (el) => {
        let thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (let i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                alt: linkEl.getAttribute("data-alt-zoom")
            };



            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    let closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    let onThumbnailsClick = (e) => {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        let eTarget = e.target || e.srcElement;

        // find root element of slide
        let clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        let clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (let i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }


        let link = $(clickedListItem).find("a").attr("href");
        if (index >= 0 && link !== undefined) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    let photoswipeParseHash = () => {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        let vars = hash.split('&');
        for (let i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            let pair = vars[i].split('=');
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

    let openPhotoSwipe = (index, galleryElement, disableAnimation, fromURL) => {
        let pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
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
            scaleMode: "orig",
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function (index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                let thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (let j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        window.gallery = gallery;
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    let hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

$(function () {
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
function initMs() {
    let mapOptions = {
        center: new google.maps.LatLng(55.757102, 37.614705),
        zoom: 14,
        zoomControl: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: false,
        panControl: false,
        streetViewControl: true,
        draggable : true,
        overviewMapControl: false,
        overviewMapControlOptions: {
            opened: false,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#c0b9ad"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e1ddd5"
                    },
                    {
                        "hue": "#ff0000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 99
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c6beb1"
                    },
                    {
                        "lightness": 54
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#d4cec4"
                    },
                    {
                        "saturation": -6
                    },
                    {
                        "lightness": -9
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d4cec4"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6e635b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ddd8d0"
                    },
                    {
                        "saturation": -14
                    },
                    {
                        "lightness": -18
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            }
        ],
    };

    let mapElement = document.getElementById('salon-map');
    let map = new google.maps.Map(mapElement, mapOptions);
    let locations = [
        ['ГУМ', '+7 (495) 788-4343', 55.7546967, 37.6215216, 'assets/images/pin.png']
    ];

    for (let i = 0; i < locations.length; i++) {
        let description, telephone, email, web, markericon, marker;

        if (locations[i][1] =='undefined') { telephone ='';} else { telephone = locations[i][1];}
        if (locations[i][4] =='undefined') { markericon ='';} else { markericon = locations[i][4];}
        marker = new google.maps.Marker({
          icon: markericon,
          position: new google.maps.LatLng(locations[i][2], locations[i][3]),
          map: map,
          title: locations[i][0],
          tel: telephone
      });
    }
};

google.maps.event.addDomListener(window, 'load', initMs);
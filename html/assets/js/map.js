"use strict";

function initMs() {
	var mapOptions = {
		center: new google.maps.LatLng(55.757102, 37.614705),
		zoom: 14,
		zoomControl: true,
		disableDoubleClickZoom: true,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		panControl: false,
		streetViewControl: true,
		draggable: true,
		overviewMapControl: false,
		overviewMapControlOptions: {
			opened: false
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [{
			"featureType": "all",
			"elementType": "all",
			"stylers": [{
				"saturation": -100
			}, {
				"gamma": 0.5
			}]
		}]
	};
	var mapElement = document.getElementById('salon-map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var locations = [
		['ГУМ', '+7 (495) 788-4343', 55.7546967, 37.6215216, 'assets/images/pin.png']
	];
	for (var i = 0; i < locations.length; i++) {
		var description = void 0,
			telephone = void 0,
			email = void 0,
			web = void 0,
			markericon = void 0,
			marker = void 0;
		if (locations[i][1] == 'undefined') {
			telephone = '';
		} else {
			telephone = locations[i][1];
		}
		if (locations[i][4] == 'undefined') {
			markericon = '';
		} else {
			markericon = locations[i][4];
		}
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

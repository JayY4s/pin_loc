$(document).ready(function () {
    var map = L.map('map', { 
        doubleClickZoom: false,
        zoomControl: false
    }).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    var marker;
    var currentLatLng = { lat: 0, lng: 0 };
    var savedIconUrl = localStorage.getItem('selectedMarkerIcon') || '0';

    $('#markerSelect').val(savedIconUrl);
    changeMarker(); 

    function getCustomIcon(selectedMarker) {
        var markerUrl;
        var shadowUrl;

        switch (selectedMarker) {
            case '0':
                markerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
                shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                return L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                    shadowAnchor: [12, 41]
                });
                case '1':
                    markerUrl = 'https://leafletjs.com/examples/custom-icons/leaf-green.png';
                    shadowUrl = 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png';
                    return L.icon({
                        iconUrl: markerUrl,
                        shadowUrl: shadowUrl,
                        iconSize: [38, 95],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                        shadowSize: [50, 64],
                        shadowAnchor: [4, 62]
                    });
                case '2':
                    markerUrl = 'https://leafletjs.com/examples/custom-icons/leaf-red.png';
                    shadowUrl = 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png';
                    return L.icon({
                        iconUrl: markerUrl,
                        shadowUrl: shadowUrl,
                        iconSize: [38, 95],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                        shadowSize: [50, 64],
                        shadowAnchor: [4, 62]
                    });
                case '3':
                    markerUrl = 'https://leafletjs.com/examples/custom-icons/leaf-orange.png';
                    shadowUrl = 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png';
                    return L.icon({
                        iconUrl: markerUrl,
                        shadowUrl: shadowUrl,
                        iconSize: [38, 95],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                        shadowSize: [50, 64],
                        shadowAnchor: [4, 62]
                    });
                case '4':
                    markerUrl = 'images/icon.png';
                    shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                    return L.icon({
                        iconUrl: markerUrl,
                        shadowUrl: shadowUrl,
                        iconSize: [50, 50],
                        iconAnchor: [25, 50],
                        popupAnchor: [0, -50],
                        shadowSize: [50, 50],
                        shadowAnchor: [15, 55]
                    });
                case '5':
                    markerUrl = 'images/brazil-pin.png';
                    shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                    return L.icon({
                        iconUrl: markerUrl,
                        shadowUrl: shadowUrl,
                        iconSize: [50, 50],
                        iconAnchor: [25, 50],
                        popupAnchor: [0, -50],
                        shadowSize: [50, 50],
                        shadowAnchor: [15, 55]
                    });
                case '6':
                    markerUrl = 'images/penguin.png';
                    shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                    return L.icon({
                        iconUrl: markerUrl,
                        shadowUrl: shadowUrl,
                        iconSize: [45, 45],
                        iconAnchor: [20, 45],
                        popupAnchor: [0, -45],
                        shadowSize: [45, 45],
                        shadowAnchor: [10, 50]
                    });
                default:
                    markerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
                    shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                    return L.icon({
                        iconUrl: markerUrl,
                        shadowUrl: shadowUrl,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                        shadowAnchor: [12, 41]
                    });
        }
    }

    function openStreetView(lat, lng) {
        var googleStreetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
        window.open(googleStreetViewUrl, '_blank');
    }

    function changeMarker() {
        var selectedMarker = $('#markerSelect').val();
        var customIcon = getCustomIcon(selectedMarker);

        // Remove previous marker if it exists
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([0, 0], { icon: customIcon }).addTo(map)
            .bindPopup(`<b>Coordinates:</b> ${0.000000.toFixed(6)}, ${0.000000.toFixed(6)}`)
            .openPopup();

        setInterval(function () {
            if (!marker.getPopup().isOpen()) {
                marker.openPopup();
            }
        }, 1000);
        
        marker.on('click', function(e){
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;
            openStreetView(lat, lng);
        });

        $('#selectedMarkerImage').attr('src', getCustomIcon(selectedMarker).options.iconUrl);
        localStorage.setItem('selectedMarkerIcon', selectedMarker);
    }

    $('#markerSelect').on('change', function () {
        changeMarker();
    });

    function updateMarker(lat, lon, zoom = map.getZoom()) {
        currentLatLng = { lat: lat, lng: lon };
        var newLatLng = new L.LatLng(lat, lon);
        marker.setLatLng(newLatLng);
        marker.getPopup().setContent(`<b>Coordinates:</b> ${lat.toFixed(6)}, ${lon.toFixed(6)}`).update();
        map.setView(newLatLng, zoom);
    }

    window.updateCoordinates = function () {
        var coordinates = $('#coordinates').val();
        if (coordinates) {
            var parts = coordinates.split(',');

            if (parts.length !== 2) {
                showAlert('Invalid format. Please enter coordinates in the format: latitude,longitude.');
                return;
            }

            var lat = parseFloat(parts[0].trim());
            var lon = parseFloat(parts[1].trim());

            if (isNaN(lat) || isNaN(lon)) {
                showAlert('Invalid input. Latitude and longitude must be numbers.');
                return;
            }

            if (!isNaN(lat) && lat >= -90 && lat <= 90 &&
                !isNaN(lon) && lon >= -180 && lon <= 180) {
                updateMarker(lat, lon);
            } else {
                showAlert('Invalid coordinates. Latitude must be a number between -90 and 90, and longitude must be a number between -180 and 180. Please enter the coordinates in the format: latitude,longitude.');
            }
        } else {
            showAlert('Please enter coordinates in the format: latitude,longitude.');
        }
    };

    function showAlert(message) {
        $('#alertMessage').html(message);

        var myModal = new bootstrap.Modal($('#alertBox')[0], {
            backdrop: 'static',
            keyboard: false,
            focus: false
        });
        myModal.show();
    }

    window.resetMarker = function () {
        $('#coordinates').val('');
        $('#latitude').val('');
        $('#longitude').val('');
        updateMarker(0, 0, 2);
    };

    window.updateLatLon = function () {
        var lat = parseFloat($('#latitude').val());
        var lon = parseFloat($('#longitude').val());

        if (isNaN(lat) || isNaN(lon)) {
            showAlert('Latitude and Longitude must be numbers.');
            return;
        }

        if (lat < -90 || lat > 90) {
            showAlert('Latitude must be between -90 and 90.');
            return;
        }

        if (lon < -180 || lon > 180) {
            showAlert('Longitude must be between -180 and 180.');
            return;
        }

        updateMarker(lat, lon);
    };

    window.toggleHeaderContent = function () {
        var headerContent = document.querySelector('.header-content');
        headerContent.classList.toggle('hidden');

        var toggleIcon = document.getElementById('toggle-icon');
        toggleIcon.classList.toggle('bi-arrow-down-circle');
        toggleIcon.classList.toggle('bi-arrow-up-circle');
    };

    window.showSetting = function() {
        $('#setting-window').show();
        $('#overlay').show();
    }

    window.hideSetting = function() {
        $('#setting-window').hide();
        $('#overlay').hide();
    }

    window.showHelp = function() {
        $('#help-window').show();
        $('#overlay').show();
    }

    window.hideHelp = function() {
        $('#help-window').hide();
        $('#overlay').hide();
    }

    $('#setting-button').on('click', showSetting);
    $('#close-setting').on('click', hideSetting);
    $('#help-button').on('click', showHelp);
    $('#close-help').on('click', hideHelp);

    // place marker button
    var message = $('#message');

    $('#place-marker-button').on('click', function() {
        // Remove the current marker if it exists
        if (marker) {
            map.removeLayer(marker);
        }

        map.getContainer().style.cursor = 'crosshair';

        message.text('Click on the map to place a marker')
        // Listen for the map click event
        map.once('click', function(e) {
            // Get the coordinates
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
    
            // Place the new marker at the clicked location
            const icon = getCustomIcon($('#markerSelect').val());
            marker = L.marker(e.latlng, { icon: icon }).addTo(map);
    
            // Add a popup to the marker
            marker.bindPopup(`<b>Coordinates:</b> ${lat.toFixed(6)}, ${lng.toFixed(6)}`)
                .openPopup();
    
            // Attach the Street View click event
            marker.on('click', function() {
                openStreetView(lat, lng);
            });
    
            // Reset cursor to default after placing the marker
            map.getContainer().style.cursor = '';
    
            // Clear the message after placing the marker
            message.text('')
        });
    });
});

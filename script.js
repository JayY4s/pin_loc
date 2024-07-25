document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map', { doubleClickZoom: false }).setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.control.fullscreen().addTo(map);

    var marker;
    var savedIconUrl = localStorage.getItem('selectedMarkerIcon');
    if (savedIconUrl === null || savedIconUrl === undefined) {
        savedIconUrl = '0';
    }

    document.getElementById('markerSelect').value = savedIconUrl;
    changeMarker(); 

    function changeMarker() {
        var selectedMarker = document.getElementById('markerSelect').value;
        var markerUrl;
        var shadowUrl;
        var customIcon;

        switch (selectedMarker) {
            case '0':
                markerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
                shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                    shadowAnchor: [12, 41]
                });
                break;
            case '1':
                markerUrl = 'https://leafletjs.com/examples/custom-icons/leaf-green.png';
                shadowUrl = 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowSize: [50, 64],
                    shadowAnchor: [4, 62]
                });
                break;
            case '2':
                markerUrl = 'https://leafletjs.com/examples/custom-icons/leaf-red.png';
                shadowUrl = 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowSize: [50, 64],
                    shadowAnchor: [4, 62]
                });
                break;
            case '3':
                markerUrl = 'https://leafletjs.com/examples/custom-icons/leaf-orange.png';
                shadowUrl = 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowSize: [50, 64],
                    shadowAnchor: [4, 62]
                });
                break;
            case '4':
                markerUrl = 'images/icon.png';
                shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                    shadowSize: [50, 50],
                    shadowAnchor: [15, 55]
                });
                break;
            case '5':
                markerUrl = 'images/brazil-pin.png';
                shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                    shadowSize: [50, 50],
                    shadowAnchor: [15, 55]
                });
                break;
            case '6':
                markerUrl = 'images/penguin.png';
                shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [45, 45],
                    iconAnchor: [20, 45],
                    popupAnchor: [0, -45],
                    shadowSize: [45, 45],
                    shadowAnchor: [10, 50]
                });
                break;
            default:
                markerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
                shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
                customIcon = L.icon({
                    iconUrl: markerUrl,
                    shadowUrl: shadowUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                    shadowAnchor: [12, 41]
                });
                break;
        }

        // Remove previous marker if exists
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([0, 0], { icon: customIcon }).addTo(map)
            .bindPopup(`<b>Coordinates:</b> ${0.000000.toFixed(6)}, ${0.000000.toFixed(6)}`)
            .openPopup();

        document.getElementById('selectedMarkerImage').src = markerUrl;
        // Save selected marker icon URL to localStorage
        localStorage.setItem('selectedMarkerIcon', selectedMarker);
    }

    document.getElementById('markerSelect').addEventListener('change', function () {
        changeMarker();
    });

    function updateMarker(lat, lon) {
        var newLatLng = new L.LatLng(lat, lon);
        marker.setLatLng(newLatLng);
        marker.getPopup().setContent(`<b>Coordinates:</b> ${lat.toFixed(6)}, ${lon.toFixed(6)}`).update();
        map.setView(newLatLng, map.getZoom());
    }

    window.updateCoordinates = function () {
        var coordinates = document.getElementById('coordinates').value;
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
        var alertMessage = document.getElementById('alertMessage');
        alertMessage.innerHTML = message;

        var myModal = new bootstrap.Modal(document.getElementById('alertBox'), {
            backdrop: 'static',
            keyboard: false,
            focus: false
        });
        myModal.show();
    }

    window.reset = function () {
        document.getElementById('coordinates').value = '';
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
        updateMarker(0, 0);
    };

    window.updateLatLon = function () {
        var lat = parseFloat(document.getElementById('latitude').value);
        var lon = parseFloat(document.getElementById('longitude').value);

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

    function showSetting() {
        var settingWindow = document.getElementById('setting-window');
        var overlay = document.getElementById('overlay');

        settingWindow.style.display = 'block';
        overlay.style.display = 'block';
    }

    function hideSetting() {
        var settingWindow = document.getElementById('setting-window');
        var overlay = document.getElementById('overlay');

        settingWindow.style.display = 'none';
        overlay.style.display = 'none';
    }

    document.getElementById('setting-button').addEventListener('click', showSetting);
    document.getElementById('close-setting').addEventListener('click', hideSetting);
});

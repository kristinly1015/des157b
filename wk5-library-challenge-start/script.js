(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([38.539410, -121.728980], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([38.539410,  -121.728980]).addTo(map);

    var circle = L.circle([38.539410, -121.75], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 370
    }).addTo(map);

    var polygon = L.polygon([
        [38.584810, -121.729],
        [38.554610, -121.73],
        [38.52910, -121.74]
    ]).addTo(map);

    marker.bindPopup("<b>Hello user!</b><br>This is your destination.").openPopup();
    circle.bindPopup("You are here.");
    polygon.bindPopup("This is a section next to your desired location.");
}());
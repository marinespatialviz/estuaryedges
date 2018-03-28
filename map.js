var map = L.map('map',{
center: [51.50, 0],
zoom: 12
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
maxZoom: 19,
minZoom: 3
}).addTo(map);

var Mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 19,
minZoom: 3,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1Ijoid2FuZGFib2RuYXIiLCJhIjoiY2phdHM1dm0xNXF0ajJxanU3dmdmaHRqcCJ9.mFPox1jAE9LkZN6v5OZ7Lw'
}).addTo(map);

var CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
subdomains: 'abcd',
maxZoom: 19,
minZoom: 3
}).addTo(map);

L.control.layers({
'Esri': Esri_WorldImagery,
'Mapbox': Mapbox,
'CartoDB': CartoDB_DarkMatter
}).addTo(map);

var geojsonLayer = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/ThamesEstuaryPartnership/estuaryedges/master/estuaryedges.geojson",{
        pointToLayer: function(feature,yx){
          var marker = new L.marker(yx);
          marker.bindTooltip(feature.properties.Name)
          return marker;}
      }).addTo(map);

var scale = L.control.scale({position: 'bottomright'});
scale.addTo(map);

var logo = L.control({position: 'bottomleft'});
logo.onAdd = function(map){
var div = L.DomUtil.create('div', 'myclass');
div.innerHTML= "<img src='https://thamesestuarypartnership.org/wp-content/uploads/TEP_RGB_use_web_home1.jpg', height = 65 width = 85/>";
return div;
}
logo.addTo(map);

var map;

function initialize() {
  var myLatlng = new google.maps.LatLng(37.769929,-122.446916);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
  });

  var infowindow = new google.maps.InfoWindow({
      content: "This is San Francisco!"
  });     
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

function addMarker() {
  var lat = document.getElementById("lat").value;
  var lon = document.getElementById("lon").value;
  var location = new google.maps.LatLng(lat, lon);
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  addInfoWindow(marker);
}
  
function addInfoWindow(marker) {
  var comment = document.getElementById("comment").value;
  var infowindow = new google.maps.InfoWindow({
      content: comment
  });     
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);



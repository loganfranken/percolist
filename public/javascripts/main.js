geoid.getPosition().then(function(position) {

    // Position retrieved successfully
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var map = document.querySelector('google-map');

    map.latitude = lat;
    map.longitude = lon;
    map.addEventListener('google-map-ready', function(e) {
      alert('Map loaded!');
    });

}).catch(function(err) {

  // An error occurred while retrieving the position

});

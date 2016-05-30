geoid.getPosition().then(function(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var map = document.querySelector('google-map');
    map.latitude = lat;
    map.longitude = lon;

    fetch('/locations?lat=' + lat + '&lon=' + lon).then(function(response) {
      response.json().then(function(json) {
        console.log(json);
      });
    });

}).catch(function(err) {

  // An error occurred while retrieving the position

});

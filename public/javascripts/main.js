var coffeeTableTemplate = $('#coffee-table-template').html();
var coffeeMapTemplate = $('#coffee-map-template').html();

geoid.getPosition().then(function(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    fetch('/locations?lat=' + lat + '&lon=' + lon).then(function(response) {
      response.json().then(function(locations) {

        var coffeeTable = Mustache.render(coffeeTableTemplate, { locations: locations });
        $('.coffee-list').html(coffeeTable);

        var mapData = {
          latitude: lat,
          longitude: lon,
          locations: locations
        };

        var coffeeMap = Mustache.render(coffeeMapTemplate, mapData);
        $('.coffee-map').html(coffeeMap);

      });
    });

}).catch(function(err) {

  console.log(err);

});

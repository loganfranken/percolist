var coffeeTableTemplate = $('#coffee-table-template').html();

geoid.getPosition().then(function(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var map = document.querySelector('google-map');
    map.latitude = lat;
    map.longitude = lon;

    fetch('/locations?lat=' + lat + '&lon=' + lon).then(function(response) {
      response.json().then(function(locations) {

        console.log(locations);

        var coffeeTable = Mustache.render(coffeeTableTemplate, { locations: locations });
        $('.coffee-list').html(coffeeTable);

      });
    });

}).catch(function(err) {

  console.log(err);

});

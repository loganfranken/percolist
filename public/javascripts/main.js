// Define Mustache templates
var coffeeTableTemplate = $('#coffee-table-template').html();
var coffeeMapTemplate = $('#coffee-map-template').html();

// Get user's location
geoid.getPosition().then(function(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Retrieve coffee shops around that location
    fetch('/locations?lat=' + lat + '&lon=' + lon).then(function(response) {
      response.json().then(function(locations) {

        // Determine if the user has already visited some of the locations
        locations.forEach(function(location) {
          location.visited = (localStorage.getItem(location.id));
        });

        // Render the table of coffee locations
        var coffeeTable = Mustache.render(coffeeTableTemplate, { locations: locations });
        $('.coffee-list').html(coffeeTable);

        var mapData = {
          latitude: lat,
          longitude: lon,
          locations: locations
        };

        // Render the map of coffee locations
        var coffeeMap = Mustache.render(coffeeMapTemplate, mapData);
        $('.coffee-map').html(coffeeMap);

      });
    });

}).catch(function(err) {
  console.log(err);
});

$('.coffee-list').on('click', '.btn-check-in', function() {

  var $this = $(this);
  var id = $this.attr('data-id');

  var timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

  // Display the "visited" timestamp on the page and also store it in
  // local storage
  localStorage.setItem(id, timestamp);
  $this.after(timestamp).remove();

});

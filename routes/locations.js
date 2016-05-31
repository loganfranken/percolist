var config = require('./../config');
var express = require('express');
var router = express.Router();
var Yelp = require("yelp");

var MAX_LOCATIONS = 10;

router.get('/', function(req, res, next) {

  var lat = req.query.lat;
  var lon = req.query.lon;

  var yelp = new Yelp({
    consumer_key: config.yelpConsumerKey,
    consumer_secret: config.yelpConsumerSecret,
    token: config.yelpToken,
    token_secret: config.yelpTokenSecret
  });

  yelp.search({term: "coffee", ll: lat + "," + lon}, function(error, data) {

    var locations = [];

    data.businesses.forEach(function(business) {

      if(locations.length >= MAX_LOCATIONS)
      {
        return;
      }

      locations.push({
        id: business.id,
        name: business.name,
        latitude: business.location.coordinate.latitude,
        longitude: business.location.coordinate.longitude
      });

    });

    res.json(locations);

  });

});

module.exports = router;

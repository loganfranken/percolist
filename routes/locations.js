var config = require('./../config');
var express = require('express');
var router = express.Router();
var Yelp = require("yelp");

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
    res.json(data.businesses);
  });

});

module.exports = router;

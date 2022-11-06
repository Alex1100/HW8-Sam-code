const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
// Allowing X-domain request
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);

const yelp = require("yelp-fusion");

const client = yelp.client(
  "CMGfnejuoklneAxbMTNauLJ5TuMMHdUi46j2Bcj1_UljXWuyySNCmgjHJUqd2xTQxU_QzBE9r2TgYzx_G1A4TfQj46vRbi8VN5RIiqqTCDUmC9OjvaZFQx-zipxAY3Yx"
);

// call auto complete
app.get("/api/autocomplete", (req, res) => {
  client
    .autocomplete({ text: req.query.keyword })
    .then((response) => {
      res.json(response.jsonBody.terms);
    })
    .catch((error) => {
      res.json(error);
    });
});

// call get businesses
app.get("/api/getBusinesses", (req, res) => {
  let searchRequest = {
    term: req.query.keyword,
    location: req.query.location,
    radius: parseInt(req.query.distance),
    categories: req.query.category,
  };

  console.log(searchRequest);

  client
    .search(searchRequest)
    .then((response) => {
      res.json(response.jsonBody);
    })
    .catch((error) => {
      res.json(error);
    });
});
// call get getBusinesses by current location
app.get("/api/getBusinessesByCoords", (req, res) => {
  let searchRequest = {
    term: req.query.keyword,
    radius: parseInt(req.query.distance),
    categories: req.query.category,
    latitude: req.query.latitude,
    longitude: req.query.longitude,
  };

  console.log(searchRequest);

  client
    .search(searchRequest)
    .then((response) => {
      res.json(response.jsonBody);
    })
    .catch((error) => {
      res.json(error);
    });
});

// get business by id
app.get("/api/business", (req, res) => {
  id = req.query.id;
  client
    .business(id)
    .then((response) => {
      res.json(response.jsonBody);
    })
    .catch((error) => {
      res.json(error);
    });
});
// get business reviews
app.get("/api/reviews", (req, res) => {
  id = req.query.id;
  client
    .reviews(id)
    .then((response) => {
      res.json(response.jsonBody);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(3000, (req, res) => {
  console.log("Express API is running at port 3000");
});

// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 8080;
const app = express();
const { getAllMaps, getMarkers } = require('./db/queries/maps'); //helper function to get all maps in db

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser())

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const user = require('./routes/user');
const map = require('./routes/map');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/map', map);
app.use('/u', user);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', async (req, res) => {
  try {
    //get all maps from db
    const allMaps = await getAllMaps();

    //iterate allmaps getting markers for each
    const mapMarkers = await Promise.all(
      allMaps.map(async (map) => {
        const markers = await getMarkers(map.id);
        return { map, markers };
      })
    );

    //render template with maps data
    res.render('index.ejs', { allMaps, mapMarkers})
  } catch(err) {
    console.error('Error getting maps:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


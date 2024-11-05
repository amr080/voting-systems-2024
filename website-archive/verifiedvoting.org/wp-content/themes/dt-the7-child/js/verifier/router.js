/* router handles the #history navigation so our back and forward buttons work in the browser! */

var Router = Backbone.Router.extend({
  // route everything to the same place, cut out the state county and division if it's there
  routes: {
    "": "get_area",
    "(mode/:mode)(/map/:map)(/mapType/:mapType)(/year/:year)(/state/:state)(/county/:county)(/division/:division)(/)(/equipment/:equipment)(/)(/make/:make)(/)(/model/:model)(/)": "get_area",
    "*path": "defaultRoute" // Backbone will try match the route above first
  }
});

var router = new Router;

// router.on('route:get_area', function (db_year, state_fips, county_fips, division_fips) {
router.on('route:get_area', function (mode, map, mapType, year, state, county, division, equipment, make, model) {
  equipment = equipment ? router.decodeParam(equipment) : undefined;
  make = make ? router.decodeParam(make) : undefined;
  model = model ? router.decodeParam(model) : undefined;
  // console.log('--------------- ROUTER TRIGGERED ------------------');

  // if we don't have a mode we set the default mode to appConstants.mode.navigate
  if (!mode) {
    mode = appConstants.mode.navigate;
  }

  // for appConstants.mode.navigate we need to have a default map value
  if (mode === appConstants.mode.navigate && !map) {
    map = appConstants.map.ppEquip;
  }

  // for appConstants.mode.navigate we need to have a default mapType value
  if (mode === appConstants.mode.navigate && !mapType) {
    mapType = appConstants.mapType.normal;
  }

  // for appConstants.mode.navigate we need to have a default years value
  if (!year) {
    // set the default year to 2022 - be careful that this will also change the verifier.year field
    year = appConstants.defaultYear;
  }

  var appState = {
    mode: mode,
    map: map,
    mapType: mapType
  };
  var options = {
    year: year,
    state: state,
    county: county,
    division: division,
    equipment: equipment,
    make: make,
    model: model
  };

  var db_options = {};

  if (state) db_options['state_fips'] = state;
  if (county) db_options['county_fips'] = county;
  if (division) db_options['division_fips'] = division;
  if (year) db_options['db_year'] = year;
  if (equipment) db_options['equipment'] = equipment;
  if (make) db_options['make'] = make;
  if (model) db_options['model'] = model;

  // otherwise we'll have discrepancy between the route and what we are displaying
  var currentHash = router.getCurrentHash();
  var calculatedHash = router.buildHash(appState) + router.buildHash(options);

  // console.log('old hash: ' + currentHash);
  // console.log('new hash: ' + calculatedHash);

  if (currentHash !== calculatedHash) {
    // console.log("(!!!) current hash is different that the calculated one!");
    // console.log('--------------- /ROUTER TRIGGERED -----------------');
    router.navigate(calculatedHash, {trigger: true});
  } else {
    verifier.route(appState, db_options);
    // console.log('--------------- /ROUTER TRIGGERED -----------------');
  }
});

router.on('route:defaultRoute', function (path) {
  console.error("no route for path: " + path);
});

router.encodeParam = function (val) {
  val = '' + val;
  return encodeURI(val.replaceAll("/", "|"));
}

router.decodeParam = function (val) {
  return decodeURI(val).replaceAll("|", "/");
}

/**
 * Build a hash from an object.
 */
router.buildHash = function (options) {
  var hash = '';
  $.each(options, function (key, val) {
    if (val && val !== 0) {
      val = router.encodeParam(val);
      hash += '/' + key + "/" + val;
    }
  });

  return hash;
}

/**
 * Try to extract current application hash.
 */
router.getCurrentHash = function () {
  var hash;
  if (window.location.hash) {
    var hash = window.location.hash;

    if (hash.startsWith("#")) {
      hash = hash.substring(1); // removes the # character
    }

    if (!hash.startsWith("/")) {
      hash = "/" + hash;
    }
  }

  return hash;
}

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

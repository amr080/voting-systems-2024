
function wordWrap(str, maxWidth) {
  return str.replace(new RegExp(`(?![^\\n]{1,${maxWidth}}$)([^\\n]{1,${maxWidth}})\\s`, 'g'), '$1\<br>');
}

/*****************************************************************************************
 * Aggregator Class
 *****************************************************************************************/
function Aggregator(value) {
  this.value = value || {};
}

/**
 * Track a new value for aggregation.
 */
Aggregator.prototype.addValue = function (name, key, value) {
  if (key !== undefined) {
    this.value[name + "-" + (key ? key.replace('-', ' ') : key)] = value;
  }
}

/**
 * Aggregates 2 "Aggregator" objects.
 */
Aggregator.prototype._aggregate = function (from, to) {
  Object.keys(from).forEach(function (key) {
    if (to[key]) {
      to[key] += from[key]
    } else {
      to[key] = from[key]
    }
  });

  return to;
}

/**
 * Aggregates current object with another "Aggregator" object.
 */
Aggregator.prototype.aggregate = function (target) {
  if (target === undefined) {
    return this;
  } else {
    return this._aggregate(target.value, this.value);
  }
}

/**
 * Extracting the object corresponding with a tracked property. See 'addValue'functions.
 */
Aggregator.prototype.get = function (name) {
  if (!this._map) {
    this._map = this.toObject();
  }
// Want to sort here - based on this._map[name]
  var namedMap = this._map[name];
  var sortedMap = namedMap;
//  console.table(sortedMap);
  return namedMap;
}

/**
 * "Exploded" representation of the "flatten" `this.value` properties.
 */
Aggregator.prototype.toObject = function () {
  var objectMap = {};
  var self = this;

  Object.keys(this.value).forEach(function (key) {
    var paths = key.split('-');
    if (paths.length === 2) {
      if (objectMap[paths[0]] === undefined) {
        objectMap[paths[0]] = {}
      }
      objectMap[paths[0]][paths[1]] = self.value[key];
    }
  });

  return objectMap;
}

/**
 * Reset all map values for the search since the results display are delayed until the user hits the "Display" button.
 */
function resetSearchValues(features) {
  features.forEach(function (feature) {
    feature.properties.pp_system = "deselected";
    feature.properties.searchresult = "deselected";
  });
}


function aggregateMap(features, infoData) {
  var t0 = performance.now();

  if (verifier.current.level === appConstants.level.national) {
    var states = {};

    // extract only states
    features.forEach(function (feature) {
      if (feature.properties.STATE !== undefined
        && (feature.properties.COUNTY === undefined || parseInt(feature.properties.COUNTY, "10") === 0)) {
        feature.properties.aggregator = new Aggregator();
        feature.properties.aggValues = {};
        if (states[feature.properties.STATE] === undefined) {
          states[feature.properties.STATE] = feature;
        }
      }
    });

    // aggregate codes
    if (infoData !== undefined) {
      infoData.forEach(function (feature) {
        if (feature.STATE !== undefined
          && feature.COUNTY !== undefined && parseInt(feature.COUNTY, "10") !== 0) {
          var state = states[feature.STATE];

          if (state !== undefined) {
            var stateId = parseInt(feature.STATE, "10");
            var countyId = parseInt(feature.COUNTY, "10");
            var divisionID = parseInt(feature.DIVISION, "10");
            var voters = parseInt(feature.current_reg_voters, "10");
            var key = 'state-' + stateId + "_county-" + countyId + "_division-" + divisionID + "_voters-" + voters;

            // keep track of counted values at national level
            if (state.properties.aggValues[key] === undefined) {
              state.properties.aggValues[key] = 1;

              var aggregator = new Aggregator();
              addAggregatorMetrics(aggregator, feature);

              state.properties.aggregator = new Aggregator(state.properties.aggregator.aggregate(aggregator));
//             console.log("adding to key: " + key);
            } else {
//             console.log("ignoring: " + key);
            }
          }
        }
      });
    }

    Object.keys(states).forEach(function (key) {
      var state = states[key];

      // this are exceptions (Alaska, DC, etc..) where we can not collect the data from Counties
      // and set the values from the State level
      if (_.isEmpty(state.properties.aggregator.toObject())) {
        var aggregator = new Aggregator();
        addAggregatorMetrics(aggregator, state.properties);

        state.properties.aggregator = new Aggregator(state.properties.aggregator.aggregate(aggregator));
      }
    });
  } else {
    // aggregate codes for non national levels
    features.forEach(function (feature) {
      var aggregator = new Aggregator();
      addAggregatorMetrics(aggregator, feature.properties);

      feature.properties.aggregator = aggregator;
    });
  }

  var t1 = performance.now();
  // console.log("[aggregateMap] took " + (t1 - t0) + " milliseconds.");
}

/**
 * Build Aggregator main metrics.
 */
function addAggregatorMetrics(aggregator, properties) {
  var voters = parseInt(properties.current_reg_voters, "10");
  voters = voters ? voters : 0;

  if (voters !== 0) {
    aggregator.addValue("pp_system", properties.pp_system, voters);
    aggregator.addValue("pp_acc_system", properties.pp_acc_system, voters);
    aggregator.addValue("abs_system", properties.abs_system, voters);
    aggregator.addValue("epb_system", properties.epb_system, voters);
    aggregator.addValue("epb_make", properties.epb_make, voters);

    if (properties.make !== undefined && properties.make !== null) {
      if (properties.make == 'AVM' || properties.make == 'Shoup') {
        aggregator.addValue("make", 'Lever Machines (AVM/Shoup)', voters);
      } else if (properties.make == "Hand Counted Paper Ballots") {
      } else {
        aggregator.addValue("make", properties.make, voters);
      }
    } else {
//      aggregator.addValue("make", "Hand Counted Paper Ballots", voters);
    }
  }

  addAtAGlanceMetrics(aggregator, properties);
}

/**
 * Build "At A Glance" Section Metrics.
 */
function addAtAGlanceMetrics(aggregator, properties) {
  var voters = parseInt(properties.current_reg_voters, "10");
  voters = voters ? voters : 0;

  if (voters !== 0) {
    aggregator.addValue("metric", "voters", voters);

    if (properties.pp_system) {
      if (properties.pp_system.toLowerCase() === "hmpb"
        || properties.pp_system.toLowerCase() === "hmpn"
        || properties.pp_system.toLowerCase() === "hbdv"
        || properties.pp_system.toLowerCase() === "mpdv"
        || properties.pp_system.toLowerCase() === "mpdn"
        || properties.pp_system.toLowerCase() === "mpdx"
        || properties.pp_system.toLowerCase() === "pbdn"
        || properties.pp_system.toLowerCase() === "pcvs") {
        aggregator.addValue("metric", "handMarkedPaperBallots", voters);
      }

      if (properties.pp_system.toLowerCase() === "bmds"
        || properties.pp_system.toLowerCase() === "bmos"
        || properties.pp_system.toLowerCase() === "bmdn"
        || properties.pp_system.toLowerCase() === "hmbx") {
        aggregator.addValue("metric", "ballotMarkingDevices", voters);
      }

      if (properties.pp_system.toLowerCase() === "drev"
        || properties.pp_system.toLowerCase() === "dren") {
        aggregator.addValue("metric", "dreSystems", voters);
      }
    }

    if (properties.pp_acc_system) {
      if (properties.pp_acc_system.toLowerCase() === "bmds"
        || properties.pp_acc_system.toLowerCase() === "mbdv"
        || properties.pp_acc_system.toLowerCase() === "mbdn") {
        aggregator.addValue("metric", "accBallotMarkingDevices", voters);
      }

      if (properties.pp_acc_system.toLowerCase() === "bmos") {
        aggregator.addValue("metric", "accHybridBmdTabulators", voters);
      }

      if (properties.pp_acc_system.toLowerCase() === "drev"
        || properties.pp_acc_system.toLowerCase() === "dren") {
        aggregator.addValue("metric", "accDreSystems", voters);
      }
    }

    if (properties.abs_system) {
      if (properties.abs_system.toLowerCase() === "hcpb") {
        aggregator.addValue("metric", "handCounted", voters);
      }

      if (properties.abs_system.toLowerCase() === "hfos"
        || properties.abs_system.toLowerCase() === "hcos") {
        aggregator.addValue("metric", "handFedOptical", voters);
      }

      if (properties.abs_system.toLowerCase() === "bfos") {
        aggregator.addValue("metric", "batchFedOptical", voters);
      }
    }

    if (properties.epb_system) {
      if (properties.epb_system.toLowerCase() === "commercial electronic poll book"
        || properties.epb_system.toLowerCase() === "data unavailable") {
        aggregator.addValue("metric", "commercial", voters);
      }

      if (properties.epb_system.toLowerCase() === "in-house electronic poll book"
        || properties.epb_system.toLowerCase() === "in house") {
        aggregator.addValue("metric", "inHouse", voters);
      }

      if (properties.epb_system.toLowerCase() === "paper poll book") {
        aggregator.addValue("metric", "paper", voters);
      }

      // used just for debugging; this if statement can be safely removed
      if (properties.epb_system.toLowerCase() !== "commercial electronic poll book"
        && properties.epb_system.toLowerCase() !== "data unavailable"
        && properties.epb_system.toLowerCase() !== "in house"
        && properties.epb_system.toLowerCase() !== "in-house electronic poll book"
        && properties.epb_system.toLowerCase() !== "paper poll book") {
        console.log("No mapping for: " + properties.epb_system);
      }
    } else {
      // TODO
      aggregator.addValue("metric", "commercial", voters);
    }
  }
}

/**
 * For non national level migrate codes fields to feature properties.
 */
function consolidateFeatures(codes, features) {
  features = _.filter(features, function (feature) {
    if (feature.properties.STATE === "72"
      && verifier.current.level === appConstants.level.national) {
      feature.geometry = undefined;
    }

    return true;
    // return feature.properties.STATE !== "72";
  });

  if (verifier.current.level === appConstants.level.national) {
    // add "general" Hawaii state
    features.push({
      properties: {
        NAME: "Hawaii",
        STATE: "15"
      }
    })
  }

  if ((verifier.mode === appConstants.mode.navigate || verifier.mode === appConstants.mode.search || verifier.mode === appConstants.mode.visualization)
    && verifier.current.level !== appConstants.level.national) {
    var codesMap = {};
    _(codes).each(function (code) {
      if (code.state_fips === "11" || code.state_fips === "2") {   // Alaska & D.C.
        codesMap[code.state_fips.replace(/^0+/, '')] = code;
      } else {
        codesMap[code.county_fips.replace(/^0+/, '')] = code;
      }
    });

    _(features).each(function (feature) {
      var code;

      if (feature.properties.STATE === "11" || feature.properties.STATE === "02") {   // Alaska & D.C.
        code = codesMap[feature.properties.STATE.replace(/^0+/, '')];
      } else {
        code = codesMap[feature.properties.COUNTY.replace(/^0+/, '')];
      }

      if (code !== undefined) {
        feature.properties.NAME = code.name;
        feature.properties.county_name = code.county_name;
        feature.properties.pp_system = code.pp_system.toLowerCase();
        feature.properties.pp_acc_system = code.pp_acc_system.toLowerCase();
        feature.properties.abs_system = code.abs_system.toLowerCase();
        feature.properties.epb_system = code.epb_system;
        feature.properties.make = code.make;
        feature.properties.current_reg_voters = code.current_reg_voters;
        feature.properties.current_precincts = code.current_precincts;
        feature.properties.current_count_polling_places = code.current_count_polling_places;
        feature.properties.marking_method = code.marking_method;
        feature.properties.tabulation = code.tabulation;
        feature.properties.vote_center = code.vote_center;
        feature.properties.all_mail_ballot = code.all_mail_ballot;

        if (verifier.current.map) {
          let legendCode = code[verifier.current.map.data_field_name] ? verifier.current.legend_codes[code[verifier.current.map.data_field_name].toUpperCase()] : null;

          if(verifier.current.map.map_code === "fieldedEquip") {
            if(!legendCode && parseInt(code[verifier.current.map.data_field_name]) < 2004) {
              legendCode = verifier.current.legend_codes["2004"];
            }

            // feature.properties[verifier.current.map.data_field_name] = legendCode;
            // Should pull these from db/codes
            verifier.current.map.map_types.forEach((map) => {
              let fyfCode = code[map.data_field_name];

              if(fyfCode) {
                fyfCode = fyfCode.toUpperCase();

                if(parseInt(fyfCode) < "2004") {
                  feature.properties[map.data_field_name] = verifier.current.popover_codes["2004"];
                  feature.properties[map.data_field_name].text = fyfCode;
                }
                else {
                  feature.properties[map.data_field_name] = verifier.current.popover_codes[fyfCode];
                }
              }
            });
          }

          feature.properties.audit_main = verifier.current.popover_codes[code['audit_main']];
          feature.properties.audit_binding = verifier.current.popover_codes[code['audit_main']];
          feature.properties.audit_comprehensiveness = verifier.current.popover_codes[code['audit_main']];

          if (legendCode && !map.legendCodes.includes(legendCode)) {
            map.legendCodes.push(legendCode);
          }
        }
      }
    });
  }

  /**
      }
   * Consolidate codes
   */
  _(features).each(function (feature) {
    if (verifier.mode === appConstants.mode.navigate) {

      // this are some rules exceptions for "Polling Place"
      if (verifier.mapStage === appConstants.map.ppEquip) {
        if (feature.properties.pp_system === "bmds") {
          feature.properties.pp_system = "bmds_pp";
        }
      }

      // this are some rules exceptions for "Accessible Equipment"
      else if (verifier.mapStage === appConstants.map.accEquip) {
        if (feature.properties.pp_acc_system === "bmds") {
          feature.properties.pp_acc_system = "bmds_acc";
        }
        if (feature.properties.pp_acc_system === "bmdn") {
          feature.properties.pp_acc_system = "bmds_acc";
        }
      } else if (verifier.mapStage === appConstants.map.absEquip) {
        // these are some exceptions for "Mail Ballot Tabulation"
        if (feature.properties.abs_system === "pcvs") {
          feature.properties.abs_system = "pcvs_mail";
        }

        if (feature.properties.abs_system === undefined || feature.properties.abs_system === "unon") {
          feature.properties.abs_system = "none_abs";
        }
      }
    } else if (verifier.mode === appConstants.mode.search) {
      // these are some exceptions for "Search"
      if ((feature.properties.pp_system !== undefined) && (feature.properties.pp_system.toLowerCase() === "bmds")) {
        feature.properties.pp_system = "bmds_search";
      }
    }


  });

  return features;
}

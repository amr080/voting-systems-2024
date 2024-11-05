/**
 * Verifier is the main controller for the whole app.
 *
 * All requests to change the current location of the map (verifier.navigate) or
 * run search queries (verifier.search) are routed through here.
 *
 * This module also triggers all re-rending when the ajax api returns from {@link verifier#_render}.
 */

// Change devsite setting here - check if user is logged in and is an admin also, else vvfdevsite is false
if (window.location.hostname == 'http://localhost:8888/' || window.location.hostname == 'verifiedvoting.eppi.com') {
  var vvfdevsite = true;
} else {
  var vvfdevsite = false;
  var user = 'anonymous';
}

// this are some constants used across the application; it's better to just use a constant object instead of using Strings.
var appConstants = {
  // control the Year Parameter across the verifier map from here: [startYear, endYear]
  startYear: 2006,
  endYear: 2024,
  defaultYear: 2024,
  includeTerritories: false,
  mode: {
    navigate: "navigate",
    audit: "audit",
    visualization: "visualization",
    search: "search"
  },
  minimumYear: {
    ppEquip: 2006,
    accEquip: 2006,
    absEquip: 2006,
    epbEquip: 2006,
    makeEquip: 2006,
    auditLaw: 2022,
    fieldedEquip: 2020,
    pollingplaceData: 2022
  },
  map: {
    ppEquip: "ppEquip",
    accEquip: "accEquip",
    absEquip: "absEquip",
    epbEquip: "epbEquip",
    makeEquip: "makeEquip",
    auditLaw: "auditLaw",
    fieldedEquip: "fieldedEquip"
  },
  mapName: {
    ppEquip: "Election Day Equipment",
    accEquip: "Accessible Equipment",
    absEquip: "Mail Ballot Tabulation",
    epbEquip: "Poll Books",
    makeEquip: "Manufacturers",
    auditLaw: "Post-Election Audits",
    fieldedEquip: "First Year in Use"
  },
  mapType: {
    normal: "normal",
    pieChart: "pieChart",
    auditMain: "audit",
    auditBinding: "binding",
    auditComp: "comp"
  },
  level: {
    national: "national",
    state: "state",
    county: "county",
    division: "division"
  }
};

var verifier = {
  current: {},
  year: undefined,
  mode: undefined,
  mapStage: undefined,
  mapType: undefined,
  state: undefined,
  county: undefined,
  division: undefined,
  equipment: undefined,
  make: undefined,
  model: undefined,
  xhr_connection: null,
  xhr_info_ony_connection: null,
  user: user,

  searchResetClick: false,
  searchMapClick: false,

  initialize: function () {
    map.initialize();
  },

  /**
   * Render the Verifier Info Section. Usually this is triggered by API callback but it's not always true.
   * As a rule of thumb we should call this function only from the "verifier" object itself (self calling).
   */
  _render_info: function () {
    // console.log("--->>> __render_info__ call");
    if (verifier.mode === appConstants.mode.navigate) {
      legend.remove();
      legend.render();
      if (verifier.mapStage === appConstants.map.makeEquip
        || verifier.mapStage === appConstants.map.accEquip
        || verifier.mapStage === appConstants.map.auditLaw
        || verifier.mapStage === appConstants.map.fieldedEquip) {
        glancebox.remove();
      } else {
        glancebox.render();

        if (verifier.mapStage === appConstants.map.epbEquip) {
          pollbooks.render();
        } else if (verifier.mapStage === appConstants.map.absEquip) {
          mailballot.render();
        } else {
          votingequipment.render();
        }
      }
    }
  },

  /**
   * Render the Verifier App Page. Usually this is triggered by API callback but it's not always true.
   * As a rule of thumb we should call this function only from the "verifier" object itself (self calling).
   */
  _render: function () {
    // console.log("--->>> __render__ call");

    if (verifier.mode === appConstants.mode.navigate) {
      // remove sections that are not related with navigation mode
      search.remove();
      search_results.remove();
      visualizations.remove();

      setTimeout(function () {
        map.render();
        legend.render();
        territories.render();
        download.render();
        // glancebox.render(); // this is rendered in _render_info call.
      }, 0)

      download.render();
      title.render();

      if (verifier.mapStage === appConstants.map.absEquip) {
        yearTimeline.render();
        votingequipment.remove();
        pollbooks.remove();
        mailballot.render();
      } else if (verifier.mapStage === appConstants.map.epbEquip) {
        yearTimeline.render();
        votingequipment.remove();
        mailballot.remove();
        pollbooks.render();
      } else if (verifier.mapStage === appConstants.map.makeEquip) {
        yearTimeline.render();
        votingequipment.remove();
        mailballot.remove();
        pollbooks.remove();
      } else {
        yearTimeline.render();
        votingequipment.render();
        mailballot.remove();
        pollbooks.remove();
      }

      if (verifier.mapStage === appConstants.map.auditLaw) {
        voterlegend.remove();
        maptoggle.render();
        official.render();
        region_select.render();
        machine_results.remove();
        jurisdiction_search.render();
      } else {
        voterlegend.render();
        maptoggle.render();
        official.render();
        region_select.render();
        machine_results.render();
        jurisdiction_search.render();
      }
    }

    if (verifier.mode === appConstants.mode.search) {
      // remove sections that are not related with search mode
      visualizations.remove();

      yearTimeline.remove();
      maptoggle.remove();
      voterlegend.remove();
      official.remove();
      region_select.remove();
      machine_results.remove();
      glancebox.remove();
      mailballot.remove();
      pollbooks.remove();
      jurisdiction_search.remove();

      setTimeout(function () {
        map.render();
        legend.render();
        territories.render();
        verifier.searchResetClick = false;
        verifier.searchMapClick = false;
      }, 0)

      title.render();
      search.render();
      search_results.render();
      download.render();
      votingequipment.render();
    }

    if (verifier.mode === appConstants.mode.visualization) {
      // remove sections that are not related with search mode
      search.remove();
      search_results.remove();

      map.remove();

      title.remove();
      maptoggle.remove();
      voterlegend.remove();
      territories.remove();
      official.remove();
      region_select.remove();
      machine_results.remove();
      glancebox.remove();
      legend.remove();
      download.remove();
      mailballot.remove();
      pollbooks.remove();
      votingequipment.remove();
      jurisdiction_search.remove();

      yearTimeline.render();
      visualizations.render();
    }
  },

  /*****************************************************************************************
   * Navigation/Routing Functions
   *****************************************************************************************/
  /**
   * Public interface for views to navigate to specific option params.
   *
   * This should be the only entry point of the application that knows how to manipulate URLs hash,
   * so no other "router.navigate" calls in any other functions!
   *
   * @param options
   */
  navigate: function (options) {
    var hash = router.getCurrentHash();

    // if we are in search mode, we just redo the entire hash in a particular order specific to search route
    if (verifier.mode === appConstants.mode.search) {
      var searchOptions = ["year", "state", "equipment", "make", "model"];  // this is also the order of the search params
      var currentOptions = hash.split("/");

      if(verifier.current.level === appConstants.level.state && verifier.searchMapClick) {
        //removes all the params related to search and switches mode to navigate
        var currentValues = {
          mode: appConstants.mode.navigate
        };
      }
      else {
        var currentValues = {         // define all the possible values.
          mode: appConstants.mode.search,
          year: undefined,
          state: undefined,
          equipment: undefined,
          make: undefined,
          model: undefined
        };

        if (currentOptions.length > 1) {
          for (var i = 0; i < searchOptions.length; i++) {
            for (var j = 1; j < currentOptions.length; j += 2) {  // index-1 based
              if (currentOptions[j] === searchOptions[i]) {
                currentValues[currentOptions[j]] = currentOptions[j + 1];
                break;
              }
            }
          }
        }
      }

      // copy the new values and reset the hash
      _.extend(currentValues, options);
      options = currentValues;
      hash = "/";
    }

    $.each(options, function (key, val) {
      var regex = new RegExp(key + "\\/[a-zA-Z0-9%&\\-\\(\\)]*", "g");

      if (val && val !== 0) {
        val = router.encodeParam(val);
        if (hash.includes(key)) {
          hash = hash.replace(regex, key + "/" + val);
        } else {
          hash += hash.endsWith("/") ? "" : "/"
          hash += key + "/" + val;
        }
      } else {
        // we have a key but it's value is undefined/null/"" so we need to remove this key from the URL
        if (hash.includes(key)) {
          hash = hash.replace(regex, "");
          hash = hash.replace("//", "/");
        }
      }
    });

    // console.log(">>>>>>>> [navigate] - " + hash)

    router.navigate(hash, {trigger: true});
  },

  /**
   * This is called from router when the history hash changed.
   * This should be the only place where we should update App State!
   */
  route: function (appState, options) {
    var shouldCallApi = this.shouldCallApi(appState, options);

    // update App State
    if (appState.mode) {
      this.mode = appState.mode;
    }
    this.mapStage = appState.map;
    this.mapType = appState.mapType;
    if (options.db_year) {
      this.year = options.db_year;
    }
    this.state = options.state_fips;
    this.county = options.county_fips;
    this.division = options.division_fips;
    this.equipment = options.equipment;
    this.make = options.make;
    this.model = options.model;

    arg = '';   // build the API params
    $.each(options, function (key, val) {
      arg += arg ? '&' : '';
      arg += key + "=" + val;
    });

    // verify if it's necessary to make an API call
    if (shouldCallApi === true) {
      // if we are in visualization mode we want to fetch only the info without the geometry data
      if (verifier.mode === appConstants.mode.visualization) {
        arg += "&info_only=1";
      }
      if (verifier.mode === appConstants.mode.search) {
        // if the search page was opened directly we need to be sure that the search form is displayed before we do the API call
        if ($('#machine-search').is(':visible') === false) {
          var self = this;
          $(document).ready(function () {
            search.render();
            self._search_api();
          });
        } else {
          this._search_api();
        }
      } else {
        if (verifier.mode === appConstants.mode.navigate) {
          this._navigate_info_only_api(arg);
          arg += `&map=${this.mapStage}&map_type=${this.mapType}`;
        }

        this._navigate_api(arg);
      }
    } else {
      // hide "at a glance" box for not "Make"
      if (verifier.mode === appConstants.mode.navigate) {
        if (verifier.mapStage === appConstants.map.makeEquip
          || verifier.mapStage === appConstants.map.accEquip) {
          if ($('#glancebox-inner').is(':visible') === true) {
            glancebox.remove();
          }
        } else {
          glancebox.render();
        }
      }

      // don't automatically render the page if we are in search mode
      if (verifier.mode !== appConstants.mode.search) {
        verifier._render();
      }
    }
  },

  shouldCallApi: function (appState, options) {
    if (this.mode && appState.mode === this.mode) {
      // don't call the navigation API if we are in search mode (beside when user is clicking on a Map state)
      if (this.mode === appConstants.mode.search && this.searchMapClick === false) {
        return false;
      }

      if(this.current.year !== options.db_year) {
        return true;
      }

      //call API if switching to or from auditLaw map from any other map type
      if (this.mapStage !== appState.map) {
        return true;
      }
    }

    // we enter for the first time on "visualization" module
    if (this.mode && appState.mode !== this.mode && appState.mode === appConstants.mode.visualization) {
      return true;
    }

    // for now we only have this cases
    if (this.mapType && appState.mapType !== this.mapType) {
      if(appState.map === appConstants.map.auditLaw || appState.map === appConstants.map.fieldedEquip) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  },

  /**
   * Function that parses a GeoJSON Feature Properties and tries to navigate to it by calling {@link verifier#navigate}.
   *
   * @param featureProperties
   */
  navigateElement: function (featureProperties) {
    if (this.mode === appConstants.mode.search) {
      verifier.searchMapClick = true;
      if (verifier.current.level === appConstants.level.national) {
        // set the search state value since this value is taken from the form serialization
        $('#search-state').val(parseInt(featureProperties.STATE, "10"));

        verifier.navigate({
          year: verifier.year,
          state: parseInt(featureProperties.STATE, "10")
        });
      }
    }

    verifier.navigate({
      year: verifier.year,
      state: parseInt(featureProperties.STATE, "10"),
      county: parseInt(featureProperties.COUNTY ? featureProperties.COUNTY : 0, "10"),
      division: featureProperties.COUSUB ? parseInt(featureProperties.COUSUB, "10") : ''
    });
  },

  navigateMap: function (state, county, division) {
    verifier.navigate({
      state: state,
      county: county,
      division: division,
      year: verifier.year
    });
  },

  /**
   * Call the API to fetch Map data.
   */
  _navigate_api: function (args) {
    // abort any existing API request
    if (this.xhr_connection) {
      console.log('aborting xhr');
      this.xhr_connection.abort();
    }
    title.loadingShow();

    this.xhr_connection = $.getJSON('/wp-content/themes/dt-the7-child/verifier/api/api_sandbox.php?' + args, function (data) {
//      console.log('VERIFIER API CAME BACK X ' + args);
      // $('#ajax-loader').hide();

      if (verifier.mode === appConstants.mode.visualization) {
        verifier.current.infoData = JSON.parse(data).response;
        verifier.current.level = appConstants.level.national;
      } else {
        var infoData = verifier.current.infoData;
        verifier.current = data;
        verifier.current.infoData = infoData;

        verifier.current.area = JSON.parse(verifier.current.area);
      }

      verifier._render();
      verifier.xhr_connection = null;
    });
  },

  /**
   * Call the INFO API.
   */
  _navigate_info_only_api: function (args) {
    // abort any existing API request
    if (this.xhr_info_ony_connection) {
      console.log('aborting xhr');
      this.xhr_info_ony_connection.abort();
    }

    this.xhr_info_ony_connection = $.getJSON('/wp-content/themes/dt-the7-child/verifier/api/api_sandbox.php?info_only=1&' + args, function (data) {
//      console.log('VERIFIER INFO API CAME BACK X ' + args);

      if (verifier.state !== undefined) {
        verifier.current.level = appConstants.level.state;

        var state = _.find(region_select.states,
          function (item) {
            return parseInt(item.state, "10") === parseInt(verifier.state, "10");
          });

        if (state !== undefined) {
          verifier.current.state_name = state.name;
        }
      } else {
        verifier.current.level = appConstants.level.national;
      }

      verifier.current.infoData = JSON.parse(data).response;

      verifier._render_info();
      verifier.xhr_info_ony_connection = null;
    });
  },

  /**
   * Call the API to fetch Search data.
   */
  _search_api: function () {
    $('#ajax-loader').show();

    this.xhr_connection = $.getJSON('/wp-content/themes/dt-the7-child/verifier/api/api_sandbox.php?advanced&' + $('#machine-search').serialize(), function (data) {
      $('#ajax-loader').hide();
      var infoData = verifier.current.infoData;
      verifier.current = data;
      verifier.current.infoData = infoData;
      verifier.current.area = JSON.parse(verifier.current.area);
      verifier._render();
      verifier.xhr_connection = null;
    });
  },

  /**
   * Switches on/off "includeTerritories" property
   * @param checkbox
   */
  changeIncludeTerritories: function (checkbox) {
    appConstants.includeTerritories = checkbox.checked;

    if (verifier.mode === appConstants.mode.visualization) {
      visualizations.render();
    } else {
      verifier._render_info();
      maptoggle.render();
    }
  },

  /**
   * Changes the year of the application.
   * @param year
   */
  changeYear: function (year) {
    if (this.year !== year) {
      verifier.navigate({
        year: year
      });
    }
  },

  /**
   * Changes the map stage (type) with values from {@link appConstants.map}.
   * @param mapStage
   */
  changeMap: function (mapStage, mapType) {
    if (this.mapStage !== mapStage) {
      // if we are already on 'navigate' mode we just change the mapType, otherwise we reset more parameters since we
      // are coming from search | visualization | or other verifier.mode
      if (verifier.mode === appConstants.mode.navigate) {
        verifier.navigate({
          mode: appConstants.mode.navigate,
          map: mapStage,
          mapType: mapType ? mapType : appConstants.mapType.normal,
          year: this.year >= appConstants['minimumYear'][mapStage] ? this.year : appConstants['minimumYear'][mapStage]
        });
      } else {
        verifier.navigate({
          mode: appConstants.mode.navigate,
          map: mapStage,
          mapType: mapType ? mapType : appConstants.mapType.normal,
          year: undefined,
          state: undefined,
          county: undefined,
          division: undefined,
          equipment: undefined,
          make: undefined,
          model: undefined
        });
      }
    }
  },

  /**
   * Changes the map type of the application.
   * @param mapType
   */
  changeMapType: function (mapType) {
    if (this.mapType !== mapType) {
      verifier.navigate({
        mapType: mapType
      });
    }
  },

  /**
   * Changes the application mode: navigation | search | visualization | etc...
   * @param mode
   */
  changeMode: function (mode) {
    if (this.mode !== mode) {
      verifier.navigate({
        mode: mode,
        // reset all the other filters
        map: undefined,
        mapType: undefined,
        year: undefined,
        state: undefined,
        county: undefined,
        division: undefined,
        equipment: undefined,
        make: undefined,
        model: undefined
      });

      // first render of the search module since automatically render is disabled in route function
      if (verifier.mode === appConstants.mode.search) {
        var json = verifier.current.area;
        resetSearchValues(json.features);
        this._render();
      }
    }
  },

  changeSearchEquipment: function (equipment) {
    if (this.equipment !== equipment) {
      verifier.navigate({
        equipment: equipment
      });
    }
  },

  changeSearchMake: function (make, model_list) {
    if (this.make !== make) {
      $(document.getElementById('search-model')).empty();
      document.getElementById('search-model').options.add(new Option("All Models", ""))
      model_list[document.getElementById('search-make').value].forEach(option =>
        document.getElementById('search-model').options.add(new Option(option, option))
      );
      verifier.navigate({
        make: make
      });
    }
  },

  changeSearchModel: function (model) {
    if (this.model !== model) {
      verifier.navigate({
        model: model
      });
    }
  },

  /**
   * Manually triggers an API call for Search Data.
   */
  search: function () {
    this._search_api();
  },

  titleReturn: function() {

    var statelistbyfips = [];
    statelistbyfips[1] = 'Alabama';
    statelistbyfips[2] = 'Alaska';
    statelistbyfips[4] = 'Arizona';
    statelistbyfips[5] = 'Arkansas';
    statelistbyfips[6] = 'California';
    statelistbyfips[8] = 'Colorado';
    statelistbyfips[9] = 'Connecticut';
    statelistbyfips[10] = 'Delaware';
    statelistbyfips[11] = 'District of Columbia';
    statelistbyfips[12] = 'Florida';
    statelistbyfips[13] = 'Georgia';
    statelistbyfips[15] = 'Hawaii';
    statelistbyfips[16] = 'Idaho';
    statelistbyfips[17] = 'Illinois';
    statelistbyfips[18] = 'Indiana';
    statelistbyfips[19] = 'Iowa';
    statelistbyfips[20] = 'Kansas';
    statelistbyfips[21] = 'Kentucky';
    statelistbyfips[22] = 'Louisiana';
    statelistbyfips[23] = 'Maine';
    statelistbyfips[24] = 'Maryland';
    statelistbyfips[25] = 'Massachusetts';
    statelistbyfips[26] = 'Michigan';
    statelistbyfips[27] = 'Minnesota';
    statelistbyfips[28] = 'Mississippi';
    statelistbyfips[29] = 'Missouri';
    statelistbyfips[30] = 'Montana';
    statelistbyfips[31] = 'Nebraska';
    statelistbyfips[32] = 'Nevada';
    statelistbyfips[33] = 'New Hampshire';
    statelistbyfips[34] = 'New Jersey';
    statelistbyfips[35] = 'New Mexico';
    statelistbyfips[36] = 'New York';
    statelistbyfips[37] = 'North Carolina';
    statelistbyfips[38] = 'North Dakota';
    statelistbyfips[39] = 'Ohio';
    statelistbyfips[40] = 'Oklahoma';
    statelistbyfips[41] = 'Oregon';
    statelistbyfips[42] = 'Pennsylvania';
    statelistbyfips[44] = 'Rhode Island';
    statelistbyfips[45] = 'South Carolina';
    statelistbyfips[46] = 'South Dakota';
    statelistbyfips[47] = 'Tennessee';
    statelistbyfips[48] = 'Texas';
    statelistbyfips[49] = 'Utah';
    statelistbyfips[50] = 'Vermont';
    statelistbyfips[51] = 'Virginia';
    statelistbyfips[53] = 'Washington';
    statelistbyfips[54] = 'West Virginia';
    statelistbyfips[55] = 'Wisconsin';
    statelistbyfips[56] = 'Wyoming';
    statelistbyfips[60] = 'American Samoa';
    statelistbyfips[66] = 'Guam';
    statelistbyfips[69] = 'Northern Mariana Islands';
    statelistbyfips[72] = 'Puerto Rico';
    statelistbyfips[78] = 'US Virgin Islands';

    var titlestring = '';

    if (verifier.mode === appConstants.mode.search) {
      var urlsearchstring = $('#machine-search').serialize();
      var searchparams = urlsearchstring.split("&");

      for (var i = 0; i < searchparams.length; i++) {
        var pair = searchparams[i].split("=");
        if (pair[1]) {
          pairstring = pair[1];
          pairval = pairstring.indexOf("Internet");
          if ((pair[0] === 'equip_type') && ((pair[1].indexOf("Internet") >= 0) || (pair[1].indexOf("Remote") >= 0))) {
            pair[1] += " (certain voters)"
  //          pair[1] += pairstring + pairval
          }
          if (pair[0] === 'state_fips') {
            var state_fips = pair[1];
            titlestring += "/ " + statelistbyfips[state_fips] + " ";
  //          titlestring += "/ " + state_fips + " ";
          } else {
            titlestring += "/ "
              + pair[1]
                .replaceAll("+%26+", " & ")
                .replaceAll("%26", " & ")
                .replaceAll("%2C+", ", ")
                .replaceAll("%2C", ", ")
                .replaceAll("%20", " ")
                .replaceAll("%3A+", ": ")
                .replaceAll("%3A", ": ")
                .replaceAll("%2F", "/")
                .replaceAll("+", " ")
              + " ";
          }
        }
      }
      titlestring = '<strong>Verifier Search - </strong> ' + titlestring.substring(1);
    }
    else {
      titlestring = '<span class="navigate">The Verifier — ' + appConstants.mapName[verifier.mapStage];
      var levelString = verifier.current.level === appConstants.level.national ? '' : ' in ';
      titlestring += levelString + '</span>';
      if (verifier.current.state_name) {
        // There are independent cities that don't have county names; so can have division without county
        if (verifier.current.division_name) {
          titlestring += '<span>' + verifier.current.division_name + "</span>, ";
        }
        if (verifier.current.county_name) {
          titlestring += '<span>' + verifier.current.county_name + '</span>, ';
        }
        titlestring += '<span>' + verifier.current.state_name + '</span>';
      }
      titlestring += ' — November ' + verifier.year;
    }
    return titlestring;
  }

};

var $ = jQuery.noConflict();
$(document).ready(function () {
  verifier.initialize();
});

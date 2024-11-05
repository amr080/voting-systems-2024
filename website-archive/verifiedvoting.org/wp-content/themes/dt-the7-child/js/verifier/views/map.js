/**
 * map.js - view handling all svg drawing
 */
/* mapCodes keys must be lower case */
/* mapCodes name parameter only used in legend.ejs */

var mapCodes = {
  "hmpb": {  /* PAPER BALLOT */
    color: "#0f7442",
    name: "Hand marked paper ballots and BMDs",
    order: 1
  },
  "hmpn": {  /* PAPER BALLOT */
    color: "#0f7442",
    name: "Hand marked paper ballots",
    order: 1
  },
  "bmds_search": {  /* Ballot marking devices in search mode*/
    color: "#fad565",
    name: "Ballot Marking Devices for all voters",
    order: 5
  },
  "bmds": {  /* Ballot marking devices in legend aggregator */
    color: "#fad565",
    name: "Ballot Marking Devices for all voters",
    order: 5
  },
  "hmbx": {  /* Portage County, WI */
    color: "#fad565",
    name: "Hand marked paper ballots and BMDs"
  },
  "bmds_pp": {  /* Ballot marking devices in pp map*/
    color: "#fad565",
    name: "Ballot Marking Devices for all voters",
    order: 5
  },
  "bmds_acc": {  /* Ballot marking devices in accessible map*/
    color: "#0f7442",
    name: "Ballot Marking Devices",
    order: 5
  },
  "mbdn": {
    color: "#0f7442",
    name: "BMDs and DREs without VVPAT"
  },
  "bmos": {  /* Ballot marking devices */
    color: "#ee9154",
    name: "Hybrid BMD/Tabulator for all voters",
    order: 5
  },
  "bmdn": {  /* Ballot marking devices */
    color: "#fad565",
    name: "Ballot Marking Devices for all voters",
    order: 4
  },
  "mpdv": {  /* mixed paper ballot with vvpat */
    color: "#31974d",
    name: "Hand marked paper ballots and DREs with VVPAT",
    order: 2
  },
  "mpdn": {  /* mixed paper ballot without vvpat */
    color: "#a0d464",
    name: "Hand marked paper ballots and DREs without VVPAT",
    order: 3
  },
  "mpdx": {  /* mixed paper ballot without vvpat */
    color: "#a0d464",
    name: "Hand marked paper ballots and DREs without VVPAT",
    order: 3
  },
  "pbdn": {  /* mixed paper ballot without vvpat */
    color: "#a0d464",
    name: "Hand marked paper ballots; Direct recording assistive interface without VVPAT"
  },
  "drev": {  /* DRE with VVPAT */
    color: "#d75438",
    name: "DREs with VVPAT for all voters",
    order: 6
  },
  "dren": {  /* DRE NO VVPAT */
    color: "#b3302a",
    name: "DREs without VVPAT for all voters",
    order: 7
  },
  "drev_acc": {  /* DRE with VVPAT */
    color: "#d75438",
    name: "DREs with VVPAT",
    order: 6
  },
  "dren_acc": {  /* DRE NO VVPAT */
    color: "#b3302a",
    name: "DREs without VVPAT",
    order: 7
  },
  "pcvs": {  /* Punchcard ballots, BMDs for accessibility (2006-2014) */
    color: "#b063d6",
    name: "Punch card ballots and BMDs"
  },
  "lvrm": {  /* Mechanical Lever Machines (2006-2008) */
    color: "#5e0008",
    name: "Mechanical Lever Machines"
  },
  "lvpb": {  /* Mechanical Lever Machines (2006-2008) */
    color: "#5e0008",
    name: "Mechanical Lever Machines"
  },
  "hbdv": {   // same as "mpdv"
    color: "#31974d",
    name: "Hand marked paper ballots and DREs with VVPAT"
  },
  "bmdv": {
    color: "#d75438",
    name: "DREs with VVPAT for all voters"
  },
  "mbdv": {
    color: "#97cc5f",
    name: "BMDs and DREs with VVPAT"
  },
  "avbm": { /* AVBM - need a real color for this? */
    color: "#b9b9b9",
    name: "None"
  },

  // epoll books "codes"
  "commercial electronic poll book": {  /* Commercial Electronic Poll Books */
    color: "#2B7079",
    name: "Commercial Electronic Poll Books"
  },
  "commercial": {  /* Commercial Electronic Poll Books */
    color: "#2B7079",
    name: "Commercial Electronic Poll Books"
  },
  "in-house electronic poll book": {  /* In-House Electronic Poll Books */
    color: "#5FA3AC",
    name: "In-House Electronic Poll Books"
  },
  "in house": {  /* In-House Electronic Poll Books */
    color: "#5FA3AC",
    name: "In-House Electronic Poll Books"
  },
  "in house electronic poll book": {  /* In-House Electronic Poll Books */
    color: "#5FA3AC",
    name: "In-House Electronic Poll Books"
  },
  "paper poll book": {  /* Paper Poll Books */
    color: "#c1c1c1",
    name: "Paper Poll Books"
  },
  "paper": {  /* Paper Poll Books */
    color: "#c1c1c1",
    name: "Paper Poll Books"
  },
  "data unavailable": {  /* Data Unavailable */
    color: "#2B7079",
    name: "Data Unavailable"
  },
  "none": { /* None */
    color: "#b9b9b9",
    name: "No Accessible Equipment"
  },

  // Absentee/mail-in ballot codes
  "hcpb": {
    color: "#b2c2d6",
    name: "Hand Counted Paper Ballots",
    order: 5
  },
  "hfos": {
    color: "#489ebf",
    name: "Hand-Fed Optical Scanner",
    order: 5
  },
  "hcos": {
    color: "#489ebf",
    name: "Hand-Fed Optical Scanner",
    order: 5
  },
  "bfos": {
    color: "#25437e",
    name: "Batch-Fed Optical Scanner",
    order: 5
  },
  "pcvs_mail": {  /* Punch Card Reader */
    color: "#b063d6",
    name: "Punch Card Reader",
    order: 5
  },
  "none_abs": { /* None */
    color: "#fafafa",
    name: "Data Unavailable"
  },

  // Manufacturer/make "codes"
  "es&s": {
    color: "#a77a1b",
    name: "ES&S"
  },
  "ess": {
    color: "#a77a1b",
    name: "ES&S"
  },
  "election systems & software/unisyn": {
    color: "#a77a1b",
    name: "Election Systems & Software/Unisyn"
  },
  "dominion": {
    color: "#1b918e",
    name: "Dominion"
  },
  "sequoia": {
    color: "#470a0e",
    name: "Sequoia"
  },
  "hart intercivic": {
    color: "#2488e1",
    name: "Hart InterCivic"
  },
  "clear ballot": {
    color: "#5e2db9",
    name: "Clear Ballot"
  },
  "unisyn": {
    color: "#7d3310",
    name: "Unisyn"
  },
  "smartmatic": {
    color: "#feb8b1",
    name: "smartmatic"
  },
  "vsap": {
    color: "#0f5252",
    name: "VSAP"
  },
  "danaher": {
    color: "#102b8e",
    name: "Danaher"
  },
  "microvote": {
    color: "#e84f8b",
    name: "MicroVote"
  },
  "premier (diebold)": {
    color: "#1e7334",
    name: "Premier (Diebold)"
  },
  "diebold": {
    color: "#1e7334",
    name: "Diebold"
  },
  "lever machines (avm/shoup)": {
    color: "#921e4a",
    name: "Lever Machines (AVM/Shoup)"
  },
  "avm": {
    color: "#921e4a",
    name: "AVM"
  },
  "shoup": {
    color: "#921e4a",
    name: "Shoup"
  },
  "hand counted paper ballots": {
    color: "#b9b9b9",
    name: "Hand Counted Paper Ballots"
  },
  "other-make": {
    color: "#feb8b1",
    name: "Other Make"
  },
  "democracy live": {
    color: "#feb8b1",
    name: "Democracy Live"
  },
  "votingworks": {
    color: "#feb8b1",
    name: "VotingWorks"
  },
  "populex": {
    color: "#feb8b1",
    name: "Populex"
  },
  "unilect": {
    color: "#feb8b1",
    name: "Unilect"
  },
  "dfm": {
    color: "#feb8b1",
    name: "DFM"
  },
  "avs": {
    color: "#decc54",
    name: "AVS"
  },
  "five cedars": {
    color: "#feb8b1",
    name: "Five Cedars"
  },
  "ivs": {
    color: "#feb8b1",
    name: "IVS"
  },
  "avante": {
    color: "#feb8b1",
    name: "Avante"
  },
  "scantron": {
    color: "#feb8b1",
    name: "Scantron"
  },
  "vti": {
    color: "#feb8b1",
    name: "VTI"
  },


  // search "codes"
  "selected": {
    color: "#026DA5",
    name: "Jurisdictions with selected systems"
  },
  "deselected": {
    color: "#eeeeee",
    name: "Jurisdictions without selected systems"
  }
}

var map = {
  map: undefined,
  usaVoting: undefined,
  albersCRS: undefined,
  popupChartId: undefined,
  legendCodes: [],

  initialize: function () {
    if (this.map === undefined) {
      var proj = d3.geoAlbersUsa()
        .scale(.5);

      var AlbersProjection = {
        project: function (latLng) {
          var point = proj([latLng.lng, latLng.lat]);
          return point ?
            new L.Point(point[0], point[1]) :
            new L.Point(0, 0);
        },
        unproject: function (point) {
          var latLng = proj.invert([point.x, point.y]);
          return new L.LatLng(latLng[1], latLng[0]);
        }
      };

      this.albersCRS = L.extend({}, L.CRS, {
        projection: AlbersProjection,
        transformation: new L.Transformation(1, 0, 1, 0),
        infinite: true
      });

      this.map = L.map('map', {
        crs: this.albersCRS,
        center: [37.8, -96],
        zoom: 3.2,
        zoomSnap: 0.1,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        attributionControl: false,
		//Removing tabindex from map wrapper Issue: VV-330
		 keyboard: false,
      });

      this.map.on("popupclose", function (e) {
        map.popupChartId = undefined;
      });

      this.map.on("mouseout", function () {
        // destroy any popups when we don't hover with the mouse over the map canvas.
        if (map.map._popup !== undefined) {
          map.map.closePopup();
        }
      });
    }
  },

  getColor: function (code) {
    if (code) {
      // just be sure that we are comparing the code by ignoring the case
      code = code.toLowerCase();
    }

    if (mapCodes[code] !== undefined) {
      return mapCodes[code].color;
    }

    return undefined;
  },

  getCodesName: function (code) {
    if (code) {
      // just be sure that we are comparing the code by ignoring the case
      code = code.toLowerCase();
    }
    if (mapCodes[code] !== undefined) {
      return mapCodes[code].name;
    }
    return undefined;
  },

// Population is set elsewhere - in legend.js, for example.
  getPercent: function (code) {
    if (code) {
      // just be sure that we are comparing the code by ignoring the case
      code = code.toLowerCase();
    } else {
      if (verifier.mapStage === appConstants.map.makeEquip) {
        code = 'other-make';
      }
    }
    if (mapCodes[code] !== undefined && mapCodes[code].percent !== undefined) {
      return mapCodes[code].percent;
    }
    return undefined;
  },

  getDataCode: function (code) {
    code = code.replace(/[\(\)\&]/g, "")
    return code.toLowerCase().replace(/[\s\/]{1,}/g, "-");
  },

  styleNormal: function (feature) {
    var color;
    var stateFeature = false;
    var countyFeature = false;

    // simple map for search mode
    if (verifier.mode === appConstants.mode.search) {
      if (verifier.searchResetClick === false) {
        if (verifier.current.level === appConstants.level.national
          && (feature.properties.STATE !== undefined && feature.properties.STATE !== "02")  // Alaska
          && feature.properties.COUNTY === undefined) {
          // On national level we should ignore state codes
          color = undefined;
        } else {
          color = map.getColor(feature.properties.pp_system);
        }
      } else {
        color = undefined;
      }
    } else {
      // navigation mode
      if (verifier.current.level === appConstants.level.national
        && (feature.properties.STATE !== undefined && feature.properties.STATE !== "02")  // Alaska
        && feature.properties.COUNTY === undefined) {
        // On national level we should ignore state codes
        color = undefined;
        stateFeature = true;
      } else {
        switch (verifier.mapStage) {
          case appConstants.map.ppEquip:
            color = map.getColor(feature.properties.pp_system);
            break;
          case appConstants.map.accEquip:
            color = map.getColor(feature.properties.pp_acc_system);
            break;
          case appConstants.map.absEquip:
            color = map.getColor(feature.properties.abs_system);
            break;
          case appConstants.map.epbEquip:
            color = map.getColor(feature.properties.epb_system);
            break;
          case appConstants.map.makeEquip:
            if (feature.properties.make !== undefined && feature.properties.make.toLowerCase() in mapCodes) {
              color = map.getColor(feature.properties.make);
            } else {
              color = map.getColor('other-make');
            }
            break;
          default:
            console.log("Map stage unidentified: " + verifier.mapStage);
        }
      }


      // are we filtering a county?
      var shouldBlur = false;
      if (verifier.current.level === appConstants.level.county
        || verifier.current.level === appConstants.level.division) {
        if (parseInt(feature.properties.COUNTY, "10") !== parseInt(verifier.county, "10")) {
          shouldBlur = true;
        }
      }
    }

    var borderColor;
    if (verifier.mode === appConstants.mode.search) {
      if (parseInt(feature.properties.STATE, "10") === 15) {
        borderColor = '#525252';
      } else {
        if (feature.properties.STATE !== undefined && feature.properties.COUNTY !== undefined) {
          borderColor = '#C4C4C4';
        } else {
          borderColor = '#525252';
        }
      }
    } else {
      if (parseInt(feature.properties.COUNTY, "10") === parseInt(verifier.county, "10")) {
        borderColor = '#666';
        countyFeature = true;
      }
      else if (verifier.mapStage === appConstants.map.accEquip) {
        borderColor = '#FFFFFF';
      } else {
        borderColor = '#DDDDDD';
      }
    }
    return {
      fillColor: color,
      weight: stateFeature ? 1 : countyFeature ? 2 : 0.5,
      opacity: 1,
      color: borderColor,
      fillOpacity: color === undefined
        ? 0
        : shouldBlur ? 0.2 : 1
    };
  },

  stylePieChart: function (feature) {
    // are we filtering a county?
    var shouldBlur = false;
    if (verifier.current.level === appConstants.level.county
      || verifier.current.level === appConstants.level.division) {
      if (parseInt(feature.properties.COUNTY, "10") !== parseInt(verifier.county, "10")) {
        shouldBlur = true;
      }
    }

    return {
      fillColor: '#F5F5F5',
      weight: 0.5,
      opacity: 1,
      color: '#272727',
      fillOpacity: shouldBlur ? 0.2 : 1
    };
  },

  highlightFeature: function (e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: '#666',
      dashArray: '',
      fillOpacity: verifier.mapType === appConstants.mapType.pieChart ? 1 : 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  },

  resetHighlight: function (e) {
    map.usaVoting.resetStyle(e.target);
  },

  navigateToFeature: function (e) {
    // destroy any old popups that might be attached
    if (map.map._popup !== undefined) {
      map.map.closePopup();
    }

    verifier.navigateElement(e.target.feature.properties);
  },

  popupContentReturn: function(e) {
    var layer = e.target;

    var regVoters = layer.feature.properties.current_reg_voters ? layer.feature.properties.current_reg_voters : "";
    var precincts = layer.feature.properties.current_precincts ? layer.feature.properties.current_precincts : "";
    if (verifier.year >= appConstants.minimumYear.pollingplaceData) {
      var polling_places_election_day = layer.feature.properties.current_count_polling_places.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ? layer.feature.properties.current_count_polling_places : "";
      var vote_center = layer.feature.properties.vote_center;
      if (vote_center == 'vote centers and assigned polling places') {
        vote_center = 'Vote Centers</br >&nbsp; and Assigned Polling Places';
      }
      var all_mail_ballot = layer.feature.properties.all_mail_ballot ? "All registered voters receive mail ballots": "";
    }

    var isEmptySearchResult = false;
    // check for empty search results
    if (verifier.current.level !== appConstants.level.national && verifier.mode === appConstants.mode.search && layer.feature.properties.searchresult === "deselected") {
      isEmptySearchResult = true;
    }
    const subjurStates = ['09', '23', '25', '33', '44', '50', '55'];

    if ((isEmptySearchResult === true) || ((verifier.mode === appConstants.mode.search) && (subjurStates.includes(layer.feature.properties.STATE) ))) {
      popupTopStats = '';
    }
    else if ((verifier.current.level === appConstants.level.national) && (verifier.mode === appConstants.mode.search)) {
      popupTopStats = '';
    }
    else {
      popupTopStats = '<div class="row">'
              + '<div class="col-md-6">'
                + "<div class='popup-voters-title'>Registered Voters</div>"
                + "<div class='popup-voters-value'>" + regVoters.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</div>"
              + '</div>'
            + '</div>';
        popupTopStats += '<br />';
        popupTopStats += '<div class="row">'
            + '<div class="col-md-6">'
              + "<div class='popup-precincts-title'>Precincts</div>"
              + "<div class='popup-precincts-value'>" + precincts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</div>"
            + '</div>';
      if (verifier.year >= appConstants.minimumYear.pollingplaceData) {
        popupTopStats += '<div class="col-md-6">'
              + "<div class='popup-pollingplaces-title'>Polling Places</div>"
              + "<div class='popup-pollingplaces-value'>" + polling_places_election_day.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</div>"
            + '</div>';
      }
      popupTopStats += '</div>';
      if (verifier.year >= appConstants.minimumYear.pollingplaceData) {
        if (typeof vote_center !== 'undefined' && vote_center !== null) {
          popupTopStats += '<br />';
          popupTopStats += '<div class="row">'
              + '<div class="col-md-12">'
              + "<div class='popup-pollingplaces-title'>Voting Location: " + vote_center + "</div>"
              + '</div>';
          popupTopStats += '</div>';
        }
        popupTopStats += '<br />';
        popupTopStats += '<div class="row">'
            + '<div class="col-md-6">'
            + "<div class='popup-pollingplaces-title'>" + all_mail_ballot + "</div>"
            + '</div>';
        popupTopStats += '</div>';
      }
      popupTopStats += '</div>';
    }

    var epb_system = layer.feature.properties.epb_system ? layer.feature.properties.epb_system : "";
    if (epb_system == 'Paper') {
      epb_system = "Paper Poll Books";
    } else if (epb_system == 'Commercial') {
      epb_system = "Commercial Electronic Poll Books";
    } else if (epb_system == 'In-House') {
      epb_system = "In-House Electronic Poll Books";
    }
    var chartId = layer.feature.properties.NAME.replace(/\s/g, "");
    var legendId = chartId + "-legend";

    var title = "Election Day Equipment"; // default title
    if (verifier.mapStage === appConstants.map.ppEquip) {
      title = "Election Day Equipment";
    }
    if (verifier.mapStage === appConstants.map.accEquip) {
      title = "Accessible Equipment";
    }
    if (verifier.mapStage === appConstants.map.absEquip) {
      title = "Mail Ballot Tabulation";
    }
    if (verifier.mapStage === appConstants.map.epbEquip) {
      title = "Poll Books";
    }
    if (verifier.mapStage === appConstants.map.makeEquip) {
      title = "Manufacturers";
    }
    if (verifier.mapStage === appConstants.map.auditLaw) {
      title = "";
    }

    if (verifier.current.level !== appConstants.level.national) {
      var tabulation = layer.feature.properties.tabulation ? layer.feature.properties.tabulation : "";
      var marking = layer.feature.properties.marking_method ? layer.feature.properties.marking_method : "";
      var manufacturer = layer.feature.properties.make ? layer.feature.properties.make : "";
      if (manufacturer == 'Hand Counted Paper Ballots') {
        manufacturer = "Not Applicable";
      }
      var abs_system = layer.feature.properties.abs_system ? layer.feature.properties.abs_system : "";
      abs_system = mapCodes[abs_system] ? mapCodes[abs_system].name : "Data Unavailable";
    }

    if (verifier.mode === appConstants.mode.search) {
      popupMapTypeData = '';
    }
    else {
      if (verifier.current.map !== undefined) {
        popupMapTypeData = "<div class='popup-body audit-popup'>"
          + '<div class="row">';

      _(verifier.current.map.map_types).each(function(map_type) {
        let value = layer.feature.properties[map_type.data_field_name]?.text;

        // Some jurisidications have a first fielded year earlier than 2004 that we need to account
        if (verifier.current.map.map_code && !value) {
          value = "2004 or earlier";
        }

        popupMapTypeData += "<div class='col-md-6'><h4>" + map_type.label + "</h4>"
          + '<div>' + value + '</div></div>';
      })


        popupMapTypeData += '</div>'
          + '</div></div>';
      }
      else {
        if (verifier.current.level === appConstants.level.national) {
          popupMapTypeData = "<div class='popup-body'>"
                  + '<div class="row">'
                  + '<div class="col-md-12">'
                  + "<h4>" + title + "</h4>"
                  + '</div>'
                  + '<div class="popup-chart">'
                  + '<div class="col-md-4"><div id="' + chartId + '"></div>'
                  + '</div>'
                  + '<div class="col-md-8" id="' + legendId + '"></div>'
                  + '</div>'
                  + '</div></div>';
        }
        else {
          popupMapTypeData = '<div class="popup-body">'
                  + '<div class="row">'
                  + '<div class="col-md-12">'
                  + '<h4 class="popup-title marking">Marking Method</h4>'
                  + '<div class="popup-section-content">' + marking + '</div>'
                  + '</div>'
                  + '<div class="col-md-6">'
                  + '<h4 class="popup-title tabulation">Tabulation</h4>'
                  + '<div class="popup-section-content">' + tabulation + '</div>'
                  + '</div>'
                  + '<div class="col-md-6">'
                  + '<h4 class="popup-title poll">Poll Books</h4>'
                  + '<div class="popup-section-content">' + epb_system + '</div>'
                  + '</div>'
                  + '<div class="col-md-6">'
                  + '<h4 class="popup-title manufacturer">Manufacturer</h4>'
                  + '<div class="popup-section-content">' + manufacturer + '</div>'
                  + '</div>'
                  + '<div class="col-md-6">'
                  + '<h4 class="popup-title mail">Mail Ballots</h4>'
                  + '<div class="popup-section-content">' + abs_system + '</div>'
                  + '</div>'
                  + '</div></div></div>';
        }
      }
    }
    popupMapTypeData = popupTopStats + popupMapTypeData;
    return popupMapTypeData;
  },

  openPopup: function (e) {
    var layer = e.target;


    var chartId = layer.feature.properties.NAME.replace(/\s/g, "");
    var legendId = chartId + "-legend";


    var isEmptySearchResult = false;
    // check for empty search results
    if (verifier.current.level !== appConstants.level.national && verifier.mode === appConstants.mode.search && layer.feature.properties.searchresult === "deselected") {
      isEmptySearchResult = true;
    }

    // don't reopen the same popup
    if (map.popupChartId !== chartId) {
      // destroy any old popups that might be attached
      if (map.map._popup !== undefined) {
        map.map.closePopup();
      }

      map.popupChartId = chartId;
      namer = layer.feature.properties.NAME;
      if ((layer.feature.properties.county_name)) {
        if (namer.indexOf('County') < 0) {
          if (layer.feature.properties.STATE === '22') {
            popupDisplayName = layer.feature.properties.county_name + ' Parish';
          }
          else {
            popupDisplayName = layer.feature.properties.county_name + ' County';
          }
        }
        else { 
          popupDisplayName = layer.feature.properties.NAME;
        }
      }
      else {
        popupDisplayName = layer.feature.properties.NAME;
      }
      const subjurStates = ['09', '23', '25', '33', '44', '50', '55'];
      var popupHeading = "popup-heading" + (isEmptySearchResult === true ? ' empty-search' : '');
      var popupMapTypeData = map.popupContentReturn (e);
      var popupContent = '<div class="' + popupHeading + '">'
        + '<div class="row">'
        + '<div class="col-md-12">'
        + '<h4>' + popupDisplayName + '</h4>'
        + '</div>'
        + '</div>'
        + popupMapTypeData;

      // longitude and latitude appear to be reversed in some of these functions???
      bounds = L.geoJson(layer.feature).getBounds();
      statecorner = bounds.getSouthEast();
      statecornerpoint = this.map.latLngToLayerPoint(statecorner);
      if (verifier.current.level === appConstants.level.national) {
        statepoppoint = statecornerpoint.add([90, -40]);
        var popupMinWidth = verifier.current.map !== undefined ? 350 : 300;
        var popLatLng = this.map.layerPointToLatLng(statepoppoint);
        var popup = L.popup({
          maxWidth: 350,
          maxHeight: 450,
          minWidth: popupMinWidth,
          minHeight: 400,
          closeOnClick: true,
          autoPan: false,
          keepInView: true
        })
          .setLatLng(popLatLng)
          .setContent(popupContent);
      } else {
        if (verifier.current.map?.map_detail === 'state') {
          statecenter = bounds.getCenter();
          statepoppoint = this.map.latLngToLayerPoint(statecenter);
        }
        else {
          statepoppoint = statecornerpoint.add([170, -30]);
        }
        var popLatLng = this.map.layerPointToLatLng(statepoppoint);
        var popup = L.popup({
          maxWidth: 350,
          maxHeight: 450,
          minWidth: 400,
          minHeight: 400,
          closeOnClick: true,
          autoPan: false,
          keepInView: true
        })
          .setLatLng(popLatLng)
          .setContent(popupContent);
      }
      popup.openOn(map.map);
	  //Add aria-label to popup close button wrapper Issue: VV-254
      $('a.leaflet-popup-close-button').attr('aria-label', 'Close ' + popupDisplayName + ' Popup');

      var chartData;

      switch (verifier.mapStage) {
        case appConstants.map.ppEquip:
          chartData = layer.feature.properties.aggregator.get("pp_system");
          break;
        case appConstants.map.accEquip:
          chartData = layer.feature.properties.aggregator.get("pp_acc_system");
          break;
        case appConstants.map.absEquip:
          chartData = layer.feature.properties.aggregator.get("abs_system");
          break;
        case appConstants.map.epbEquip:
          chartData = layer.feature.properties.aggregator.get("epb_system");
          break;
        case appConstants.map.makeEquip:
          chartData = layer.feature.properties.aggregator.get("make");
          break;
      }

      // console.log("popup data for " + layer.feature.properties.NAME + ": ", chartData);
      // if (layer.feature.properties.aggValues) {
      //   Object.keys(layer.feature.properties.aggValues).forEach(function (key) {
      //     console.log(key)
      //   });
      // }
      // console.log("======================================================================")

      // display the pie chart only on national level.
      if (verifier.current.level === appConstants.level.national
        && chartData !== undefined) {
        // merge data with the same label
        var tmpData = [];
        Object.keys(chartData).forEach(function (key) {
          // console.log('outer key is ' + key);
          if (mapCodes[key.toLowerCase()] !== undefined) {
            // console.log('key is ' + key + ' value is ' + chartData[key] + ' label is ' + mapCodes[key.toLowerCase()].name);
            tmpData.push({
              key: key,
              value: chartData[key],
              label: mapCodes[key.toLowerCase()].name
            });
          }
        });


        for (var i = 0; i < tmpData.length; i++) {
          for (var j = i + 1; j < tmpData.length; j++) {
            // we have found a duplicate label so we merge the values
            if (tmpData[i].label === tmpData[j].label) {
              chartData[tmpData[i].key] = chartData[tmpData[i].key] + chartData[tmpData[j].key];
              delete chartData[tmpData[j].key];
            }
          }
        }

        var labels = [];
        var values = [];
        var colors = [];
        var legend = [];

        Object.keys(chartData).forEach(function (key) {
          if (mapCodes[key.toLowerCase()] !== undefined) {
            labels.push(key);
            values.push(chartData[key]);
            colors.push(mapCodes[key.toLowerCase()].color);
          }
        });

        var format = d3.format(",.1f");
        // add percentages
        var sum = d3.sum(values, function (d) {
          return d;
        });
        values.forEach(function (d, i) {
          var percentage = format(d / sum * 100) + "%";
          if (percentage == '100.0%') {
            percentage = "100%";
          }
          var label = mapCodes[labels[i].toLowerCase()].name;
          var legendColor = mapCodes[labels[i].toLowerCase()].color;
          legend.push({
            label: label,
            percentage: percentage,
            color: legendColor,
            rawnum: d
          })
        });

        legend.sort(function compare(a, b) {
          if (a.rawnum < b.rawnum) {
            return 1;
          }
          if (a.rawnum > b.rawnum) {
            return -1;
          }
          return 0;
        });

        labels = [];
        colors = [];
        values = [];

        legend.forEach(function (d, i) {
          labels.push(d.label);
          colors.push(d.color);
          values.push(d.rawnum);
        });

        var data = [{
          values: values,
          labels: labels,
          hoverinfo: 'label+percent',
          textinfo: 'none',
          type: 'pie',
          sort: false,
          direction: 'clockwise',
          marker: {
            colors: colors
          }
        }];

        var layout = {
          width: 100,
          height: 140,
          margin: {"t": 0, "b": 0, "l": 0, "r": 0},
          showlegend: false
        };

        Plotly.newPlot(chartId, data, layout, {displayModeBar: false, responsive: true});

        // create legend layout
        var legendContent = '';
        legend.forEach(function (l, i) {
          legendContent += '<div class="row">' +
            '<div class="col-md-3 popup-legend-percentage" style="color: ' + l.color + '">' + l.percentage + '</div>' +
            '<div class="col-md-9 popup-legend-label">' + l.label + '</div>' +
            '</div>';
        });
        $('#' + legendId).append(legendContent);
      }
    }
  },

  mouseOver: function (e) {
    var layer = e.target;

    if (verifier.current.level === appConstants.level.national
      && layer.feature.properties.STATE !== undefined) {
      if (layer.feature.properties.COUNTY === undefined) {
        // on national level only highlight the states
        map.highlightFeature(e);
        map.openPopup(e);
      }
    } else {
      // display popups for counties / divisions as well:
      // if (verifier.current.level === appConstants.level.county || verifier.current.level === appConstants.level.division)
      map.highlightFeature(e);
      map.openPopup(e);
    }
  },

  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: map.mouseOver,
      // mouseover: map.highlightFeature,
      // click: map.openPopup,
      mouseout: map.resetHighlight,
      click: map.navigateToFeature
    });
  },

  render: function () {
    $('#map-area').show();
    this.initialize();    // just be sure the map is initialized
    this.legendCodes = [];

    // destroy any old popups that might be attached
    if (map.map._popup !== undefined) {
      map.map.closePopup();
    }

    // first remove the previous layer
    if (this.usaVoting !== undefined) {
      this.map.removeLayer(this.usaVoting);
    }


    var json = verifier.current.area;
    if(verifier.current.map?.map_detail === 'state' && verifier.current.level !== appConstants.level.national) {
      json = json.features.find(f => f.FIPS == verifier.current.state_fips.toString().padStart(2, '0'));
    }
    else {
      json.features = consolidateFeatures(verifier.current.codes, json.features);
      aggregateMap(json.features, verifier.current.infoData);
    }

    let style = null;
    switch(verifier.mapStage) {
      case appConstants.map.auditLaw:
        style = mapStyle.audit;
        break;
      case appConstants.map.fieldedEquip:
        style = mapStyle.fieldedEquip;
        break;
      default:
        style = verifier.mapType === appConstants.mapType.normal || verifier.mode === appConstants.mode.search ? this.styleNormal : this.stylePieChart;
    }

    this.usaVoting = L.geoJson(json, {
      // use styleNormal style for mapType normal and search mode
      style: style,
      onEachFeature: this.onEachFeature
    }).addTo(this.map);

    if (verifier.current.level === appConstants.level.national) {
      this.map.options.crs = this.albersCRS;

      var zoom = 3.2
      // calculate map zoom depending on the map width
      if (document.getElementById('map').offsetWidth <= 720) {
        zoomScale = d3.scaleLinear()
          .domain([400, 720])
          .range([2.1, 3.0])
        zoom = zoomScale(document.getElementById('map').offsetWidth);
      }

      this.map.setView([37.8, -96], zoom, {
        animate: false
      });
    } else {
      this.map.options.crs = L.CRS.EPSG3857;
      var bounds = this.usaVoting.getBounds();
      var zoom = this.map.getBoundsZoom(bounds, false);
      var center = bounds.getCenter();

      if (verifier.state === "2") { // Alaska
        center = [66.160507, -153.369141]
        zoom = 3.8;
      }
      if (verifier.state === "15") { // Hawaii
        center = [19.741755, -155.844437]
        zoom = 6.8;
      }

      this.map.setView(center, zoom, {
        animate: false
      });
    }

    window.setTimeout(function () {
      map.map.invalidateSize();
    }, 10);

    // pie chart cluster functionality
    this.removeSVG();
    if (verifier.mapType === appConstants.mapType.pieChart) {
      this.initializeSVG();
      this.renderSVG();
    }

    legend.render();
  },

  remove: function () {
    if (this.map !== undefined) {
      $('#map-area').hide();
    }
  },

  /*****************************************************************************************
   * Functionality that analyzes the features properties info and adds points/charts on the map.
   * Also it can attach functions that will be called on cluster click.
   *****************************************************************************************/
  initializeSVG: function () {
    // Since SVG does not use the same coordinate system as a globe,
    // the latitude and longitude coordinates will need to be transformed.
    var self = this;
    this.transform = d3.geoTransform({
      point: function (x, y) {
        var point = self.map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
      }
    });

    this.path = d3.geoPath().projection(this.transform);

    if (this.map.getPanes().clusterPane === undefined) {
      this.map.createPane("clusterPane");
    }

    this.svg = d3.select(this.map.getPanes().clusterPane).append("svg");
    this.svg.attr("class", "cluster").style("z-index", 1000);
    this.g = this.svg.append("g");

    // this.mode = "simple";
    this.mode = "advanced";
    this.measure = "current_reg_voters";
    this.colorSchema = "red";
    this.radius = verifier.current.level === appConstants.level.national ? 8 : 4;
    this.range = [0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.5, 3.0, 3.3, 3.5, 3.5];
    this.sizes = d3.scaleQuantile().domain(this.domain()).range(this.range);
  },

  /**
   * Remove this chart layer from the map.
   */
  removeSVG: function () {
    if (this.svg !== undefined) {
      this.svg.remove();
    }
  },

  /**
   * Adds all the features on the map.
   */
  renderSVG: function () {
    var mapSize = this.map.getSize();
    var mapPane = d3.select(this.map.getPanes().mapPane);
    var css = mapPane.style("transform");
    var translateValues = css.substring(css.indexOf("(") + 1, css.indexOf(")")).replace(/px/g, "").split(",");
    this.mapTranslateX = parseInt(translateValues[0]) * -1;
    this.mapTranslateY = parseInt(translateValues[1]) * -1;

    this.svg
      .attr("width", mapSize.x + "px")
      .attr("height", mapSize.y + "px")
      .style("left", this.mapTranslateX + "px")
      .style("top", this.mapTranslateY + "px")
    this.g.attr("transform", "translate(" + this.mapTranslateX * -1 + "," + this.mapTranslateY * -1 + ")");
    this.makeSymbols();
  },

  getFeaturesSVG: function () {
    var features;
    if (verifier.current.level === appConstants.level.national) {
      features = _.filter(verifier.current.area.features,
        function (feature) {
          return feature.properties.STATE !== undefined
            && feature.properties.COUNTY === undefined;
        });
    } else {
      features = verifier.current.area.features;
    }

    return features;
  },

  /**
   * Create a cluster representation. Depending on the mode (advanced/simple) we can call
   * 'makeAdvance' function that can add pie charts for example or
   * 'makeSimple' function that cant add simple circle cluster representation.
   */
  makeSymbols: function () {
    var features = this.getFeaturesSVG();

    this.g.selectAll("g").remove();

    if (this.mode === "simple") {
      this.makeSimple(features);
    }

    if (this.mode === "advanced") {
      this.makeAdvance(features);
    }
  },

  /**
   * Create a simple cluster circles to represent this features.
   */
  makeSimple: function (features) {
    var self = this;
    var selection = this.g.selectAll('g').data(features, this.getId);
    var clusters = selection.enter().append('g');
    clusters.attr('class', "points");
    clusters.attr('transform', function (f) {
      return self.xyTranslation(f);    // set x y position of g element
    });

    clusters
      .append('circle')
      .attr('cx', function () {
        return 0;
      })
      .attr('cy', function () {
        return 0;
      })
      .attr('fill', function () {
        return self.colorSchema;
      })
      .attr('r', this.radius)
      .attr('transform', function (feature) {
        return self.scale(self.getFeatureValue(feature), self.sizes);
      })
      .on('click', function (e) {
        return self.clusterClick(e);
      });

    clusters
      .append('text')
      .attr('dy', '.4em')
      .attr('text-anchor', 'middle')
      .text(function (d) {
        var formatNumber = d3.format(".2s");
        var value = self.getFeatureValue(d);
        return value !== undefined ? formatNumber(value) : "N/A";
      })
      .on('click', function (e) {
        return self.clusterClick(e);
      })
  },

  /**
   * Create magnification effect when hovering over the pie chart
   */
  arcTween: function (to, time, delay) {
    return function () {
      d3.select(this).transition().delay(delay).duration(time).attrTween('d', function (d) {
        var from = parseInt(d3.select(this).attr('d').split(',')[2]);
        var i = d3.interpolate(from, to);
        var text = to > from ?
          d.value :
          d.data.total;
        d3.select(this.parentElement).selectAll('text').text(text);
        return function (t) {
          return d3.arc().innerRadius(0).outerRadius(i(t))(d);
        }
      })
    }
  },

  makePieData: function (feature) {
    var aggregator = feature.properties.aggregator;

    if (!aggregator) {
      console.log('Error cluster without aggregator');
    }

    var chartData;
    switch (verifier.mapStage) {
      case appConstants.map.ppEquip:
        chartData = aggregator.get("pp_system");
        break;
      case appConstants.map.accEquip:
        chartData = aggregator.get("pp_acc_system");
        break;
      case appConstants.map.absEquip:
        chartData = aggregator.get("abs_system");
        break;
      case appConstants.map.epbEquip:
        chartData = aggregator.get("epb_system");
        break;
      case appConstants.map.makeEquip:
        chartData = aggregator.get("make");
        break;
    }

    var self = this;
    var data = [];
    if (chartData !== undefined) {
      Object.keys(chartData).forEach(function (key) {
        if (mapCodes[key.toLowerCase()] !== undefined) {
          data.push({
            value: chartData[key],
            label: key,
            color: mapCodes[key.toLowerCase()].color,
            total: feature.properties[self.measure]
          })
        }
      });
    }

    data.sort(function compare(a, b) {
      if (a.total < b.total) {
        return 1;
      }
      if (a.total > b.total) {
        return -1;
      }
      return 0;
    });


    return data;
  },

  /**
   * This function tries to present the data in the 'advanced' mode - put a pie chart on top on normal cluster
   */
  makeAdvance: function (features) {
    var self = this;

    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius);

    var pie = d3.pie()
      .value(function (d) {
        return d.value;
      })
      .sort(null).padAngle(0);

    var selection = this.g.selectAll('g').data(features, this.getId);
    var pieCharts = selection.enter().append('g');
    pieCharts.attr('class', this.className + ' advanced')
      .attr('transform', function (f) {
        return self.xyTranslation(f);
      }); // set x y position base on lat long

    pieCharts.selectAll('.arc').data(function (f) {
      return pie(self.makePieData(f));
    })
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('transform', function (pieData) {
        return self.scale(pieData.data.total, self.sizes);
      })
      .attr('fill', function (f) {
        return f.data.color;
      })
    // .on('mouseover', self.arcTween(this.radius + 6, 300, 100))
    // .on('mouseout', self.arcTween(this.radius, 200, 300));

    pieCharts.append('circle')
      .attr('r', this.radius)
      .attr('transform', function (feature) {
        return self.scale(self.getFeatureValue(feature), self.sizes);
      })
      .style('fill', "#FFFFFF")
      .style("opacity", 0)
      .on('click', function (e) {
        self.clusterClick(e);
      });
  },

  /**
   * Prepare the data that will be used when a cluster is clicked. Normally a popup should be open.
   */
  clusterClick: function (feature) {
    d3.event.preventDefault();
    d3.event.stopPropagation();

    var centerPolygon = this.featureCenter(feature);
    var position = L.latLng(centerPolygon[1], centerPolygon[0]);

    verifier.navigateElement(feature.properties);
  },


  /*****************************************************************************************
   * Utility functions.
   *****************************************************************************************/
  getId: function (feature) {
    return "d" + (feature.properties.STATE) ? feature.properties.STATE : feature.properties.COUNTY;
  },

  featureCenter: function (feature) {
    if (!feature.geometry || !feature.geometry.coordinates) {
      return [0, 0];
    }

    if (verifier.current.level === appConstants.level.national) {
      var state = _.find(region_select.states,
        function (item) {
          return parseInt(item.state, "10") === parseInt(feature.properties.STATE, "10");
        });

      if (state !== undefined) {
        return [state.lng, state.lat];
      } else {
        console.log("region_select.states doesn't have an entry for state id: " + feature.properties.STATE);
      }
    } else {
      if (verifier.state === "2") { // Alaska
        var alaskaState = _.find(region_select.states,
          function (item) {
            return parseInt(item.state, "10") === 2;
          });

        return [alaskaState.lng, alaskaState.lat];
      }
    }

    var polygon = L.polygon(feature.geometry.coordinates);
    var polygonCenter = polygon.getBounds().getCenter();

    return [polygonCenter.lat, polygonCenter.lng];
  },

  xyTranslation: function (feature) {
    var centerPolygon = this.featureCenter(feature);
    var point = this.latLngToXYPoint(centerPolygon);

    return "translate(" + point.x + " " + point.y + ")";
  },

  latLngToXYPoint: function (coordinates) {
    return this.map.latLngToLayerPoint(new L.LatLng(coordinates[1], coordinates[0]))
  },

  getFeatureValue: function (feature) {
    return feature.properties[this.measure] !== undefined
      ? parseInt(feature.properties[this.measure], "10")
      : undefined;
  },

  scale: function (value, sizes) {
    if (value === undefined || Number.isNaN(value)) {
      return;
    }

    return 'scale(' + sizes(value) + ')';
  },

  domain: function () {
    var self = this;
    var values = this.getFeaturesSVG().map(function (feature) {
      return self.getFeatureValue(feature);
    });

    return [d3.min(values), d3.max(values)];
  }
};

region_select = {
  ejsTemplate: undefined,
  cachedCounties: [],
  countyWithDivision: false,

  translate: {
    'national': 'Choose A State',
    'state': 'Choose A County',
    'county': 'Choose A Municipality',
    'division': 'Municipality'
  },

  render: function () {
    $('#region-select-container').html(this.create_html());
  },

  remove: function () {
    $('#region-select-container').empty();
  },

  /**
   * Returns HTML so other officials area can render a dropdown box too!
   */
  create_html: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/region_select.ejs'});
    }

    var listTitle = this.translate[verifier.current.level];
    // cache counties - for some reason we only have the children of the current level in "region_list"
    // without any possibility to fetch previous elements in the hierarchy.
    if (verifier.current.level === appConstants.level.state && !_.isEmpty(verifier.current.region_list)) {
      this.cachedCounties[verifier.state] = verifier.current.region_list;
    }
    else if ((verifier.current.level === appConstants.level.county || verifier.current.level === appConstants.level.division) && _.isEmpty(this.cachedCounties[verifier.state])) {
      $.getJSON('/wp-content/themes/dt-the7-child/verifier/api/api_sandbox.php?region_info=1&state_fips=' + verifier.current.state_fips, function (data) {
        region_select.cachedCounties[verifier.state] = data;
        region_select.render();
      });
    }

    this.countyWithDivision = false;    // just a flag to know if the displayed county has divisions.
    if (verifier.current.level === appConstants.level.county) {
      // we don't have division level for this county, we should display the counties instead
      if (_.isEmpty(verifier.current.region_list)) {
        verifier.current.region_list = this.cachedCounties[verifier.state];
        listTitle = this.translate['state'];
      } else {
        this.countyWithDivision = true;
      }
    }

    var config = {
      states: this.states,
      stateTitle: this.translate['national'],
      list: verifier.current.region_list,
      title: listTitle,
      counties: []
    };

    if ((this.countyWithDivision === true || verifier.current.level === appConstants.level.division)
      && !_.isEmpty(this.cachedCounties[verifier.state])) {
      config["counties"] = this.cachedCounties[verifier.state];
      config["countiesTitle"] = this.translate['state'];
    }

    if (verifier.mode === appConstants.mode.navigate) {
      return this.ejsTemplate.render(config);
    }

    return undefined;
  },

  /**
   * Check if an option is selected for a particular level.
   */
  isSelected: function (fips_10_digit) {
    if (verifier.current.level === appConstants.level.county && this.countyWithDivision === false) {
      return verifier.county === fips_10_digit.substr(2, 3).replace(/^0+/, '');
    }

    if (verifier.current.level === appConstants.level.division) {
      return verifier.division === fips_10_digit.substr(5, 5).replace(/^0+/, '');
    }
  },

  /**
   * Check if a county with divisions is selected
   */
  isSelectedCountyWithDivision: function (fips_10_digit) {
    if (this.countyWithDivision === true || verifier.current.level === appConstants.level.division) {
      return verifier.county === fips_10_digit.substr(2, 3).replace(/^0+/, '');
    }
  },

  states: [
    {name: "Alabama", state: "1", county: undefined, division: undefined, lat: "32.318230", lng: "-86.902298"},
    {name: "Alaska", state: "2", county: undefined, division: undefined, lat: "66.160507", lng: "-153.369141"},
    {name: "American Samoa", state: "60", county: undefined, division: undefined, lat: "", lng: ""},
    {name: "Arizona", state: "4", county: undefined, division: undefined, lat: "34.048927", lng: "-111.093735"},
    {name: "Arkansas", state: "5", county: undefined, division: undefined, lat: "34.799999", lng: "-92.199997"},
    {name: "California", state: "6", county: undefined, division: undefined, lat: "36.778259", lng: "-119.417931"},
    {name: "Colorado", state: "8", county: undefined, division: undefined, lat: "39.113014", lng: "-105.358887"},
    {name: "Connecticut", state: "9", county: undefined, division: undefined, lat: "41.599998", lng: "-72.699997"},
    {name: "Delaware", state: "10", county: undefined, division: undefined, lat: "39.000000", lng: "-75.500000"},
    {name: "District of Columbia", state: "11", county: undefined, division: undefined, lat: "", lng: ""},
//    {name: "Federated States of Micronesia", state: "64", county: undefined, division: undefined, lat: "", lng: ""},
    {name: "Florida", state: "12", county: undefined, division: undefined, lat: "27.994402", lng: "-81.760254"},
    {name: "Georgia", state: "13", county: undefined, division: undefined, lat: "33.247875", lng: "-83.441162"},
    {name: "Guam", state: "66", county: undefined, division: undefined, lat: "", lng: ""},
    {name: "Hawaii", state: "15", county: undefined, division: undefined, lat: "19.741755", lng: "-155.844437"},
    {name: "Idaho", state: "16", county: undefined, division: undefined, lat: "44.068203", lng: "-114.742043"},
    {name: "Illinois", state: "17", county: undefined, division: undefined, lat: "40.000000", lng: "-89.000000"},
    {name: "Indiana", state: "18", county: undefined, division: undefined, lat: "40.273502", lng: "-86.126976"},
    {name: "Iowa", state: "19", county: undefined, division: undefined, lat: "42.032974", lng: "-93.581543"},
    {name: "Kansas", state: "20", county: undefined, division: undefined, lat: "38.500000", lng: "-98.000000"},
    {name: "Kentucky", state: "21", county: undefined, division: undefined, lat: "37.839333", lng: "-84.270020"},
    {name: "Louisiana", state: "22", county: undefined, division: undefined, lat: "30.391830", lng: "-92.329102"},
    {name: "Maine", state: "23", county: undefined, division: undefined, lat: "45.367584", lng: "-68.972168"},
    {name: "Maryland", state: "24", county: undefined, division: undefined, lat: "39.045753", lng: "-76.641273"},
    // {name: "Marshall Islands", state: "68", county: undefined, division: undefined, lat: "", lng: ""},
    {name: "Massachusetts", state: "25", county: undefined, division: undefined, lat: "42.407211", lng: "-71.382439"},
    {name: "Michigan", state: "26", county: undefined, division: undefined, lat: "44.182205", lng: "-84.506836"},
    {name: "Minnesota", state: "27", county: undefined, division: undefined, lat: "46.392410", lng: "-94.636230"},
    {name: "Mississippi", state: "28", county: undefined, division: undefined, lat: "33.000000", lng: "-90.000000"},
    {name: "Missouri", state: "29", county: undefined, division: undefined, lat: "38.573936", lng: "-92.603760"},
    {name: "Montana", state: "30", county: undefined, division: undefined, lat: "46.965260", lng: "-109.533691"},
    {name: "Nebraska", state: "31", county: undefined, division: undefined, lat: "41.500000", lng: "-100.000000"},
    {name: "Nevada", state: "32", county: undefined, division: undefined, lat: "39.876019", lng: "-117.224121"},
    {name: "New Hampshire", state: "33", county: undefined, division: undefined, lat: "44.000000", lng: "-71.500000"},
    {name: "New Jersey", state: "34", county: undefined, division: undefined, lat: "39.833851", lng: "-74.871826"},
    {name: "New Mexico", state: "35", county: undefined, division: undefined, lat: "34.307144", lng: "-106.018066"},
    {name: "New York", state: "36", county: undefined, division: undefined, lat: "43.000000", lng: "-75.000000"},
    {name: "North Carolina", state: "37", county: undefined, division: undefined, lat: "35.782169", lng: "-80.793457"},
    {name: "North Dakota", state: "38", county: undefined, division: undefined, lat: "47.650589", lng: "-100.437012"},
    {name: "Northern Mariana Islands", state: "69", county: undefined, division: undefined, lat: "", lng: ""},
    {name: "Ohio", state: "39", county: undefined, division: undefined, lat: "40.367474", lng: "-82.996216"},
    {name: "Oklahoma", state: "40", county: undefined, division: undefined, lat: "36.084621", lng: "-96.921387"},
    {name: "Oregon", state: "41", county: undefined, division: undefined, lat: "44.000000", lng: "-120.500000"},
    {name: "Pennsylvania", state: "42", county: undefined, division: undefined, lat: "41.203323", lng: "-77.194527"},
    {name: "Puerto Rico", state: "72", county: undefined, division: undefined, lat: "", lng: ""},
    {name: "Rhode Island", state: "44", county: undefined, division: undefined, lat: "41.700001", lng: "-71.500000"},
    {name: "South Carolina", state: "45", county: undefined, division: undefined, lat: "33.836082", lng: "-81.163727"},
    {name: "South Dakota", state: "46", county: undefined, division: undefined, lat: "44.500000", lng: "-100.000000"},
    {name: "Tennessee", state: "47", county: undefined, division: undefined, lat: "35.860119", lng: "-86.660156"},
    {name: "Texas", state: "48", county: undefined, division: undefined, lat: "31.000000", lng: "-100.000000"},
    {name: "US Virgin Islands", state: "78", county: undefined, division: undefined, lat: "", lng: ""},
    {name: "Utah", state: "49", county: undefined, division: undefined, lat: "39.419220", lng: "-111.950684"},
    {name: "Vermont", state: "50", county: undefined, division: undefined, lat: "44.000000", lng: "-72.699997"},
    {name: "Virginia", state: "51", county: undefined, division: undefined, lat: "37.926868", lng: "-78.024902"},
    {name: "Washington", state: "53", county: undefined, division: undefined, lat: "47.751076", lng: "-120.740135"},
    {name: "West Virginia", state: "54", county: undefined, division: undefined, lat: "39.000000", lng: "-80.500000"},
    {name: "Wisconsin", state: "55", county: undefined, division: undefined, lat: "44.500000", lng: "-89.500000"},
    {name: "Wyoming", state: "56", county: undefined, division: undefined, lat: "43.075970", lng: "-107.290283"}
  ]
}

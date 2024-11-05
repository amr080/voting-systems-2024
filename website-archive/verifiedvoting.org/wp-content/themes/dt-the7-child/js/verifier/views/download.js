download = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/download.ejs'});
    }

    url = '/api/api_sandbox.php?advanced&'
    if (verifier.mode === appConstants.mode.search) {
      url = url + $('#machine-search').serialize();
      url = url.replace(/state_fips=\&/, 'state_fips=' + verifier.current.state_fips + '\&');
    } else {
      if (verifier.mode === appConstants.mode.navigate) {
        url = url + 'year=' + verifier.year;
        if (verifier.current.level !== appConstants.level.national) {
          url = url + '&state_fips=' + verifier.current.state_fips;

          if (verifier.current.level === appConstants.level.county || verifier.current.level === appConstants.level.division) {
            url = url + '&county_fips=' + verifier.current.county_fips;
          }
        }
      }
    }

    // Need to put this state fips list in a js library and use in search.ejs too
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

    var urlsearchstring = $('#machine-search').serialize();
    var searchprint = '<strong>Search parameters:</strong> ';
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
          searchprint += "/ " + statelistbyfips[state_fips] + " ";
        } else {
          searchprint += "/ "
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

    if (searchprint === '<strong>Search parameters:</strong> ' || verifier.mode !== appConstants.mode.search) {
      searchprint = '';
    }

    this.remove();
    if (verifier.mode === appConstants.mode.search) {
      $('#download-container-search').parent().addClass('col-md-3');
      $('#download-container').parent().removeClass('col-md-3');

      $('#download-container-search').show();
      $('#download-container-search').html(this.ejsTemplate.render({
        url: url,
        searchprint: searchprint,
      }));
    } else {
      $('#download-container').parent().addClass('col-md-3');
      $('#download-container-search').parent().removeClass('col-md-3');

      $('#download-container').show();
      $('#download-container').html(this.ejsTemplate.render({
        url: url,
        searchprint: searchprint,
      }));
    }
    if (verifier.mapStage === appConstants.map.auditLaw) {
      this.remove();
    }
  },

  remove: function () {
    $('#download-container').hide();
    $('#download-container').empty();

    $('#download-container-search').hide();
    $('#download-container-search').empty();
  }
}

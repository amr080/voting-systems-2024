territories = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/territories.ejs'});
    }

    if (verifier.current.level === appConstants.level.national) {
      var states = _.filter(verifier.current.area.features,
        function (feature) {
          return feature.properties.STATE !== undefined
            && (feature.properties.COUNTY === undefined || feature.properties.COUNTY === "000");
        });

      this.territories.forEach(function (territory) {
        var state = _.find(states,
          function (item) {
            return parseInt(item.properties.STATE, "10") === parseInt(territory.state, "10");
          });

        if (state !== undefined) {
          territory.current_reg_voters = state.properties.current_reg_voters;
          territory.current_precincts = state.properties.current_precincts;

          if (verifier.mode === appConstants.mode.search) {
            territory.deselected = false;
            if (verifier.searchResetClick === false) {
              territory.color = map.getColor(state.properties.pp_system);
              if (state.properties.pp_system === 'deselected') {
                territory.deselected = true;
              }
            } else {
              territory.color = undefined;
            }
          } else if (verifier.current.map !== undefined) {
            let field = verifier.current.map.data_field_name;
            territory.color = state.properties[field] != null ? '#' + state.properties[field]['color'] : '#BFBFBF';

            verifier.current.map.map_types.forEach((map_type) => {
              territory[map_type.data_field_name] = state.properties[map_type.data_field_name];
            });
          } else {
            var chartData;
            switch (verifier.mapStage) {
              case appConstants.map.ppEquip:
                chartData = state.properties.aggregator.get("pp_system");
                break;
              case appConstants.map.accEquip:
                chartData = state.properties.aggregator.get("pp_acc_system");
                break;
              case appConstants.map.absEquip:
                chartData = state.properties.aggregator.get("abs_system");
                break;
              case appConstants.map.epbEquip:
                chartData = state.properties.aggregator.get("epb_system");
                break;
              case appConstants.map.makeEquip:
                chartData = state.properties.aggregator.get("make");
                break;
            }
            if (chartData !== undefined) {
              var keyWithHighestValue = Object.keys(chartData).reduce(function (a, b) {
                return chartData[a] > chartData[b] ? a : b
              });

              if (mapCodes[keyWithHighestValue.toLowerCase()] !== undefined) {
                territory.color = mapCodes[keyWithHighestValue.toLowerCase()].color;
                territory.current_reg_voters = state.properties.current_reg_voters;
              }
            }
          }
        }
      });
    }

    $('#territories').html(this.ejsTemplate.render());
  },

  navigateMap(state) {
    verifier.searchMapClick = true;

    // set the search state value since this value is taken from the form serialization
    $('#search-state').val(state);
    verifier.navigate({
      state: state,
      year: verifier.year
    });
  },

  remove: function () {
    $('#territories').empty();
  },

  onMouseOver: function(state) {
    let territory = _.find(this.territories, function (item) {
      return parseInt(item.state, "10") === parseInt(state, "10")
    });

    if(territory === undefined) {
      return;
    }
    
    let = popup = $('.territory-popup');
    let popupBody = popup.find('.popup-body');

    popup.find('#popup-title').text(territory.name);
    popup.find('.popup-voters-value').text(territory.current_reg_voters);
    popup.find('.popup-precincts-value').text(territory.current_precincts);

    if(verifier.current.map) {
      popupBody.append('<div id="popup-content" class="row"></div>');
      verifier.current.map.map_types.forEach((map_type) => {
        let data = territory[map_type.data_field_name];
        let body = "<div class='col-md-6'><h4 class='popup-title'>" + map_type.label + "</h4><div class='popup-section-content'>" + data.text + "</div></div>";

        popupBody.find('#popup-content').append(body);
      })
    }

    popup.toggle(true);
  },

  onMouseOut: function() {
    let = popup = $('.territory-popup');
    popup.toggle(false);
    popup.find('.popup-body').empty();
  },

  territories: [{
    abbreviation: 'AS',
    state: '60',
    name: 'American Samoa'
  }, {
    abbreviation: 'GU',
    state: '66',
    name: 'Guam'
  }, {
    abbreviation: 'MP',
    state: '69',
    name: 'Northern Mariana Islands'
  }, {
    abbreviation: 'PR',
    state: '72',
    name: 'Puerto Rico'
  }, {
    abbreviation: 'VI',
    state: '78',
    name: 'US Virgin Islands'
  }]
}

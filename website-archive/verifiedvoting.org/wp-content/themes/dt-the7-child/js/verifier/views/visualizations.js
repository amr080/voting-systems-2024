visualizations = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/visualizations.ejs'});
    }

    $('#visualizations').html(this.ejsTemplate.render());

    var features = [];
    verifier.current.infoData.forEach(function (item) {
      if (appConstants.includeTerritories === true) {
        features.push({
          "properties": item
        });
      } else {
        if (item.jurisdiction_type !== "territory") { // AS, GU, MP, PR, VI
          features.push({
            "properties": item
          });
        }
      }
    });

    // aggregate all data data
    var aggregator = new Aggregator();
    features.forEach(function (feature) {
      var featureAggregator = new Aggregator();
      addAggregatorMetrics(featureAggregator, feature.properties);

      aggregator = new Aggregator(aggregator.aggregate(featureAggregator));
    });

    var ppData = aggregator.get("pp_system");

    if (ppData !== undefined) {
      // sort the data based on mapCodes order.
      var sortedData = [];
      Object.keys(ppData).forEach(function (key) {
        var entry = mapCodes[key.toLowerCase()];
        sortedData.push({
          key: key,
          order: entry !== undefined ? entry.order : 100
        });
      });

      sortedData.sort(function compare(a, b) {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });

      var labels1 = [];
      var values1 = [];
      var colors1 = [];

      sortedData.forEach(function (item) {
        var entry = mapCodes[item.key.toLowerCase()];
        if (entry !== undefined) {
          labels1.push(wordWrap(entry.name, 30));
          values1.push(ppData[item.key]);
          colors1.push(entry.color);
        }
      });
    }

    var dataChart1 = [{
      values: values1,
      labels: labels1,
      texttemplate: "%{percent:.1%f}",
      // hoverinfo: 'label+percent',
      hoverinfo: 'label+value',
      // hovertemplate: '<b>%{label}</b>:<br> %{value}',
      type: 'pie',
      sort: false,
      direction: 'clockwise',
      hole: 0.6,
      marker: {
        colors: colors1
      }
    }];

    var layoutChart1 = {
      height: 400,
      // width: 500,
      font: {
        family: 'CircularXXWeb-Book',
      },
      margin: {"t": 10, "b": 0, "l": 25, "r": 100},
      showlegend: true,
      legend: {
        x: 1,
        y: 0.5
      }
    };

    Plotly.newPlot('polling-equip', dataChart1, layoutChart1, {displayModeBar: false, responsive: true});

    // ====

    var makeData = aggregator.get("make");

    if (makeData !== undefined) {
      // combine "Premier/Diebold (Dominion)" and "Sequoia (Dominion)" with "Dominion Voting Systems".
      // no - keep them with the same makes that they were in 2006 and 2008
      if (makeData["Premier/Diebold (Dominion)"]) {
        if (makeData["Premier Election Solutions (Diebold)"]) {
          makeData["Premier Election Solutions (Diebold)"] += makeData["Premier/Diebold (Dominion)"];
        } else {
          makeData["Premier Election Solutions (Diebold)"] = makeData["Premier/Diebold (Dominion)"];
        }
        console.log('premier number is ' + makeData["Premier Election Solutions (Diebold)"]);
        delete makeData["Premier/Diebold (Dominion)"];
      }
      if (makeData["Sequoia (Dominion)"]) {
        if (makeData["Sequoia Voting Systems"]) {
          makeData["Sequoia Voting Systems"] += makeData["Sequoia (Dominion)"];
        } else {
          makeData["Sequoia Voting Systems"] = makeData["Sequoia (Dominion)"];
        }
        console.log('sequoia number is ' + makeData["Sequoia (Dominion)"]);
        delete makeData["Sequoia (Dominion)"];
      }

      // sort the data from largest to smallest
      delete makeData[""];
      var sortedData = [];
      Object.keys(makeData).forEach(function (key) {
        sortedData.push({
          key: key.replace(/\s/g, '').toLowerCase() === "notapplicable" ? "Hand Counted Paper Ballots" : key,
          value: makeData[key]
        });
      });

      sortedData.sort(function compare(a, b) {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });

      var labels2 = [];
      var values2 = [];
      sortedData.forEach(function (item) {
        if (item.key !== undefined && item.key !== null) {
          labels2.push(item.key);
          values2.push(item.value);
        }
      });
    }

    var dataChart2 = [{
      values: values2,
      labels: labels2,
      texttemplate: "%{percent:.1%f}",
      hoverinfo: 'label+value',
      type: 'pie',
      sort: false,
      direction: 'clockwise',
      hole: 0.6,
      marker: {
        colors: ['#7CB5EC', '#90ED7D', '#F7A35C', '#8085E9', '#F15C80', '#E4D354', '#2B908F', '#F45B5B', '#91E8E1',
          '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92', '#434348']
      }
    }];

    var layoutChart2 = {
      height: 400,
      // width: 500,
      font: {
        family: 'CircularXXWeb-Book',
      },
      margin: {"t": 90, "b": 0, "l": 0, "r": 100},
      showlegend: true,
      legend: {
        x: 1,
        y: 0.5
      }
    };

    Plotly.newPlot('election-equip', dataChart2, layoutChart2, {displayModeBar: false, responsive: true});

    // ===

    var epbMakeData = aggregator.get("epb_make");

    if (epbMakeData !== undefined) {
      var format = d3.format(",.2f");
      // sum of all values
      var sumEpbData = d3.sum(Object.keys(epbMakeData), function (key) {
        return epbMakeData[key];
      });

      // sort the data from largest to smallest
      var sortedData = [];
      var thresholdGrouping = 2.5;
      var addGrouping = false;
      Object.keys(epbMakeData).forEach(function (key) {
        var percentage = format(epbMakeData[key] / sumEpbData * 100);
        if (percentage < thresholdGrouping) {
          addGrouping = true;
        }
        sortedData.push({
          key: key,
          value: epbMakeData[key],
          percentage: percentage
        });
      });

      sortedData.sort(function compare(a, b) {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });

      // add a combined value for all the items that have a percentage lower then the threshold.
      if (addGrouping) {
        var valueGrouping = 0;
        sortedData = _.filter(sortedData, function (item) {
          if (item.percentage < thresholdGrouping) {
            valueGrouping += item.value;

            return false;
          }
          return true;
        });

        sortedData.push({
          key: "Other Manufacturers",
          value: valueGrouping
        });
      }

      var labels3 = [];
      var values3 = [];
      sortedData.forEach(function (item) {
        if (item.key !== undefined && item.key !== null) {
          // update some of the labels recieved from the API
          if (item.key.toLowerCase() === "paper") {
            item.key = "Paper Poll Books";
          }
          if (item.key.toLowerCase() === "in house") {
            item.key = "In-House Electronic Pollbooks";
          }
          labels3.push(item.key);
          values3.push(item.value);
        }
      });
      
      $('#election-equip2').parent().show();
    } else {
      $('#election-equip2').parent().hide();
    }

    var dataChart3 = [{
      values: values3,
      labels: labels3,
      texttemplate: "%{percent:.1%f}",
      hoverinfo: 'label+value',
      type: 'pie',
      sort: false,
      direction: 'clockwise',
      hole: 0.6,
      marker: {
        colors: ['#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92', '#434348']
      }
    }];

    var layoutChart3 = {
      height: 400,
      // width: 500,
      font: {
        family: 'CircularXXWeb-Book',
      },
      margin: {"t": 50, "b": 0, "l": 0, "r": 100},
      showlegend: true,
      legend: {
        x: 1,
        y: 0.5
      }
    };

    Plotly.newPlot('election-equip2', dataChart3, layoutChart3, {displayModeBar: false, responsive: true});

    // ===

    var trace1 = {
      x: ['xxx'],
      y: [20],
      marker: {
        color: '#2B908F'
      },
      name: 'Option 1',
      type: 'bar',
      width: [0.3]
    };

    var trace2 = {
      x: ['xxx'],
      y: [12],
      marker: {
        color: '#F45B5B'
      },
      name: 'Option 2',
      type: 'bar',
      width: [0.3]
    };

    var trace3 = {
      x: ['xxx'],
      y: [5],
      marker: {
        color: '#8085E9'
      },
      name: 'Option 3',
      type: 'bar',
      width: [0.3]
    };

    var dataChart4 = [trace1, trace2, trace3];

    var layoutChart4 = {
      barmode: 'stack',
      height: 400,
      // width: 500,
      margin: {"t": 20, "b": 0, "l": 0, "r": 50},
      showlegend: true
    };

    // Plotly.newPlot('election-equip2', dataChart4, layoutChart4, {displayModeBar: false, responsive: true});
  },

  remove: function () {
    $('#visualizations').empty();
  }
}

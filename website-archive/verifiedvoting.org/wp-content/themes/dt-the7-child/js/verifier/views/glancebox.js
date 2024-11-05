glancebox = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/glancebox.ejs'});
    }

    // console.log(JSON.stringify(verifier.current.infoData));

    if (verifier.current.level !== appConstants.level.national) {
      // remove this sections because it will be re-rendered
      votingequipment.remove();
      mailballot.render();
      pollbooks.remove();
    }

    var features = [];
    verifier.current.infoData.forEach(function (item) {
      if (appConstants.includeTerritories === true) {
        features.push({
          "properties": item
        });
      } else {
        if (verifier.current.level === appConstants.level.national) {
          if (item.jurisdiction_type !== "territory") { // AS, GU, MP, PR, VI
            features.push({
              "properties": item
            });
          }
        } else {
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

    var handMarkedPaperBallots = 0;
    var ballotMarkingDevices = 0;
    var dreSystems = 0;

    var handCounted = 0;
    var handFedOptical = 0;
    var batchFedOptical = 0;

    var commercial = 0;
    var inHouse = 0;
    var paper = 0;

    var voters = 0

    var metricsData = aggregator.get("metric");
    // console.log(metricsData);

    if (metricsData !== undefined) {
      // Election Day Equipment
      if (metricsData["handMarkedPaperBallots"] !== undefined) {
        handMarkedPaperBallots = metricsData["handMarkedPaperBallots"];
      }
      if (metricsData["ballotMarkingDevices"] !== undefined) {
        ballotMarkingDevices = metricsData["ballotMarkingDevices"];
      }
      if (metricsData["dreSystems"] !== undefined) {
        dreSystems = metricsData["dreSystems"];
      }

      // Accessible Equipment
      if (metricsData["accBallotMarkingDevices"] !== undefined) {
        accBallotMarkingDevices = metricsData["accBallotMarkingDevices"];
      }
      if (metricsData["accHybridBmdTabulators"] !== undefined) {
        accHybridBmdTabulators = metricsData["accHybridBmdTabulators"];
      }
      if (metricsData["accDreSystems"] !== undefined) {
        accDreSystems = metricsData["accDreSystems"];
      }

      // Mail Ballot Tabulation
      if (metricsData["handCounted"] !== undefined) {
        handCounted = metricsData["handCounted"];
      }
      if (metricsData["handFedOptical"] !== undefined) {
        handFedOptical = metricsData["handFedOptical"];
      }
      if (metricsData["batchFedOptical"] !== undefined) {
        batchFedOptical = metricsData["batchFedOptical"];
      }

      // Poll Books
      if (metricsData["commercial"] !== undefined) {
        commercial = metricsData["commercial"];
      }
      if (metricsData["inHouse"] !== undefined) {
        inHouse = metricsData["inHouse"];
      }
      if (metricsData["paper"] !== undefined) {
        paper = metricsData["paper"];
      }
      if (metricsData["voters"] !== undefined) {
        voters = metricsData["voters"];
      }
    }

    var format = d3.format(",.1f");

    if (verifier.mapStage === appConstants.map.ppEquip) {
      this.metric1Value = format(handMarkedPaperBallots / voters * 100);
      this.metric2Value = format(ballotMarkingDevices / voters * 100);
      this.metric3Value = format(dreSystems / voters * 100);
    } else {
      if (verifier.mapStage === appConstants.map.accEquip) {
        this.metric1Value = format(accBallotMarkingDevices / voters * 100);
        this.metric2Value = format(accHybridBmdTabulators / voters * 100);
        this.metric3Value = format(accDreSystems / voters * 100);
      } else {
        if (verifier.mapStage === appConstants.map.absEquip) {
          this.metric1Value = format(handCounted / voters * 100);
          this.metric2Value = format(handFedOptical / voters * 100);
          this.metric3Value = format(batchFedOptical / voters * 100);
        } else {
          if (verifier.mapStage === appConstants.map.epbEquip) {
            this.metric1Value = format(paper / voters * 100);
            this.metric2Value = format(inHouse / voters * 100);
            this.metric3Value = format(commercial / voters * 100);
          }
        }
      }
    }

    $('#glancebox').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#glancebox').empty();
  }
}

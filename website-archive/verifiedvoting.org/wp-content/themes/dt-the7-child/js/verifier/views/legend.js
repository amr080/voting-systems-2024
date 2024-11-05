var legend_pp_hmpb = {"hmpb": "Hand marked paper ballots and BMDs"}
var legend_pp_mpdv = {"mpdv": "Hand marked paper ballots and DREs with VVPAT"}
var legend_pp_mpdn = {"mpdn": "Hand marked paper ballots and DREs without VVPAT"}
var legend_pp_bmds = {"bmds": "Ballot Marking Devices for all voters"}
var legend_pp_bmdn = {"bmdn": "Ballot Marking Devices for all voters"}
var legend_pp_bmos = {"bmos": "Hybrid BMD/Tabulator for all voters"}
var legend_pp_pcvs = {"pcvs": "Hand marked punch card ballots and BMDs"}
var legend_pp_drev = {"drev": "DREs with VVPAT for all voters"}
var legend_pp_dren = {"dren": "DREs without VVPAT for all voters"}
var legend_pp_lvrm = {"lvrm": "Mechanical Lever Machines"}

var legend_acc_bmds = {"bmds": "Ballot Marking Devices"}
var legend_acc_mbdv = {"mbdv": "BMDs and DREs with VVPAT"}
var legend_acc_bmos = {"bmos": "Hybrid BMD/Tabulator for all voters"}
var legend_acc_drev = {"drev": "DREs with VVPAT"}
var legend_acc_dren = {"dren": "DREs without VVPAT"}
var legend_acc_none = {"none": "No Accessible Equipment"}

var legend_abs_hcpb = {"hcpb": "Hand Counted Paper Ballots"}
var legend_abs_hfos = {"hfos": "Hand-Fed Optical Scanner"}
var legend_abs_hcos = {"hcos": "Hand-Fed Optical Scanner"}
var legend_abs_bfos = {"bfos": "Batch-Fed Optical Scanner"}
var legend_abs_pcvs = {"pcvs_mail": "Punch Card Reader"}
var legend_abs_none = {"none_abs": "Data Unavailable"}


var legend_epoll_paper = {"Paper Poll Book": "Paper Poll Books"}
var legend_epoll_house = {"In-House Electronic Poll Book": "In-House Electronic Poll Books"}
var legend_epoll_commercial = {"Commercial Electronic Poll Book": "Commercial Electronic Poll Books"}

var legend_search_selected = {"selected": "Counties with selected systems"}
var legend_search_deselected = {"deselected": "Counties without selected systems"}

//var legendcode_microvote = {"microvote": "MicroVote"}
//var legendcode_microvote = {"microvote": "MicroVote"}

var legend = {
  ejsTemplate: undefined,

  currentList: [],
  title: '',

  render: function () {
    $('#legend-container').empty();
    $('#legend-container-search').empty()
    $('#legend').empty();
    var format = d3.format(".1f");
    this.legendDisclaimer = "";
    if ((verifier.mapStage === appConstants.map.ppEquip) || (verifier.mode === appConstants.mode.search)) {
      switch (verifier.year) {
        case '2024':
        case '2022':
        case '2020':
        case '2018':
          var fullList = {...legend_pp_hmpb, ...legend_pp_mpdv, ...legend_pp_mpdn, ...legend_pp_bmds, ...legend_pp_bmos, ...legend_pp_drev, ...legend_pp_dren};
          break;
        case '2016':
          var fullList = {...legend_pp_hmpb, ...legend_pp_mpdv, ...legend_pp_mpdn, ...legend_pp_bmds, ...legend_pp_drev, ...legend_pp_dren};
          break;
        case '2014':
          var fullList = {...legend_pp_hmpb, ...legend_pp_mpdv, ...legend_pp_mpdn, ...legend_pp_pcvs, ...legend_pp_bmds, ...legend_pp_drev, ...legend_pp_dren};
          break;
        case '2012':
        case '2010':
          var fullList = {...legend_pp_hmpb, ...legend_pp_mpdv, ...legend_pp_mpdn, ...legend_pp_pcvs, ...legend_pp_drev, ...legend_pp_dren};
          break;
        case '2008':
        case '2006':
          var fullList = {...legend_pp_hmpb, ...legend_pp_mpdv, ...legend_pp_mpdn, ...legend_pp_pcvs, ...legend_pp_drev, ...legend_pp_dren, ...legend_pp_lvrm};
          break;
        default:
          var fullList = {...legend_pp_hmpb, ...legend_pp_mpdv, ...legend_pp_mpdn, ...legend_pp_bmds, ...legend_pp_bmos, ...legend_pp_drev, ...legend_pp_dren};
          break;
      }
      if (verifier.mode === appConstants.mode.search) {
        var fullList = {...legend_search_selected, ...legend_search_deselected}
        legendList = Object.keys(fullList);
        this.currentList = legendList;
        this.legendDisclaimer = "<br /><br />Some voters in the jurisdictions shown use the selected equipment for some purposes. See specific jurisdictions for details.";

      } else {
        mapCodes['mpdn'].percent = void 0;
        mapCodes['mpdv'].percent = void 0;
        sortedData = this.sortedDataReturn("pp_system");
        var sortedList = [];
        var legendList = [];
        legendList.splice(0, legendList.length);
        legendList = Object.keys(fullList);
        sortedData.forEach(function (item) {           
          if (item.key !== undefined && item.key !== null && item.key.toLowerCase() !== 'mpdv' && item.key.toLowerCase() !== 'mpdn' && legendList.includes(item.key.toLowerCase())) {
            item.key = item.key.toLowerCase();
            mapCodes[item.key].percent = format(item.percentage) + "%";
          }
          // special cases where key is different but color/text description is the same
          else if (item.key.toLowerCase() == 'bmdn') {
            mapCodes['bmds'].percent = Number(mapCodes['bmds'].percent.slice(0, -1)) + Number(item.percentage);
            mapCodes['bmds'].percent = format(mapCodes['bmds'].percent) + "%";
          }
          else if (item.key.toLowerCase() == 'mpdn' || item.key.toLowerCase() == 'pbdn') {
            if (mapCodes['mpdn'].percent === undefined) {
              mapCodes['mpdn'].percent = format(item.percentage) + "%";
            } else {
              mapCodes['mpdn'].percent = Number(mapCodes['mpdn'].percent.slice(0, -1)) + Number(item.percentage);
              mapCodes['mpdn'].percent = format(mapCodes['mpdn'].percent) + "%";
            }
//            if (item.key.toLowerCase() == 'mpdn') {
              sortedList.push('mpdn');
//            }
          }
          else if (item.key.toLowerCase() == 'mpdv' || item.key.toLowerCase() == 'hbdv') {
            if (mapCodes['mpdv'].percent === undefined) {
              mapCodes['mpdv'].percent = format(item.percentage) + "%";
            } else {
              mapCodes['mpdv'].percent = Number(mapCodes['mpdv'].percent.slice(0, -1)) + Number(item.percentage);
              mapCodes['mpdv'].percent = format(mapCodes['mpdv'].percent) + "%";
            }
            if (item.key.toLowerCase() == 'mpdv') {
              sortedList.push('mpdv');
            }
          }
          else {
            console.log("non-legend code is " + item.key + " percent is " + item.percentage);            
          }
          sortedList.push(item.key);
        });
        for (let legindex = legendList.length - 1; legindex >= 0; legindex--) {
          legvalue = legendList[legindex];
          if (!sortedList.includes(legvalue)) {
            mapCodes[legvalue].percent = '0%';
          }
        }
        this.currentList = legendList;
      }
    } else if (verifier.mapStage === appConstants.map.accEquip) {
      this.currentList = {...legend_acc_bmds, ...legend_acc_mbdv, ...legend_acc_bmos, ...legend_acc_drev, ...legend_acc_dren, ...legend_acc_none};
      sortedData = this.sortedDataReturn("pp_acc_system");
      var sortedList = [];
      var legendList = [];
      legendList.splice(0, legendList.length);
      var legendList = Object.keys(this.currentList);
      sortedData.forEach(function (item) {
//        console.log("key out is " + item.key);
        if (item.key !== undefined && item.key !== null && legendList.includes(item.key.toLowerCase())) {
          item.key = item.key.toLowerCase();
          switch (item.key) {
            case 'bmds':
              item.key = 'bmds_acc';
              legendindex = legendList.indexOf('bmds');
              if (legendindex !== -1) {
                legendList[legendindex] = item.key;
              }
              break;
            case 'drev':
              item.key = 'drev_acc';
              legendindex = legendList.indexOf('drev');
              if (legendindex !== -1) {
                legendList[legendindex] = item.key;
              }
              break;
            case 'dren':
              item.key = 'dren_acc';
              legendindex = legendList.indexOf('dren');
              if (legendindex !== -1) {
                legendList[legendindex] = item.key;
              }
              break;
            default:
              break;
          }
          sortedList.push(item.key);
          mapCodes[item.key].percent = format(item.percentage) + "%";
        } else if ((item.key.toLowerCase() == 'bmdn') || (item.key.toLowerCase() == 'mbdn')) {
          mapCodes['bmds_acc'].percent = Number(mapCodes['bmds_acc'].percent.slice(0, -1)) + Number(item.percentage);
          mapCodes['bmds_acc'].percent = format(mapCodes['bmds_acc'].percent) + "%";
        }
      });
      for (let legindex = legendList.length - 1; legindex >= 0; legindex--) {
        legvalue = legendList[legindex];
        if (!sortedList.includes(legvalue)) {
          legendList.splice(legindex, 1);
        }
      }
      this.currentList = legendList;
    } else if (verifier.mapStage === appConstants.map.absEquip) {
      this.currentList = {...legend_abs_hcpb, ...legend_abs_hfos, ...legend_abs_hcos, ...legend_abs_bfos, ...legend_abs_pcvs, ...legend_abs_none};
      sortedData = this.sortedDataReturn("abs_system");
      var sortedList = [];
      var legendList = [];
      legendList.splice(0, legendList.length);
      var legendList = Object.keys(this.currentList);
      mapCodes['pcvs_mail'].percent = '';
      mapCodes['none_abs'].percent = '';
      sortedData.forEach(function (item) {
//        console.log("key out is " + item.key);
        if (item.key !== undefined && item.key !== null && legendList.includes(item.key.toLowerCase())) {
          item.key = item.key.toLowerCase();
          sortedList.push(item.key);
          mapCodes[item.key].percent = format(item.percentage) + "%";
        } // special cases where key is different but color/text description is the same
        else if (item.key.toLowerCase() == 'pcvs') {
          if (mapCodes['pcvs_mail'].percent === undefined) {
            mapCodes['pcvs_mail'].percent = Number(item.percentage);
          } else {
            mapCodes['pcvs_mail'].percent = Number(mapCodes['pcvs_mail'].percent.slice(0, -1)) + Number(item.percentage);
          }
          mapCodes['pcvs_mail'].percent = format(mapCodes['pcvs_mail'].percent) + "%";
          sortedList.push('pcvs_mail');
        } else if (item.key.toLowerCase() == 'unon') {
          if (mapCodes['none_abs'].percent === undefined) {
            mapCodes['none_abs'].percent = Number(item.percentage);
          } else {
            mapCodes['none_abs'].percent = Number(mapCodes['none_abs'].percent.slice(0, -1)) + Number(item.percentage);
          }
          mapCodes['none_abs'].percent = format(mapCodes['none_abs'].percent) + "%";
          sortedList.push('none_abs');
        }
      });
      for (let legindex = legendList.length - 1; legindex >= 0; legindex--) {
        legvalue = legendList[legindex];
        if (!sortedList.includes(legvalue)) {
          legendList.splice(legindex, 1);
        }
      }
      this.currentList = legendList;
    } else if (verifier.mapStage === appConstants.map.epbEquip) {

      this.currentList = {...legend_epoll_paper, ...legend_epoll_house, ...legend_epoll_commercial};

      sortedData = this.sortedDataReturn("epb_system");
      var sortedList = [];
      var legendList = ['paper poll book', 'in house electronic poll book'];
      mapCodes['commercial'].percent = 0;
      sortedData.forEach(function (item) {
        //console.log("item key is " + item.key);
        if (item.key !== undefined && item.key !== null && legendList.includes(item.key)) {
          sortedList.push(item.key);
          mapCodes[item.key].percent = format(item.percentage) + "%";
        } else {
          mapCodes['commercial'].percent += Number(item.percentage);
          sortedList.push('commercial');
        }
      });
      if (mapCodes['commercial'].percent > 0) {
        legendList.push('commercial');
        mapCodes['commercial'].percent = format(mapCodes['commercial'].percent) + '%';
      }
      for (let legindex = legendList.length - 1; legindex >= 0; legindex--) {
        legvalue = legendList[legindex];
        if (!sortedList.includes(legvalue)) {
          legendList.splice(legindex, 1);
        }
      }
      this.currentList = legendList;
    } else if (verifier.mapStage === appConstants.map.makeEquip) {
      // Copied from visualizations.js
      sortedData = this.sortedDataReturn("make");
      var sortedList = [];
      var legendList = ['es&s', 'premier/diebold (dominion)', 'avs', 'sequoia', 'hart intercivic', 'dominion', 'unisyn', 'danaher', 'microvote', 'clear ballot', 'lever machines (avm/shoup)', 'diebold', 'premier (diebold)', 'not applicable'];
      mapCodes['other-make'].percent = 0;
      sortedData.forEach(function (item) {
        if (item.key !== undefined && item.key !== null && legendList.includes(item.key)) {
          sortedList.push(item.key);
          mapCodes[item.key].percent = format(item.percentage) + "%";
        } else {
          mapCodes['other-make'].percent = item.percentage;
        }
      });
      if (mapCodes['other-make'].percent > 0) {
        sortedList.push('other-make');
        mapCodes['other-make'].percent += '%';
      }
      this.currentList = sortedList;
    } else if(verifier.current.map !== undefined) {
      let legendCodes = map.legendCodes.length > 0 ? map.legendCodes : Object.values(verifier.current.legend_codes);
      legendCodes.sort((a,b) => {
        return a.order - b.order;
      });
      this.currentList = legendCodes;
    }

    //  We don't show all of American Samoa for Northern Mariana Islands for aesthetic reasons
    if (verifier.mapStage === appConstants.map.auditLaw) {
      this.legendDisclaimer += "<br /><a href='/audits/' style='font-weight: bold;'>Learn more about Audits >>></a><br />"
    }
    if (verifier.current.level === appConstants.level.state) {
      if (verifier.current.state_name == "American Samoa") {
        this.legendDisclaimer += "<br />Not pictured: Manuʻa Islands, Rose Atoll, and Swains Island";
      } else if (verifier.current.state_name == "Northern Mariana Islands") {
        this.legendDisclaimer += "<br />Not pictured: the Northern Islands Municipality and Rota";
      }
    }

    this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/legend.ejs'});

    this.remove();
    if (verifier.mode === appConstants.mode.search) {
      $('#legend-container-search').parent().addClass('col-md-3');
      $('#legend-container').parent().removeClass('col-md-3');

      $('#legend-container-search').show();
      $('#legend-container-search').html(this.ejsTemplate.render());
    } else {
      $('#legend-container').parent().addClass('col-md-3');
      $('#legend-container-search').parent().removeClass('col-md-3');

      $('#legend-container').show();
      $('#legend-container').html(this.ejsTemplate.render());
    }

    this.useFlex = verifier.current.map && 
                    legend.currentList.length > 8 && 
                    verifier.current.map.map_code === appConstants.map.fieldedEquip;
  },

  remove: function () {
    $('#legend-container').hide();
    $('#legend-container').empty();

    $('#legend-container-search').hide();
    $('#legend-container-search').empty()
  },

  render_row: function (code) {
    var legend_row = '<div class="legend-row">' +
      '<div class="legend-block" data-code="' + code + '"></div>' +
      '<div class="legend-text">' + legendCodes[code].legend_text + '</div>' +
      '<div class="clear"></div>' +
      '</div>';
  },

  sortedDataReturn: function (stage) {
    var features = [];
    var format = d3.format(".1f");
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
    var aggregator = new Aggregator();
    features.forEach(function (feature) {
      var featureAggregator = new Aggregator();
      addAggregatorMetrics(featureAggregator, feature.properties);
      aggregator = new Aggregator(aggregator.aggregate(featureAggregator));
    });
    var stageData = aggregator.get(stage);
    var sumStageData = d3.sum(Object.keys(stageData), function (key) {
      return stageData[key];
    });
    var sortedData = [];
    if (stageData !== undefined) {
      // sort the data based on mapCodes order.
      Object.keys(stageData).forEach(function (key) {
        sortedData.push({
          key: key.replace(/\s/g, '').toLowerCase() === "notapplicable" ? "Hand Counted Paper Ballots" : key.toLowerCase(),
          value: stageData[key],
          percentage: format(stageData[key] / sumStageData * 100)
        });
//        console.log("key=" + key + " value=" + stageData[key] + " percentage=" + format(stageData[key] / sumStageData * 100) + " sum=" + sumStageData)
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
    }
    return sortedData;
  }
}

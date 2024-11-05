var mapStyle = {
  audit: function(feature) {
    let fill = '#BFBFBF';

    switch(verifier.mapType) {
      case appConstants.mapType.auditBinding:
        field = 'audit_binding';
        break;
      case appConstants.mapType.auditComp:
        field = 'audit_comprehensiveness'
        break;
      case appConstants.mapType.auditMain:
      default:
        field = 'audit_main';
        break;
    }

    if(feature.properties[field] != null) {
      fill = '#' + feature.properties[field]['color'];
    }

    return {
      fillColor: fill,
      weight:  0.5,
      opacity: 1,
      color: "#FFFFFF",
      fillOpacity: 0.9
    };
  },

  fieldedEquip: function(feature) {
    let fill = '#BFBFBF';
    let borderColor = '#DDDDDD';
    let stateFeature = false;
    let field = verifier.current.map.data_field_name;
    let countyFeature = false;

    if (verifier.current.level === appConstants.level.national
      && (feature.properties.STATE !== undefined && feature.properties.STATE !== "02")  // Alaska
      && feature.properties.COUNTY === undefined) {
      // On national level we should ignore state codes
      fill = undefined;
      stateFeature = true;
    } else {
      if (feature.properties[field] != null) {
        fill = '#' + feature.properties[field]['color'];
      }
    }

    let shouldBlur = false;
    if (verifier.current.level === appConstants.level.county
      || verifier.current.level === appConstants.level.division) {
      if (parseInt(feature.properties.COUNTY, "10") !== parseInt(verifier.county, "10")) {
        shouldBlur = true;
      }
    }

    if (parseInt(feature.properties.COUNTY, "10") === parseInt(verifier.county, "10")) {
      borderColor = '#666';
      countyFeature = true;
    }

    return {
      fillColor: fill,
      weight: stateFeature ? 1 : countyFeature ? 2 : 0.5,
      opacity: 1,
      color: borderColor,
      fillOpacity: fill === undefined
        ? 0
        : shouldBlur ? 0.2 : 1
    };
  }
}
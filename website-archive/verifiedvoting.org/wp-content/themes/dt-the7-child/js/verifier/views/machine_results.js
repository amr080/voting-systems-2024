machine_results = {
  columns: { //pretty print column titles
    'Type of Equipment': 'equip_type',
    'Make': 'make',
    'Model': 'model_display',
    'VVPAT': 'vvpat',
    'Accessible Use': 'pp_acc',
    'First Fielded': 'first_fielded'
  },

  _initialize: function () {
    this.machines = verifier.current.machines;
    this.tabulation = verifier.current.tabulation;
    this.official = verifier.current.official;
    this.user = verifier.user;
    self = this;

    _(this.machines).each(function (machine) {
      var m = machine['model'];
      var model_url = machine['vv_url'];
      if (model_url) {
        machine['model_display'] = '<a href="' + model_url + '">' + machine['model'] + '</a>';
      } else {
        machine['model_display'] = machine['model'];
      }
      if (machine['first_fielded'] === null) {
        machine['first_fielded'] = 'N/A';
      }
      else if (machine['first_fielded'].charAt(0) == '-') {
        machine['first_fielded'] = machine['first_fielded'].substring(1) + " or earlier";
      }
    });

    this.std = [];
    this.ev = [];
    this.abs = [];
    this.prov = [];

    if (verifier.mapStage === appConstants.map.ppEquip
      || verifier.mapStage === appConstants.map.accEquip
      || verifier.mapStage === appConstants.map.epbEquip
      || (verifier.mapStage === appConstants.map.fieldedEquip && (verifier.mapType === 'ppEquip' || verifier.mapType === 'accEquip'))) {
      this.std = _(this.machines).filter(function (m) {
        if (verifier.mapStage === appConstants.map.accEquip || verifier.mapType === 'accEquip') {
          return m.pp_acc == 1 || m.vbm_acc == 1;
        } else {
          return m.pp_std == 1 || m.pp_acc == 1 || m.vbm_acc == 1;
        }
      });
    }

    if (verifier.mapStage === appConstants.map.ppEquip
      || verifier.mapStage === appConstants.map.epbEquip
      || (verifier.mapStage === appConstants.map.fieldedEquip && verifier.mapType === 'ppEquip')) {
      this.ev = _(this.machines).filter(function (m) {
        return m.ev_std == 1 || m.ev_acc == 1;
      });
      this.ev.sort((a, b) => {
        if ((a.equip_type === 'Ballot Marking Device' && b.equip_type != 'Ballot Marking Device') 
          && a.ev_std === 1) {
          return -1;
        }
        
        if ((b.equip_type === 'Ballot Marking Device' && a.equip_type != 'Ballot Marking Device')
          && b.ev_std === 1) {
          return 1;
        }
        return 0;
      })
    }

    if (verifier.mapStage === appConstants.map.ppEquip
      || verifier.mapStage === appConstants.map.absEquip
      || (verifier.mapStage === appConstants.map.fieldedEquip && (verifier.mapType === 'ppEquip' || verifier.mapType === 'absEquip'))) {
      this.abs = _(this.machines).filter(function (m) {
        return m.abs_ballots == 1 || m.absentee_accessible == 1;
      });
    }

    if (verifier.mapStage === appConstants.map.ppEquip
      || verifier.mapStage === appConstants.map.fieldedEquip
      || (verifier.mapStage === appConstants.map.fieldedEquip && verifier.mapType === 'ppEquip')) {
      this.prov = _(this.machines).filter(function (m) {
        return m.prov_ballots == 1;
      });
    }

    // further more filter the results on pool books map to contain only "poll book" equip types
    if (verifier.mapStage === appConstants.map.epbEquip) {
      var pattern = /poll book/i;   // case insensitive regex

      this.std = _(this.std).filter(function (m) {
        return m.equip_type.match(pattern);
      });

      this.ev = _(this.ev).filter(function (m) {
        return m.equip_type.match(pattern);
      });
    }

  },

  render: function () {
    this._initialize();

    var self = this;

    $('#machine-results-container').empty();

    $.each({
        'Election Day Equipment': self.std,
        'Early Voting Equipment (Including In Person Absentee)': self.ev,
        'Mail Ballot/Absentee Equipment': self.abs
      },
      function (key, machine) {
        if (machine.length > 0) {
          $('#machine-results-container').append(new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/machine_table.ejs'}).render({
            columns: self.columns,
            machines: machine,
            title: key,
            marking_method: self.official["marking_method"],
            tabulation: self.tabulation
          }));
        }
      });
  },

  remove: function () {
    $('#machine-results-container').empty();
  },

  machine_view_display: function () {
    window.location.reload();
    var self = this;
    self.render();
  },

  machine_context_change: function (changed, machine_id) {
    var self = this;
    if (changed === 'make') {
      $(document.getElementById('model-' + machine_id)).empty();
      self.model_list[document.getElementById('make-' + machine_id).value].forEach(function (option) {
        document.getElementById('model-' + machine_id).options.add(new Option(option, option))
      });
      self.machine_context_change('model', machine_id);
    }

    if (changed === 'model') {
      $(document.getElementById('equip_type_text-' + machine_id)).empty();
      $(document.getElementById('hardware_version-' + machine_id)).empty();
      $(document.getElementById('software_version-' + machine_id)).empty();
      $(document.getElementById('firmware_version-' + machine_id)).empty();
      self.equip_type_list[document.getElementById('model-' + machine_id).value].forEach(function (option) {
        document.getElementById('equip_type_text-' + machine_id).options.add(new Option(option, option));
      });
      self.hw_version_list[document.getElementById('model-' + machine_id).value].forEach(function (option) {
        document.getElementById('hardware_version-' + machine_id).options.add(new Option(option, option))
      });
      self.sw_version_list[document.getElementById('model-' + machine_id).value].forEach(function (option) {
        document.getElementById('software_version-' + machine_id).options.add(new Option(option, option))
      });
      self.fw_version_list[document.getElementById('model-' + machine_id).value].forEach(function (option) {
        document.getElementById('firmware_version-' + machine_id).options.add(new Option(option, option))
      });
// column_fc_attr_list no longer used - does document.getElementById here need to disappear completely?
// Need to set bmd, other fields based on column_fc_attr_list
//      self.bmd_list[document.getElementById('model-' + machine_id).value].forEach(function (option) {
      document.getElementById('bmd-' + machine_id).options.namedItem(option).selected = true;
//      });


    }
  },

  component_parameter_add: function (added, machine_id) {
    if ($(document.getElementById(added + '-new-' + machine_id)).is(":hidden")) {
      $(document.getElementById(added + '-' + machine_id)).hide();
      $(document.getElementById(added + '-new-' + machine_id)).show();
    } else {
      $(document.getElementById(added + '-' + machine_id)).show();
      $(document.getElementById(added + '-new-' + machine_id)).val("");
      $(document.getElementById(added + '-new-' + machine_id)).hide();
    }
  }

}

official = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/official.ejs'});
    }
    if (verifier.current.level !== appConstants.level.national && verifier.mode === appConstants.mode.navigate) {
      var area_name = '';
      switch (verifier.current.level) {
        case 'state':
          area_name = verifier.current.state_name;
          break;
        case 'county':
          area_name = verifier.current.county_name;
          break;
        case 'division':
          if (verifier.current.county_name) {
            area_name = verifier.current.division_name + ', ' + verifier.current.county_name;
          }
          else {
            area_name = verifier.current.division_name;
          }
      }

      var temp = verifier.current.official;
      temp.official_show_info = (temp.first_name && temp.last_name) && !temp.first_name.toLowerCase().includes('election administration in');
      temp.area_name = area_name;
      temp.year = verifier.year;
      temp.current_reg_voters_asofdate = new Date(temp.current_reg_voters_asofdate);
      temp.current_precincts_asofdate = new Date(temp.current_precincts_asofdate);
      temp.current_reg_voters_formatteddate = (temp.current_reg_voters_asofdate.getMonth() + 1) + '/' + temp.current_reg_voters_asofdate.getFullYear();
      temp.current_precincts_formatteddate = (temp.current_precincts_asofdate.getMonth() + 1) + '/' + temp.current_precincts_asofdate.getFullYear();

      $('#official-container').html(this.ejsTemplate.render(temp));
    } else {
      $('#official-container').html(this.ejsTemplate.render());
    }
  },

  remove: function () {
    $('#official-container').empty();
  }
}

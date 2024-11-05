search_results = {
  ejsTemplate: undefined,
  page_length: 100,
  current_page: 1,
  total_pages: 1,
  columns: { // pretty print column titles
    'State': 'state_name',
    'Jurisdiction': 'jurisdiction',
    'Type of Equipment': 'equipment_type',
    'Make': 'make',
    'Model': 'model',
    'VVPAT': 'vvpat',
    // 'Precincts': 'current_precincts'
  },

  render: function () {
    if (verifier.current.codes) {
      this.reset();
      this._render_template();
    }
  },

  reset: function () {
    // scrubby scrubby
    this.current_page = 1;
    this.total_pages = Math.ceil(verifier.current.codes.length / this.page_length);
  },

  // to be called anytime we update the view, e.g. when user clicks pagination buttons
  _render_template: function () {

    var machines = verifier.current.codes;
	var alertMessage = '';
    if (_.isArray(machines)) {
      machines = machines.slice((this.current_page - 1) * this.page_length, this.current_page * this.page_length);
    } else {
      machines = [];
    }
    console.log('machines length is ' + machines.length);

    if ((this.ejsTemplate === undefined) && (machines.length === 0)) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/search_results_empty.ejs'});
	  alertMessage = "Your search did not return any results";
    } else if ((this.ejsTemplate !== undefined) && (machines.length === 0)) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/search_results_empty.ejs'});
	  alertMessage = "Your search did not return any results";
    } else {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/search_results.ejs'});
	  alertMessage = "Displaying search results, Page "+ this.current_page +" of " + this.total_pages;
    }


    $('#search-results-container').html(this.ejsTemplate.render({
      columns: this.columns,
      machines: machines
    }));
	
	//Populating aria-live region to announce search results update Issue: VV-368
	$('#search-results-alert').html(alertMessage);

    $(".search-page").click(this.change_page);
  },

  change_page: function () {
    search_results.current_page = $(this).attr('data-page');
    search_results._render_template();
    return false;
  },

  remove: function () {
    $('#search-results-container').empty();
	
	//Emptying aria-live region holding search results update Issue: VV-368
	$('#search-results-alert').empty();
  }
}

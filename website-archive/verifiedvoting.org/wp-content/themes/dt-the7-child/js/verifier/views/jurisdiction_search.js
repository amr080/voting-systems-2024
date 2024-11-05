jurisdiction_search = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/jurisdiction_search.ejs'});
    }

    $('#jurisdictionsearch').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#jurisdictionsearch').empty();
  }
}
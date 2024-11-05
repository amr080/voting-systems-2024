voterlegend = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/voterlegend.ejs'});
    }

    // removed for now
    // $('#voter-legend').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#voter-legend').empty();
  }
}

maptoggle = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/maptoggle.ejs'});
    }

    $('#maptoggle').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#maptoggle').empty();
  }
}

mailballot = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/mailballot.ejs'});
    }

    $('#mail-ballot').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#mail-ballot').empty();
  }
}

votingequipment = {
  ejsTemplate: undefined,
  auditTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/votingequipment.ejs'});
    }

    $('#voting-equipment').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#voting-equipment').empty();
  }
}

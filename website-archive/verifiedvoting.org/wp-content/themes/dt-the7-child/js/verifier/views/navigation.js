navigation = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/navigation.ejs'});
    }

    $('#verifier-nav').html(this.ejsTemplate.render());
  }
}

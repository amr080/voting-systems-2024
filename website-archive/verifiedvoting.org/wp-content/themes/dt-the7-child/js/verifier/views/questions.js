questions = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/questions.ejs'});
    }

    $('#questions').html(this.ejsTemplate.render());
  }
}

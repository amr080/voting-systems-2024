pollbooks = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/pollbooks.ejs'});
    }

    $('#poll-books').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#poll-books').empty();
  }
}

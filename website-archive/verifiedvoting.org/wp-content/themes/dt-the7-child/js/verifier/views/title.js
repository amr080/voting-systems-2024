title = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/title.ejs'});
    }

    verifier.current.title =  verifier.titleReturn();

    $('#title-container').html(this.ejsTemplate.render(verifier.current));
  },

  loadingShow: function () {
    $('#verifier-title').html("<span role='status'><img src='/wp-content/themes/dt-the7-child/images-verifier/ajax-loader.gif' height='20' width='20' style='vertical-align:bottom;' alt=''> Loading...</span>");
  },

  remove: function () {
    $('#title-container').empty();
  }
}

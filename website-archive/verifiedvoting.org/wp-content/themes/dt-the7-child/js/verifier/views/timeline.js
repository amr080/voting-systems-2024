yearTimeline = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/timeline.ejs'});
    }

    $('#timeline').html(this.ejsTemplate.render());
  },

  remove: function () {
    $('#timeline').empty();
  }
};

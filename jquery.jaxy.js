(function($) {

$.fn.extend({

  jaxy: function() {
    return this.each(function() {
      if (/^a$/i.test(this.tagName)) $(this).ajaxLink();
      if (/^form$/i.test(this.tagName)) $(this).ajaxForm({dataType: 'script'});
    });
  },

  ajaxLink: function() {
    return this.click(function() {
      $.getScript(this.href);
      return false;
    });
  },

  submitClick: function() {
    return this.click(function() {
      var el = $(this);

      if (el.attr('target')) {
        el.findTarget().submit();
      } else {
        el.parents('form:first').submit();
      }

      return false;
    });
  },

  submitChange: function() {
    return this.change(function() {
      $(this).parents('form:first').submit();
    });
  },
  
  vals: function(vals) {
    for (var name in vals) {
      this.find('[name="' + name + '"]').val(vals[name]);
    }
    return this;
  },

  findTarget: function() {
    var target = this.attr('target'),
        found = this.parents(target);

    if (!found.length) found = $(target);
    return found;
  }

});

})(jQuery);

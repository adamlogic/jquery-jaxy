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
      $(this).parents('form:first').submit();
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
  }

});

})(jQuery);

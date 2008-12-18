(function($) {

$.fn.extend({

  jaxy: function() {
    return this.each(function() {
      if (/^a$/i.test(this.tagName)) $(this).jaxyLink();
      if (/^form$/i.test(this.tagName)) $(this).jaxyForm();
    });
  },

  jaxyLink: function() {
    return this.click(function() {
      $.getScript(this.href);
      return false;
    });
  },

  jaxyForm: function() {
    // ajax file uploads use an iframe hack, so tell the server we want a js response
    if (/multipart/.test(this.attr('enctype'))) {
      this.append('<input type="hidden" name="format" value="js" />');
    }
    return this.ajaxForm({dataType: 'script'})
  },

  submitOnClick: function() {
    return this.click(submitTargetOrParent);
  },

  submitOnChange: function() {
    return this.change(submitTargetOrParent);
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

function submitTargetOrParent() {
  var el = $(this);

  if (el.attr('target')) {
    el.findTarget().submit();
  } else {
    el.parents('form:first').submit();
  }

  return false;
}

})(jQuery);

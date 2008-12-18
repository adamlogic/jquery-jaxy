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

var $val = $.fn.val;
$.fn.val = function(values) {
  if (values == undefined) return $val.apply(this, arguments);

  if (values.constructor == Object) {
    for (var name in values) {
      $(this).find('[name="' + name + '"]').val(values[name]);
    }
    return this;
  }

  return $val.apply(this, arguments);
}

})(jQuery);

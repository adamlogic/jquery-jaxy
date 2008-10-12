(function($) {

$(function() {
  $('form.ajax').ensure('ajaxForm', {dataType: 'script'});
  $('a.ajax').ensure('ajaxLink');
  $('a.submit').ensure('submitClick');
  $('select.submit').ensure('submitChange');
});

$.fn.extend({

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
  }

});

})(jQuery);

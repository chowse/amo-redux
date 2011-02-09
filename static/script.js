

(function($) {
	$(function() {
		
		$('.expandable .expander').click(function() {
			$(this).closest('.expandable').toggleClass('expanded collapsed');
			return false;
		});
		
	});
})(jQuery);

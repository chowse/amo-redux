

(function($) {
	$(function() {
		
		$('#detail-about .expander a, #detail-about .collapser a').click(function() {
			$('#detail-about').toggleClass('expanded');
			return false;
		});
	});
})(jQuery);

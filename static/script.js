

(function($) {
	$(function() {
		
		$('.expandable .expander').click(function() {
			$(this).closest('.expandable').toggleClass('expanded collapsed');
			return false;
		});

		$('#proto-controls .close').click(function() {
			$('#proto-controls').hide();
			return false;
		});
		
		$('#proto-controls').delegate('a', 'click', function() {
			var btn = $(this),
			    cls = btn.data('class'),
			    doc = $(document.documentElement),
			    enabled = doc.hasClass(cls);
			
			doc.toggleClass(cls, !enabled);
			btn.toggleClass('selected', !enabled);
			
			return false;
		})
	});
})(jQuery);

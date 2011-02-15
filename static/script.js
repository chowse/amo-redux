

(function($) {
	$.fn.showLightbox = function() {
		var self = this;
		self.addClass('entering');
		setTimeout(function() {
			self.addClass('on').removeClass('entering');
		}, 100);
		return this;
	};
	$.fn.hideLightbox = function() {
		var self = this;
		self.addClass('leaving').removeClass('on');
		setTimeout(function() {
			self.removeClass('leaving');
		}, 400);
		return this;
	};
	
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
		
		$('.show-lightbox').click(function() {
			$('#lightbox, #lightbox-overlay').showLightbox();
			return false;
		});
		
		$('#lightbox-overlay, #lightbox-close').click(function() {
			$('#lightbox, #lightbox-overlay').hideLightbox();
			return false;
		});
	});
})(jQuery);

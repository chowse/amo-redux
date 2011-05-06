

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
		
		$('#proto-controls').delegate('a', 'click', function(e) {
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
		
		$('.site-balloon .close').click(function() {
			$(this)
				.closest('.site-balloon')
				.animate({ opacity: 0 }, 200, 'linear')
				.animate({ height: 'hide' }, 200, 'linear');
			return false;
		});
		
		$('.anim-scroll').click(function() {
			var href = $(this).attr('href');
			var target = $( href.match(/#.*$/)[0] );
			if (target.hasClass('expandable')) {
				target.addClass('expanded').removeClass('collapsed');
			}
			var top = target.offset().top - 15;
			$(document.documentElement).animate({ scrollTop: top }, 500);
			return false;
		});
		
		setTimeout(function() {
			$('#proto-controls').removeClass('initial');
		}, 1000);
	});
})(jQuery);

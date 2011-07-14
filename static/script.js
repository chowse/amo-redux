

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
	
	$.fn.searchSuggestions = function(results) {
		var self = this;
		
		this.keydown(function(e) {
			if (e.keyCode == 38 || e.keyCode == 40) {
				return false;
			}
		});
		
		this.keyup(function(e) {
			var val = $(this).val();
			var match = !!val;
			
			if (val) {
				$(results).find('.val').text(val);
				
				var pat = new RegExp('\\b'+val, 'gi');
			
				$(results).find('a').each(function(i) {
					if (i == 0) {
						return;
					}
					var inner = $(this).text();
					var newInner = inner.replace(pat, '<strong>$&</strong>');
					if (inner != newInner) {
						$(this).html(newInner).show();
						match = true;
					} else {
						$(this).hide();
					}
				});
			}
			
			$(results).toggleClass('visible', match);
			
			if (e.keyCode == 38 || e.keyCode == 40) {
				var sel = $(results).find('.sel');
				var elems = $(results).find('a:visible');
				var i = elems.index(sel.get(0));
				
				if (sel.length && i >= 0) {
					if (e.keyCode == 38) {
						i = Math.max(0, i-1);
					} else {
						i = Math.min(i+1, elems.length-1);
					}
				} else {
					i = 0;
				}
				
				sel.removeClass('sel');
				$(elems.get(i)).addClass('sel');
				
				return false;
			}
			
			else if (e.keyCode == 27) {
				$(results).removeClass('visible');
				$(results).find('.sel').removeClass('sel');
			}
			
			else {
				$(results).find('.sel').removeClass('sel');
				$(results).find('a:visible:first').addClass('sel');
			}
		});
		
		this.blur(function() {
			$('#site-search-suggestions').removeClass('visible');
		});
		
		this.closest('form').submit(function() {
			var sel = $('#site-search-suggestions .sel');
			if (sel) {
				window.location = sel.get(0).href;
				return false;
			}
		});
		
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
		
		$('#detail-langs .more a').click(function() {
			$('#detail-langs').addClass('expanded');
			return false;
		});
		
		$('#site-nav-search input').searchSuggestions('#site-search-suggestions');
		
		setTimeout(function() {
			$('#proto-controls').removeClass('initial');
		}, 1000);
	});
})(jQuery);

var Portfolio = {
	fade_to: 0.3,
	initialize: function() {
		this.quirkey_nav.initialize();
		$('.project a').each(function() {
			var l = $(this);
			var id = l.attr('href').replace(/\#project\//, '');
			l.click(function (e) {
				window.location = l.attr('href');
				Portfolio.projects.openDetail(id, e);
			});
		});
		$('.project_close a').livequery('click', function () {
			return Portfolio.projects.hideDetail();
		});
		$('.category_select a').livequery('click', function() {
				Portfolio.projects.highlightByURI($(this).attr('href'));
				return false;
		});
	},
	quirkey_nav: {
		opened: false,
		initialize: function() {
			var port = this;
			$('.quirkey_nav_open').click(function() {
				if (port.opened) {
					port.close();
				} else {
					port.open();
				}
			});
			$('.quirkey_nav_close').click(function() {
				port.close();
			});
		},
		open: function() {
			this.initial_top = $('#logo').css('top');
			$('#logo').animate({'top': '0px'}, 400);
			$('#quirkey_nav').slideDown(400, function() {
				$('.quirkey_nav_close').slideDown();
			});
			this.opened = true;
		},
		close: function() {
			if (!this.opened) { return; }
			$('.quirkey_nav_close').hide();
			$('#logo').animate({'top': this.initial_top}, 400);
			$('#quirkey_nav').slideUp(400);
			this.opened = false;
		}
	},
	projects: {
		openDetail: function(id, e) {
			Portfolio.quirkey_nav.close();
			var pointer_y = 100;			
			if (typeof e != 'undefined') {
				var pointer_y = e.pageY;
			}
			var scroll_top = $(window).scrollTop();
			var y = scroll_top + 50;
			$.get('/project/' + id, {no_layout: true}, function (data) {
				$('#content').animate({'opacity': 0.5}, 'fast');
				$('#project_holder').css({'top': y}).html(data).fadeIn('slow');	
			});
		},
		hideDetail: function() {
			$('#project_holder').fadeOut('fast', function () {
				$('#content').animate({'opacity': 1}, 'fast');
			});
			return false;
		},
		highlightByURI: function(uri) {
			this.hideDetail();
			this.highlightByClass(this.uriToClass(uri));
		},
		all: function() {
			return $('.project');
		},
		uriToClass: function(uri) {
			return uri.replace(/^\/?\#/, '').replace(/\//, '_');
		},
		unhighlightAll: function() {
			this.all().removeClass('selected_project');
			$('.category_select').removeClass('selected');
		},
		reset: function() {
			this.unhighlightAll();
			this.all().animate({'opacity': 1}, 'fast');
		},
		fadeAll: function(callback) {
			this.all().animate({'opacity': Portfolio.fade_to}, 'fast', callback);
		},
		isHighlighted: function(class_name) {
			return $('.category_select.' + class_name).is('.selected');
		},
		highlightByClass: function(class_name) {
			if (this.isHighlighted(class_name)) {
				return this.reset();
			}
			this.unhighlightAll();
			var port = this;
			this.fadeAll(function () {
				$('.project.' + class_name).each(function() {
					port.highlightProject(this);
				});
			});
			$('.category_select.' + class_name).each(function() {
				port.highlightCategorySelect(this);
			});
		},
		highlightCategorySelect: function(select_el) {
			$(select_el).addClass('selected');
		},
		highlightProject: function (project_el) {
			$(project_el).addClass('selected_project');
			$(project_el).animate({'opacity': 1}, 'fast');
		}
	}
};
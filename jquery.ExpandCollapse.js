/**
* Expand/Collapse - jQuery plugin
* Description: A plugin for expanding/collapsing single elements or groups of related elements
* Author: Kellan Craddock
* Email: kellancraddock@gmail.com
*/
(function($) {

	//Create plugin obj
	$.fn.expandCollapse = function(options) {
		return this.each(function(i) {
			$.fn.expandCollapse.createInstance($(this), options);
		});
	}
	
	//Aquire plugin instance
	$.fn.expandCollapse.createInstance = function(element, options) {
		if (element.data('expandCollapse')) {
			//Existing Instance
			return element.data('expandCollapse');
		} else {
			//New Instance
			var instance = new $.fn.expandCollapse.instance(element, options);
			element.data('expandCollapse').init(element, options);
			return element.data('expandCollapse');
		}
	}
	
	//Instance
	$.fn.expandCollapse.instance = function(container, i) {
	
		var self = this;
		this.container;
		this.options;
		
		//Default options
		this.defaults = {
			trigger: '',
			toggle: $(),
			content: '.body',
			defaultState: 'collapsed',
			onOpen: function() {},
			onClose: function() {}
		}
		
		//Initialize 
		this.init = function(container, options) {
			//Set the container
			self.container = container;
			//Extend the default options obj
			self.options = $.extend({}, self.defaults, options);
			
			//Set up default states
			if (self.options.defaultState == 'collapsed') {
				container.not($('.expanded')).addClass('collapsed').hide();
			} else if (self.options.defaultState == 'expanded') {
				container.not($('.collapsed')).addClass('expanded').show();
				if (container.hasClass('collapsed')) { container.hide(); }
			}
			
			//Bind click on single element
			$(self.options.trigger).bind('click', function(e) {
				e.preventDefault();
	    		self.change();
	    	});
		}
		
		//Public method for toggling between expanded and collapsed states
		this.change = function() {
			if (self.container.hasClass('collapsed')) {
				self.open();
			} else if (self.container.hasClass('expanded')) {
				self.close();	
			}
		}
		
		//Public method to close an individual container
	    this.close = function() {
	    	$(self.container).slideUp('fast');
	    	self.container.removeClass('expanded').addClass('collapsed');
	    	self.options.trigger.removeClass('expanded').addClass('collapsed');
	    	self.options.onClose();
	    }
    
	    //Public method to open an individual container
	   this.open = function() {
	    	$(self.container).slideDown('fast');
	    	self.container.removeClass('collapsed').addClass('expanded');
	    	self.options.trigger.removeClass('collapsed').addClass('expanded');
	    	self.options.onOpen();
	    }
	    
	    //Set plugin instance to data
	    container.data('expandCollapse', this);
		
    }
	
})(jQuery);
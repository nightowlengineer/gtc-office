define([ 'jquery', 'x-editable', 'marionette', 'underscore.string'], function($, editable, Marionette, s) {
	
	return {
		setupEditable :function(selector, model)
		{
			$.fn.editable.defaults.mode = 'inline';
			$(selector).editable({
				success : function(response, newValue) {
					model.set(this.id, newValue);
			        model.save();
			    }
			});
		}
	}
});
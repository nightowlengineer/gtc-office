define([ 'jquery', 'x-editable', 'marionette', 'underscore.string'], function($, editable, Marionette, s) {
	
	return {
		setupEditable : function(selector, model)
		{
			$.fn.editable.defaults.mode = 'inline';
			$(selector).editable({
				success : function(response, newValue) {
					model.set(this.id, newValue);
			        model.save();
			    }
			});
		},
		
		setupSourceData : function(dataArray)
		{
			var sourceData = '[';
			
			_.each(dataArray.responseJSON, function(item){
				sourceData += "{'value':'" + item + "', 'text':'" + item + "'},"; 
			});
			
			sourceData = s.rtrim(sourceData, ",");
			
			sourceData += ']';
			
			return sourceData;
		}
	}
});
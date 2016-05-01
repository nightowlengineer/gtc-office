define([ 'jquery'], function($) {
	
	return {
		serializeForm : function(selector)
		{
			var mappedObject = {};
			$(selector).serializeArray().map(function(x){
				mappedObject[x.name] = x.value;
			});
			return mappedObject;
		}
	}
});
define([ 'backbone' ], function(Backbone) {

	return Backbone.Model.extend({
		idAttribute : "_id",
		basePath : "https://api.dev.gtc.org.uk/",
		urlRoot : "https://api.dev.gtc.org.uk/",
		
		getPlainData : function(apiPath)
		{
			return $.ajax({
				type: 'GET',
				url : this.basePath + apiPath,
				async : false,
				success : function(data){
					return data;
				}
			});
		}
	});

});
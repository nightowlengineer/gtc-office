define([ 'backbone' ], function(Backbone) {

	return Backbone.Model.extend({
		idAttribute : "_id",
		urlRoot : "https://api.dev.gtc.org.uk/"
	});

});
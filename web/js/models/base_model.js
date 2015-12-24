define([ 'backbone' ], function(Backbone) {

	return Backbone.Model.extend({
		idAttribute : "_id",
		urlRoot : "https://localhost:8443/"
	});

});
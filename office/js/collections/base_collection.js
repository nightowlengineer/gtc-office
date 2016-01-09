define([ 'backbone' ], function(Backbone) {

	return Backbone.Collection.extend({
		url : "https://api.dev.gtc.org.uk/"
	});

});
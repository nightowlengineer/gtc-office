define([ 'backbone' ], function(Backbone) {

	return Backbone.Collection.extend({
		url : "https://services.gtc.org.uk/api/",
		fetch : function(options) {
			options = options || {};
			var custom = {
			    'Content-type': 'application/json',
			    'Accept': 'application/json',
			    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
			  };
			options.headers = options.headers ? _.extend(options.headers, custom) : custom;
			return Backbone.Collection.prototype.fetch.call(this, options);
		}
	});

});
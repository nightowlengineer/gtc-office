define([ 'backbone', 'app' ], function(Backbone, GtcOffice) {

	return Backbone.Collection.extend({
		basePath : function() {
			return GtcOffice.ConfigHandler.getValue("basePath");
		},
		url : function() {
			return basePath();
		},
		fetch : function(options) {
			options = options || {};
			var custom = {
			    'Content-type': 'application/json',
			    'Accept': 'application/json',
			    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
			  };
			options.headers = options.headers ? _.extend(options.headers, custom) : custom;
			options.error = this.errorHandler;
			return Backbone.Collection.prototype.fetch.call(this, options);
		},
		errorHandler : function(collection, response, options) {
			GtcOffice.navigate("#error/502", true);
		}
	});

});
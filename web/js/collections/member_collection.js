define([ 'collections/base_collection', 'models/member_model' ], function(BaseCollection, MemberModel) {

	return BaseCollection.extend({
		url: new BaseCollection().url + "member/",
		model : MemberModel,
		
		fetchSpecific : function(options) {
			options = options || {};
			return Backbone.Collection.prototype.fetch.call(this, options);
		},
		
		getAllMembers : function() {
			var options = {};
			options.url = this.url + "all";
			return this.fetchSpecific(options);
		},
		
		getApplications : function() {
			var options = {};
			options.url = this.url + "applications";
			return this.fetchSpecific(options);
		},
		
		getCurrentMembers : function() {
			var options = {};
			options.url = this.url + "status/current";
			return this.fetchSpecific(options);
		}
	});

});
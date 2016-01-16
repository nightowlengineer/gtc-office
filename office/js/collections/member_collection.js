define([ 'collections/base_collection', 'models/member_model' ], function(BaseCollection, MemberModel) {

	return BaseCollection.extend({
		url: new BaseCollection().url + "member/",
		model : MemberModel,
		
		getAllMembers : function() {
			var options = {};
			options.url = this.url + "all";
			return this.fetch(options);
		},
		
		getApplications : function() {
			var options = {};
			options.url = this.url + "applications";
			return this.fetch(options);
		},
		
		getCurrentMembers : function() {
			var options = {};
			options.url = this.url + "status/current";
			return this.fetch(options);
		}
	});

});
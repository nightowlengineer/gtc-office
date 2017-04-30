define([ 'models/base_model' ], function(BaseModel) {

	return BaseModel.extend({
		url : function() {
			return this.urlRoot() + "member/id/" + this.id;
		},

		createMember : function(callback) {
			var oldUrl = this.url;
			this.url = new BaseModel().urlRoot() + "member/";
			this.save(
				this.attributes,
				{
					success : function(model, response)
					{
						callback(model, response);
					}
				}
			);
			this.url = oldUrl;
		},
		
		getMyMember : function(callback) {
			var oldUrl = this.url;
			this.url = new BaseModel().urlRoot() + "member/me";
			this.fetch(
				this.attributes,
				{
					success : function(model, response)
					{
						callback(model, response);
					}
				}
			);
			this.url = oldUrl;
		},
		
		getMemberByNumber : function(model, callback) {
			var oldUrl = this.url;
			this.url = new BaseModel().urlRoot() + "member/" + model.get("membershipNumber");
			this.sync(
				"read",
				model,
				this.attributes,
				{
					success : function(model, response)
					{
						callback(model, response);
					}
				}
			);
			this.url = oldUrl;
		},
		
		getNextMembershipNumber : function() {
			return this.getPlainData("member/nextMemberNumber", false);
		},

		getMemberTypes : function(cache) {
			return this.getPlainData("member/memberTypes", cache);
		},
		
		getSalutations : function(cache) {
			return this.getPlainData("member/salutationTypes", cache);
		},

		getLocations : function(cache) {
			return this.getPlainData("member/locationTypes", cache);
		},

		getStatuses : function(cache) {
			return this.getPlainData("member/statusTypes", cache);
		},
		
		importMembers : function(data, overwrite, callback) {
			var options = {};
			if (!overwrite)
			{
				// If undefined, play safe
				overwrite = false;
			}
			options.url = new BaseModel().urlRoot() + "member/upload/" + overwrite;
			// Use $ for upload - investigate Backbone.sync/ajax in the future
			$.ajax({
			    url: options.url,
			    data: data,
			    type: 'POST',
			    contentType: false,
			    processData: false,
			})
			.done(function(data)
			{
				callback(data);
			});
		}
	});

});
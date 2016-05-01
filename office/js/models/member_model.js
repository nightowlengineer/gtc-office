define([ 'models/base_model' ], function(BaseModel) {

	return BaseModel.extend({
		urlRoot : new BaseModel().urlRoot + "member/id/",

		createMember : function(callback) {
			var oldUrl = this.urlRoot;
			this.urlRoot = new BaseModel().urlRoot + "member/";
			this.save(
				this.attributes,
				{
					success : function(model, response)
					{
						callback(model, response);
					}
				}
			);
			this.urlRoot = oldUrl;
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
		}
	});

});
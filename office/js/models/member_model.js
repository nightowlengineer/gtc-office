define([ 'models/base_model' ], function(BaseModel) {

	return BaseModel.extend({
		urlRoot : new BaseModel().urlRoot + "member/id/",

		createMember : function() {
			var oldUrl = this.urlRoot;
			this.urlRoot = new BaseModel().urlRoot + "member/";
			this.save(
				this.attributes,
				{
					success : function(model, response)
					{
						console.debug(model);
					}
				}
			);
			this.urlRoot = oldUrl;
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
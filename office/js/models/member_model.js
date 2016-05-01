define([ 'models/base_model' ], function(BaseModel) {

	return BaseModel.extend({
		urlRoot : new BaseModel().urlRoot + "member/id/",
		
		createMember : function()
		{
			var oldUrl = this.urlRoot;
			this.urlRoot = new BaseModel().urlRoot + "member/";
			var createdMember = this.save();
			this.urlRoot = oldUrl;
			return createdMember;
		},
		
		getSalutations : function(cache)
		{
			return this.getPlainData("member/salutationTypes", cache);
		},
		
		getLocations : function(cache)
		{
			return this.getPlainData("member/locationTypes", cache);
		},
		
		getStatuses : function(cache)
		{
			return this.getPlainData("member/statusTypes", cache);
		}
	});

});
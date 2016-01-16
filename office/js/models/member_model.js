define([ 'models/base_model' ], function(BaseModel) {

	return BaseModel.extend({
		urlRoot : new BaseModel().urlRoot + "member/id/",
		
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
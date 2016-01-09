define([ 'models/base_model' ], function(BaseModel) {

	return BaseModel.extend({
		urlRoot : new BaseModel().urlRoot + "member/id",
		
		getSalutations : function()
		{
			return this.getPlainData("member/salutationTypes");
		},
		
		getLocations : function()
		{
			return this.getPlainData("member/locationTypes");
		}
	});

});
define([ 'models/base_model' ], function(BaseModel) {

	return BaseModel.extend({
		urlRoot : new BaseModel().urlRoot + "member/id"
	});

});
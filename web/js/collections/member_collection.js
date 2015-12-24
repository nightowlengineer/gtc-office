define([ 'collections/base_collection', 'models/member_model' ], function(BaseCollection, MemberModel) {

	return BaseCollection.extend({
		url: new BaseCollection().url + "member/all",
		model : MemberModel
	});

});
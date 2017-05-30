define([ 'marionette', 'text!templates/footer.html', 'models/base_model' ], function(Marionette,
		footerTemplate, BaseModel) {

	return Marionette.ItemView.extend({
		template : _.template(footerTemplate),
		
		templateHelpers : function()
		{
			return {
				version: new BaseModel().getPlainData("version",true)
			};
		}
	});
});
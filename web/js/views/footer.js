define([ 'marionette', 'text!templates/footer.html' ], function(Marionette,
		footerTemplate) {

	var FooterView = Marionette.ItemView.extend({
		template : footerTemplate
	});
	return FooterView;
});
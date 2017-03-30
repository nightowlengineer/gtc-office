define([ 'marionette', 'text!templates/footer.html' ], function(Marionette,
		footerTemplate) {

	var FooterView = Marionette.View.extend({
		template : footerTemplate
	});
	return FooterView;
});
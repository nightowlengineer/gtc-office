define([ 'marionette', 'text!templates/home.html' ], function(Marionette,
		homeTemplate) {

	return Marionette.LayoutView.extend({
		template : _.template(homeTemplate),
		templateHelpers : function() {
			return {
				optionalMessage : this.optionalMessage,
				isLoggedIn : GtcOffice.isLoggedIn
			};
		},

		initialize : function(options) {
			this.optionalMessage = options.optionalMessage;
			this.render();
		},
	});
});
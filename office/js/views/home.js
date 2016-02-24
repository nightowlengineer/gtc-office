define([ 'marionette', 'text!templates/home.html' ], function(Marionette,
		homeTemplate) {

	return Marionette.LayoutView.extend({
		template : _.template(homeTemplate),
		templateHelpers : function() {
			return {
				optionalMessage : this.optionalMessage,
				loggedIn : GtcOffice.userProfile == null ? false : true
			};
		},

		initialize : function(options) {
			this.optionalMessage = options.optionalMessage;
			this.render();
		},
	});
});
define([ 's', 'marionette', 'text!templates/dash.html' ], function(s,
		Marionette, dashTemplate) {

	return Marionette.LayoutView.extend({
		template : _.template(dashTemplate),
		templateHelpers : function() {
			return {
				optionalMessage : this.optionalMessage,
				loggedIn : GtcOffice.userProfile == null ? false : true,
				userProfile : GtcOffice.userProfile,
				nickname : s.capitalize(GtcOffice.userProfile.nickname)
			};
		},

		initialize : function(options) {
			var self = this;
			this.optionalMessage = options.optionalMessage;
			GtcOffice.getProfile().done(function() {
				if (GtcOffice.isLoggedIn) {
					self.render();
				} else {
					GtcOffice.navigate("#", true);
				}
			});

		},
	});
});
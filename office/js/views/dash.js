define([ 'marionette', 'text!templates/dash.html' ], function(Marionette,
		dashTemplate) {

	return Marionette.LayoutView.extend({
		template : _.template(dashTemplate),
		templateHelpers : function() {
			GtcOffice.getProfile().done(function() {
				if (GtcOffice.isLoggedIn) {
					GtcOffice.regions.getRegion('header').currentView.render();
					GtcOffice.showView(new DashView());
					GtcOffice.setNav("dash");
				}
			});
			
			return {
				optionalMessage : this.optionalMessage,
				loggedIn : GtcOffice.userProfile == null ? false : true,
				userProfile : GtcOffice.userProfile
			};
		},

		initialize : function(options) {
			this.optionalMessage = options.optionalMessage;
			this.render();
		},
	});
});
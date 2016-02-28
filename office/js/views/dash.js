define([ 'marionette', 'text!templates/dash.html' ], function(Marionette,
		dashTemplate) {

	return Marionette.LayoutView.extend({
		template : _.template(dashTemplate),
		templateHelpers : function() {
			return {
				optionalMessage : this.optionalMessage,
				loggedIn : GtcOffice.userProfile == null ? false : true,
				userProfile : GtcOffice.userProfile
			};
		},

		initialize : function(options) {
			var self = this;
			this.optionalMessage = options.optionalMessage;
			GtcOffice.getProfile().done(function() {
				self.render();
			});
			
		},
	});
});
define([ 'underscore.string', 'marionette', 'text!templates/dash.html', 'models/member_model' ], function(s,
		Marionette, dashTemplate, Member) {

	return Marionette.View.extend({
		template : _.template(dashTemplate),
		templateContext : function() {
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
					var currentMember = new Member().getMyMember(function(model, response){
						self.render();
					});
				} else {
					GtcOffice.navigate("#", true);
				}
			});

		},
	});
});
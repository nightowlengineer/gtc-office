define([ 'underscore.string', 'marionette', 'text!templates/dash.html', 'models/member_model', 'views/member/member_core' ], function(s,
		Marionette, dashTemplate, Member, MemberCoreView) {

	return Marionette.LayoutView.extend({
		template : _.template(dashTemplate),
		templateHelpers : function() {
			var userProfile = GtcOffice.userProfile;
			return {
				optionalMessage : this.optionalMessage,
				loggedIn : userProfile == null ? false : true,
				userProfile : userProfile,
				nickname : userProfile ? s.capitalize(userProfile.nickname) : "Guest",
				membershipNumber : userProfile ? userProfile.app_metadata.membershipNumber : null
			};
		},
		
		regions : {
			myMembership : "#myMembership"
		},

		initialize : function(options) {
			var self = this;
			this.optionalMessage = options.optionalMessage;
			GtcOffice.getProfile().done(function() {
				if (GtcOffice.isLoggedIn) {
					var currentMember = new Member().getMyMember(function(model, response){
						var memberCoreView = new MemberCoreView({
							member: model
						});
						self.myMembership.show(memberCoreView);
					});
				} else {
					GtcOffice.navigate("#", true);
				}
			});
		},
	});
});
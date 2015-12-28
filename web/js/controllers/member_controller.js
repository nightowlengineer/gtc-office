define([ 'app', 'marionette', 'views/member/member_home', 'views/member/member_core' ], function(App, Marionette,
		MemberHomeView, MemberCoreView) {

	return Marionette.Controller.extend({
		home : function() {
			console.log("MemberController.home called");
			GtcOffice.showView(new MemberHomeView());
		},
		
		view : function(memberId) {
			console.log("MemberController.view called");
			GtcOffice.showView(new MemberCoreView({memberId : memberId}));
		}
	});

});
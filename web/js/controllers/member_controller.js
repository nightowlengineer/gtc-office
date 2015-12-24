define([ 'app', 'marionette', 'views/member/member_home' ], function(App, Marionette,
		MemberHomeView) {

	return Marionette.Controller.extend({
		home : function() {
			console.log("MemberController.home called");
			GtcOffice.showView(new MemberHomeView());
		}
	});

});
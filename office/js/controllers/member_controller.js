define([ 'app', 'marionette', 'views/member/member_home', 'views/member/member_core' , 'views/member/member_list'], function(App, Marionette,
		MemberHomeView, MemberCoreView, MemberListView) {

	return Marionette.Controller.extend({
		home : function() {
			console.log("MemberController.home called");
			GtcOffice.showView(new MemberHomeView());
			GtcOffice.setNav("member.home");
		},
		
		all : function() {
			GtcOffice.showView(new MemberListView());
			GtcOffice.setNav("member.all");
		},
		
		applications : function() {
			console.log("MemberController.applications called");
			GtcOffice.showView(new MemberListView({
				listType : "applications"
			}));
			GtcOffice.setNav("member.applications");
		},
		
		current : function(){
			console.log("MemberController.current called");
			GtcOffice.showView(new MemberListView({
				listType : "current"
			}));
			GtcOffice.setNav("member.current");
		},
		
		view : function(memberId) {
			console.log("MemberController.view called");
			GtcOffice.showView(new MemberCoreView({memberId : memberId}));
			GtcOffice.setNav("member.view");
		}
	});

});
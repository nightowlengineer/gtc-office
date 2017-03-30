define([ 'app', 'marionette', 'views/member/member_home',
		'views/member/member_core', 'views/member/member_list',
		'views/member/member_create', 'models/member_model', 'collections/member_collection' ], function(App,
		Marionette, MemberHomeView, MemberCoreView, MemberListView,
		MemberCreateView, Member, Members) {

	return Marionette.Object.extend({
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

			var members = new Members();
			var p = members.getApplications();

			p.done(function() {
				var memberView = new MemberListView({
					collection : members,
					showMemberNumber: false
				});
				memberView.render();
				GtcOffice.showView(memberView);
				GtcOffice.setNav("member.applications");
			});
		},

		create : function() {
			console.log("MemberController.create called");
			GtcOffice.showView(new MemberCreateView());
			GtcOffice.setNav("member.create");
		},

		current : function() {
			console.log("MemberController.current called");
			GtcOffice.showView(new MemberListView({
				listType : "current"
			}));
			GtcOffice.setNav("member.current");
		},

		view : function(memberId) {
			console.log("MemberController.view called");
			var self = this;
			this.member = new Member({
				_id : memberId
			});
			GtcOffice.getProfile().done().then(function() {
				self.member.fetch().done(function() {
					GtcOffice.showView(new MemberCoreView({
						member : self.member
					}));
				}).fail(function() {
					GtcOffice.navigate("#member", true);
				});
			});

			GtcOffice.setNav("member.view");
		}
	});

});
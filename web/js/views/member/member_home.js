define([ 'marionette', 'text!templates/member/member_home.html',
		'collections/member_collection', 'views/member/member_table' ], function(Marionette,
		memberHomeTemplate, Members, MemberTableView) {

	return Marionette.ItemView.extend({
		my_template : _.template(memberHomeTemplate),
		templateHelpers : function() {
			return {
				totalMembers : "1596",
				overdueMembers: "3",
				lapsingMembers: "6",
				openApplications : "20"
			};
		},

		initialize : function() {
			this.render();
			var that = this;
			var members = new Members().fetch();
			members.done(function() {
				GtcOffice.show(new MemberTableView({
					collection: that.members
				}));
			});
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
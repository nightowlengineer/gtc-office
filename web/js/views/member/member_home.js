define([ 'marionette', 'text!templates/member/member_home.html',
		'collections/member_collection', 'views/member/member_table' ], function(Marionette,
		memberHomeTemplate, Members, MemberTableView) {

	return Marionette.LayoutView.extend({
		my_template : _.template(memberHomeTemplate),
		templateHelpers : function() {
			return {
				totalMembers : this.members.length,
				overdueMembers: "3",
				lapsingMembers: "6",
				openApplications : "20"
			};
		},
		
		regions : {
				memberTable : "#memberTable"
		},

		initialize : function() {
			var that = this;
			this.members = new Members();
			var p = this.members.fetch();
			
			p.done(function() {
				var memberTableView = new MemberTableView({
					collection: that.members
				});
				that.render();
				that.memberTable.show(memberTableView);
			});
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
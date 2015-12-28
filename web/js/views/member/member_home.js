define([ 'marionette', 'text!templates/member/member_home.html',
		'collections/member_collection', 'views/member/member_table' ], function(Marionette,
		memberHomeTemplate, Members, MemberTableView) {

	return Marionette.LayoutView.extend({
		my_template : _.template(memberHomeTemplate),
		templateHelpers : function() {
			return {
				totalMembers : this.members.length,
				currentMembers: this.members.where({"status":"CURRENT"}).length,
				lapsingMembers: this.members.where({"status":"LAPSED"}).length,
				openApplications : this.members.where({"status":"APPLIED"}).length + this.members.where({"status":"APPROVED"}).length
			};
		},
		
		regions : {
				memberTable : "#memberTableRegion"
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
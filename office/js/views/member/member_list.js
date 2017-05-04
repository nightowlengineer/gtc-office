define([ 'marionette', 'text!templates/member/member_list.html',
		'collections/member_collection', 'views/member/member_table' ], function(Marionette,
		memberListTemplate, Members, MemberTableView) {

	return Marionette.LayoutView.extend({
		my_template : _.template(memberListTemplate),
		templateHelpers : function() {
			return {
				listTitle : this.options.listTitle
			};
		},
		
		regions : {
				memberTable : "#memberTableRegion"
		},

		initialize : function(options) {
			var that = this;
			this.listType = options.listType;

			this.members = new Members();
			
			var p;
			var showMemberNumber = true;
			
			if (this.listType == "current")
			{
				p = this.members.getCurrentMembers();
			}
			else if (this.listType == "applications")
			{
				p = this.members.getApplications();
				showMemberNumber = false;
			}
			else
			{		
				p = this.members.getAllMembers();
			}
			
			p.done(function() {
				var memberTableView = new MemberTableView({
					collection: that.members,
					showMemberNumber : showMemberNumber
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
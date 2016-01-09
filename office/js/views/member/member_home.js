define([ 'marionette', 'text!templates/member/member_home.html',
		'collections/member_collection' ], function(Marionette,
		memberHomeTemplate, Members) {

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
			var p = this.members.getAllMembers();
			
			p.done(function() {
				that.render();
			});
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
define([ 'marionette', 'text!templates/member/member_home.html',
		'collections/member_collection' ], function(Marionette,
		memberHomeTemplate, Members) {

	return Marionette.ItemView.extend({
		my_template : _.template(memberHomeTemplate),
		templateHelpers : function() {
			return {
				totalMembers : "1596"
			};
		},

		initialize : function() {
			var that = this;
			var members = new Members().fetch();
			members.done(function() {
				that.render();
			});
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
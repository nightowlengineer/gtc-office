define([ 'marionette', 'text!templates/member/member_table.html',
		'collections/member_collection', 'views/member/member_tableitem' ], function(Marionette,
		memberTableTemplate, Members, MemberTableItemView) {

	return Marionette.CompositeView.extend({
		my_template : _.template(memberTableTemplate),
		childView : MemberTableItemView,
		childViewContainer : "tbody",

		initialize : function() {
			var that = this;
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
define([ 'marionette', 'text!templates/member/member_tableitem.html' ], function(Marionette,
				MemberTableItemViewTemplate ) {

	return Marionette.ItemView.extend({
		my_template : _.template(MemberTableItemViewTemplate),
		
		tagName : "tr",
		
		initialize : function() {

		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
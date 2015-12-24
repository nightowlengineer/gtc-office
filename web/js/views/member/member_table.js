define([ 'marionette', 'text!templates/member/member_table.html',
		'views/member/member_tableitem' ], function(Marionette,
		memberTableTemplate, MemberTableItemView) {

	return Marionette.CollectionView.extend({
		//my_template : _.template(memberTableTemplate),
		template : memberTableTemplate,
		tagName : "table",
		childView : MemberTableItemView,
		childViewContainer : "tbody",
		collection : this.collection,
		
		templateHelpers : function() {
			return {
				totalMembers : this.collection.length,
				overdueMembers: "3",
				lapsingMembers: "6",
				openApplications : "20"
			};
		},

		initialize : function() {
			var that = this;
		},
/*
		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}*/
	});
});
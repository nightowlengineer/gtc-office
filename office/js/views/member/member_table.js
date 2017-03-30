define([ 'marionette', 'text!templates/member/member_table.html',
		'views/member/member_tableitem', 'datatables' ], function(Marionette,
		memberTableTemplate, MemberTableItemView) {

	return Marionette.CollectionView.extend({
		template : _.template(memberTableTemplate),
		
		templateContext : function() {
			return {
				showMemberNumber : this.showMemberNumber
			};
		},
		
		tagName : "table",
		
		childView : MemberTableItemView,
		
		//childViewContainer : "tbody",
		
		childViewOptions : function(model, index){
			return {
				showMemberNumber : this.showMemberNumber				
			}
		},
		
		initialize : function(options)
		{
			this.showMemberNumber = options.showMemberNumber;
			this.render();
		},
		
		render : function()
		{
			this.$el.html(this.template(this.templateContext()));
		}
	});
});
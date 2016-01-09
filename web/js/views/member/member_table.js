define([ 'marionette', 'text!templates/member/member_table.html',
		'views/member/member_tableitem', 'datatables' ], function(Marionette,
		memberTableTemplate, MemberTableItemView) {

	return Marionette.CompositeView.extend({
		template : _.template(memberTableTemplate),
		
		templateHelpers : function() {
			return {
				showMemberNumber : this.showMemberNumber
			};
		},
		
		childView : MemberTableItemView,
		
		childViewContainer : "tbody",
		
		childViewOptions : function(model, index){
			return {
				showMemberNumber : this.showMemberNumber				
			}
		},
		
		initialize : function(options)
		{
			this.showMemberNumber = options.showMemberNumber;
		},
		
		onShow : function(){
			$("#memberTable").DataTable();
		}
	});
});
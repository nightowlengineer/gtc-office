define([ 'marionette', 'text!templates/member/member_table.html',
		'views/member/member_tableitem', 'datatables' ], function(Marionette,
		memberTableTemplate, MemberTableItemView) {

	return Marionette.CompositeView.extend({
		template : memberTableTemplate,
		childView : MemberTableItemView,
		childViewContainer : "tbody",
		collection : this.collection,
		
		onShow : function(){
			$("#memberTable").DataTable();
		}
	});
});
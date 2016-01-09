define([ 'marionette', 'text!templates/member/member_tableitem.html' ],
		function(Marionette, MemberTableItemViewTemplate) {

			return Marionette.ItemView.extend({
				template : _.template(MemberTableItemViewTemplate),
				
				tagName : "tr",

				templateHelpers : function() {
					return {
						membershipNumber : this.model.get("membershipNumber"),
						firstName : this.model.get("firstName"),
						id : this.model.id,
						showMemberNumber : this.showMemberNumber
					};
				},
				
				initialize : function(options)
				{
					this.showMemberNumber = options.showMemberNumber;
				}
			});
		});
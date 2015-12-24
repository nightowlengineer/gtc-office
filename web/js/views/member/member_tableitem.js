define([ 'marionette', 'text!templates/member/member_tableitem.html' ],
		function(Marionette, MemberTableItemViewTemplate) {

			return Marionette.ItemView.extend({
				my_template : _.template(MemberTableItemViewTemplate),
				
				tagName : "tr",

				templateHelpers : function() {
					return {
						//model : this.model,
						membershipNumber : this.model.get("membershipNumber"),
						firstName : this.model.get("firstName")
					};
				},

				render : function() {
					this.$el.html(this.my_template(this.templateHelpers()));
				}
			});
		});
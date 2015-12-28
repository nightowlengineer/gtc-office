define([ 'marionette', 'text!templates/member/member_core.html',
		'models/member_model'], function(Marionette,
		memberCoreTemplate, Member) {

	return Marionette.LayoutView.extend({
		my_template : _.template(memberCoreTemplate),
		templateHelpers : function() {
			return {
				member : this.member.attributes
			};
		},
		
		regions : {
				memberMenu : "#memberMenu"
		},

		initialize : function(options) {
			this.member = new Member({_id: options.memberId});
			var p = this.member.fetch();
			var that = this;
			
			p.done(function() {
				that.render();
			});
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
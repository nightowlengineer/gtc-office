define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_core.html',
		'models/member_model', 'underscore.string', 'helpers/editable'], function($, editable, Marionette,
		memberCoreTemplate, Member, s, EditableHelper) {

	var MemberCoreView = Marionette.LayoutView.extend({
		template : _.template(memberCoreTemplate),
		
		templateHelpers : function() {
			return {
				salutation : s.capitalize(this.member.attributes.salutation, true),
				member : this.member.attributes
			};
		},
		
		regions : {
				memberMenu : "#memberMenu"
		},
		
		initialize : function(options) {
			this.member = new Member({_id: options.memberId});
			this.member.bind('change', this.render, this);
			this.member.fetch();
		},

		onRender : function()
		{
			this.setupEditable(".inlineEditable", this.member);
		}
	});

	_.extend(MemberCoreView.prototype, EditableHelper);
	
	return MemberCoreView;
});
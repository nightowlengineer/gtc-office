define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_core.html',
		'models/member_model', 'underscore.string', 'helpers/editable'], function($, editable, Marionette,
		memberCoreTemplate, Member, s, EditableHelper) {

	var MemberCoreView = Marionette.LayoutView.extend({
		template : _.template(memberCoreTemplate),
		
		templateHelpers : function() {
			return {
				member : this.member.attributes,
				addresses : this.member.get("addresses"),
				salutationTypes : this.setupSourceData(this.member.getSalutations()),
				locationTypes : this.setupSourceData(this.member.getLocations()),
				statusTypes : this.setupSourceData(this.member.getStatuses())
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
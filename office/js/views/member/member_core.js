define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_core.html',
		'models/member_model', 'underscore.string', 'helpers/editable'], function($, editable, Marionette,
		memberCoreTemplate, Member, s, EditableHelper) {

	var MemberCoreView = Marionette.LayoutView.extend({
		template : _.template(memberCoreTemplate),
		
		templateHelpers : function() {
			return {
				member : this.member.attributes,
				addresses : this.member.get("addresses"),
				salutationTypes : this.salutationTypes,
				locationTypes : this.locationTypes,
				statusTypes : this.statusTypes
			};
		},
		
		regions : {
				memberMenu : "#memberMenu"
		},
		
		initialize : function(options) {
			var self = this;
			this.member = new Member({_id: options.memberId});
			this.member.fetch().success(function(){
				self.render();
			}).error(function(){
				GtcOffice.navigate("#member", true);
			});
			this.salutationTypes = this.setupSourceData(this.member.getSalutations(true));
			this.locationTypes = this.setupSourceData(this.member.getLocations(true));
			this.statusTypes = this.setupSourceData(this.member.getStatuses(true));
		},

		onRender : function()
		{
			this.setupEditable(".inlineEditable", this.member);
		}
	});

	_.extend(MemberCoreView.prototype, EditableHelper);
	
	return MemberCoreView;
});
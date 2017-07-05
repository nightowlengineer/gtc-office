define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_core.html',
		'models/member_model', 'underscore.string', 'helpers/editable', 'app' ], function($, editable, Marionette,
		memberCoreTemplate, Member, s, EditableHelper, App) {

	var MemberCoreView = Marionette.LayoutView.extend({
		template : _.template(memberCoreTemplate),
		
		templateHelpers : function() {
			var roles = GtcOffice.userProfile.roles;
			return {
				member : this.member.attributes,
				addresses : this.member.get("addresses"),
				memberTypes : this.memberTypes,
				salutationTypes : this.salutationTypes,
				locationTypes : this.locationTypes,
				statusTypes : this.statusTypes,
				roles : roles,
				mailchimpUnsubscribeReason : this.mailchimpStatus.unsubscribeReason,
				mailchimpLastChanged : new Date(this.mailchimpStatus.lastChanged).toDateString(),
				mailchimpStatus : s.capitalize(this.mailchimpStatus.status, true)
			};
		},
		
		regions : {
				memberMenu : "#memberMenu"
		},
		
		events : {
			"click #mailchimpSubscribe" : "subscribeToMailchimp"
		},
		
		subscribeToMailchimp : function() {
			this.mailchimpStatus = this.member.subscribeToMailchimp();
			this.render();
		},
		
		initialize : function(options) {
			this.member = options.member;
			this.memberTypes = this.setupSourceData(this.member.getMemberTypes(true));
			this.salutationTypes = this.setupSourceData(this.member.getSalutations(true));
			this.locationTypes = this.setupSourceData(this.member.getLocations(true));
			this.statusTypes = this.setupSourceData(this.member.getStatuses(true));
			this.mailchimpStatus = this.member.getMyMailchimpStatus();
		},

		onShow : function()
		{
			// Make read-only for first release
			//this.setupEditable(".inlineEditable", this.member);
		}
	});

	_.extend(MemberCoreView.prototype, EditableHelper);
	
	return MemberCoreView;
});
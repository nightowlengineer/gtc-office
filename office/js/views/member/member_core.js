define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_core.html',
		'models/member_model', 'collections/member_collection', 'underscore.string', 'helpers/editable', 'app' ], function($, editable, Marionette,
		memberCoreTemplate, Member, Members, s, EditableHelper, App) {

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
				sponsorMemberCollection : this.sponsorMemberCollection
			};
		},
		
		regions : {
				memberMenu : "#memberMenu",
				sponsorMemberList : "#sponsorMemberList"
		},
		
		initialize : function(options) {
			var self = this;
			this.member = options.member;
			this.memberTypes = this.setupSourceData(this.member.getMemberTypes(true));
			this.salutationTypes = this.setupSourceData(this.member.getSalutations(true));
			this.locationTypes = this.setupSourceData(this.member.getLocations(true));
			this.statusTypes = this.setupSourceData(this.member.getStatuses(true));
			this.sponsorMemberCollection = new Members();
			//this.sponsorMemberCollection.bind("change", _.bind(this.render, this));
			this.getSponsorMembers();
			
			this.listenTo(this.sponsorMemberCollection, "add", this.render);
		},
		
		getSponsorMembers : function()
		{
			var self = this;
			var sponsorMembers = this.member.get("sponsorMembers");
			_.each(sponsorMembers, function(sponsorMember){
				var sponsorMemberModel = new Member({"membershipNumber": sponsorMember});
				sponsorMemberModel.getMemberByNumber().done(function(model){
					self.sponsorMemberCollection.add(model);
				});
			});
		},

		onRender : function()
		{
			this.setupEditable(".inlineEditable", this.member);
		}
	});

	_.extend(MemberCoreView.prototype, EditableHelper);
	
	return MemberCoreView;
});
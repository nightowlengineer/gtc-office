define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_create.html',
		'models/member_model', 'underscore.string', 'helpers/editable'], function($, editable, Marionette,
		memberCreateTemplate, Member, s, EditableHelper) {

	var MemberCreateView = Marionette.LayoutView.extend({
		template : _.template(memberCreateTemplate),
		
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
		
		events : {
			"click #createMember" : "createMember"
		},
		
		initialize : function(options) {
			var self = this;
			this.member = new Member();
			this.salutationTypes = this.member.getSalutations(true);
			this.locationTypes = this.member.getLocations(true);
			this.statusTypes = this.member.getStatuses(true);
		},
		
		createMember : function(e) {
			e.preventDefault();
			alert("Clicked create button");
		}
	});

	_.extend(MemberCreateView.prototype, EditableHelper);
	
	return MemberCreateView;
});
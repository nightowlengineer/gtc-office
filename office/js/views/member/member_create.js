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
			var member = new Member();
			var memberForm = $('#memberCreateForm').serialize();
			console.debug(memberForm);
			member.set(memberForm);
			member.createMember();
			console.debug("Sent member to backend");
		}
	});

	_.extend(MemberCreateView.prototype, EditableHelper);
	
	return MemberCreateView;
});
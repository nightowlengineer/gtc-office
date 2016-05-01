define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_create.html',
		'models/member_model', 'underscore.string', 'helpers/editable'], function($, editable, Marionette,
		memberCreateTemplate, Member, s, EditableHelper) {

	var MemberCreateView = Marionette.LayoutView.extend({
		template : _.template(memberCreateTemplate),
		
		templateHelpers : function() {
			return {
				member : this.member.attributes,
				addresses : this.member.get("addresses"),
				memberTypes : this.memberTypes,
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
			this.memberTypes = this.member.getMemberTypes(true);
			this.salutationTypes = this.member.getSalutations(true);
			this.locationTypes = this.member.getLocations(true);
			this.statusTypes = this.member.getStatuses(true);
		},
		
		createMember : function(e) {
			e.preventDefault();
			var member = new Member();
			var memberForm = {};
			$("#memberCreateForm").serializeArray().map(function(x){memberForm[x.name] = x.value;}); 
			member.set(memberForm);
			member.createMember(function(model, response){
				GtcOffice.navigate("/member/" + model.id, true);
			});
		}
	});

	_.extend(MemberCreateView.prototype, EditableHelper);
	
	return MemberCreateView;
});
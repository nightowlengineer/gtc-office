define([ 'underscore', 'underscore.string', 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_import.html',
		'models/member_model', 'underscore.string', 'helpers/editable', 'helpers/formhelper'], function(_, s, 
				$, editable, Marionette, memberImportTemplate, Member, s, EditableHelper, FormHelper) {

	return Marionette.LayoutView.extend({
		template : _.template(memberImportTemplate),
		
		templateHelpers : function() {
			return {
				memberTypes : s.toSentence(this.memberTypes),
				salutationTypes : s.toSentence(this.salutationTypes),
				statusTypes : s.toSentence(this.statusTypes)
			};
		},
		
		events : {
			"click #importMembers" : "importMembers"
		},
		
		initialize : function() {
			var member = new Member();
			this.memberTypes = member.getMemberTypes(true);
			this.salutationTypes = member.getSalutations(true);
			this.statusTypes = member.getStatuses(true);
		},
		
		importMembers : function(e) {
			e.preventDefault();
			var overwriteInput = $("#overwrite").is(':checked');
			var overwrite = overwriteInput && overwriteInput === true ? true : false;
			
			var syncWithAuth0 = $("#sync").is(':checked');
			var sync = syncWithAuth0 && syncWithAuth0 === true ? true : false;
			
			var formData = new FormData();
			formData.append("file", $("#membersCsv")[0].files[0]);
			formData.append("overwrite", overwrite);
			
			var member = new Member();
			member.importMembers(formData, function(data, failed){
				if (!failed)
				{
					var results = '<p class="alert">Total read for import: ' + data.importedSet.length + '</p>';
					results += '<p class="alert">Pre-import total member records: ' + data.existingSet.length + '</p>';
					results += '<p class="alert alert-success">Created: ' + data.createdSet.length + '</p>';
					results += '<p class="alert alert-info">Updated: ' + data.updatedSet.length + '</p>';
					results += '<p class="alert alert-warning">Deleted: ' + data.deletedSet.length + '</p>';
					results += '<p class="alert alert-danger">Errors: ' + data.errorSet.length + '</p>';
				}
				else
				{
					var results = '<p class="alert alert-danger">Unable to complete import:';
					results += '<pre>' + data.responseJSON.message + '</pre></p>';
				}
				$("#importResult").html(results);
				
				if (!failed && sync === true)
				{
					member.syncAuth0Users(function(data){
						var syncResult = '<p class="alert">Total synced with Auth0: ' + data + '</p>';
						$("#syncResult").html(syncResult);
					});
				}
			});
		}
	});
});
define([ 'jquery', 'x-editable', 'marionette', 'text!templates/member/member_import.html',
		'models/member_model', 'underscore.string', 'helpers/editable', 'helpers/formhelper'], function($, editable, Marionette,
		memberImportTemplate, Member, s, EditableHelper, FormHelper) {

	return Marionette.LayoutView.extend({
		template : _.template(memberImportTemplate),
		
		events : {
			"click #importMembers" : "importMembers"
		},
		
		importMembers : function(e) {
			e.preventDefault();
			var overwrite = false;
			var overwriteInput = $("#overwrite").val();
			if (overwriteInput && overwriteInput == "danger")
			{
				overwrite = true;
			}
			var formData = new FormData();
			formData.append("file", $("#membersCsv")[0].files[0]);
			var member = new Member();
			member.importMembers(formData, overwrite, function(data){
				var results = '<p class="alert">Total read for import: ' + data.importedSet.length + '</p>';
				results += '<p class="alert">Pre-import total member records: ' + data.existingSet.length + '</p>';
				results += '<p class="alert alert-success">Created: ' + data.createdSet.length + '</p>';
				results += '<p class="alert alert-info">Updated: ' + data.updatedSet.length + '</p>';
				results += '<p class="alert alert-warning">Deleted: ' + data.deletedSet.length + '</p>';
				results += '<p class="alert alert-danger">Errors: ' + data.errorSet.length + '</p>';
				
				$("#importResult").html(results);
			});
		}
	});
});
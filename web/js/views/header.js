define(
		[ 'bootstrap', 'marionette', 'typeahead', 'bloodhound', 'handlebars',
				'text!templates/header.html' ],
		function(bootstrap, Marionette, Typeahead, Bloodhound, Handlebars,
				headerTemplate) {

			return Marionette.ItemView
					.extend({
						template : headerTemplate,
						
						events : {
							"typeahead:select" : "typeaheadSelectMember"
						},
						
						typeaheadSelectMember : function(e, suggestion)
						{
							$('.typeahead').typeahead('val', "");
							GtcOffice.navigate("#/member/" + suggestion._id, true);
						},

						onShow : function() {
							$('.dropdown-toggle').dropdown();
							var membersBloodhound = new Bloodhound(
									{
										datumTokenizer : Bloodhound.tokenizers.obj
												.whitespace('value'),
										queryTokenizer : Bloodhound.tokenizers.whitespace,
										remote : {
											url : 'https://api.dev.gtc.org.uk/member/search/%memberNumber',
											wildcard : '%memberNumber'
										}
									});
							$('#members-typeahead .typeahead')
									.typeahead(
											null,
											{
												hint : true,
												highlight : true,
												minLength : 1,
												name : 'membersTA',
												display : 'membershipNumber',
												source : membersBloodhound,
												templates : {
													empty : [
															'<div class="empty-message">',
															'Unable to find any members that match the current query',
															'</div>' ]
															.join('\n'),
													suggestion : Handlebars
															.compile('<div class="statusColor statusColor-{{status}}"><strong>{{membershipNumber}}</strong> {{firstName}} {{lastName}}<br />Type: {{type}}</div>')
												}
											});
						}
					})
		});
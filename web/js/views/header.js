define(
		[ 'typeahead', 'bloodhound', 'handlebars', 'text!templates/header.html' ],
		function(Typeahead, Bloodhound, Handlebars, headerTemplate) {

			var HeaderView = Marionette.ItemView
					.extend({
						template : headerTemplate,

						initialize : function() {
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
					});
			return HeaderView;
		});
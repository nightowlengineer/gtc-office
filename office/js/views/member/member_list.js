define([ 'marionette', 'text!templates/member/member_list.html',
		'collections/member_collection', 'views/member/member_table' ],
		function(Marionette, memberListTemplate, Members, MemberTableView) {

			return Marionette.View.extend({
				template : _.template(memberListTemplate),
				templateContext : function() {
					return {
						listTitle : this.options.listTitle
					};
				},

				regions : {
					memberTable : "#memberTableRegion"
				},

				initialize : function(options) {
					this.showMemberNumber = options.showMemberNumber
					this.render();
				},

				onRender : function() {
					this.$el.append(this.template(this.templateContext()));
					var memberTableView = new MemberTableView({
						collection : this.collection,
						showMemberNumber : this.showMemberNumber
					});
					this.showChildView("memberTable", memberTableView);

					var table = $("#memberTable").DataTable();
					
					var sortDef;
					
					if (this.showMemberNumber)
					{
						sortDef = [0, 'desc'];
					}
					else
					{
						sortDef = [0, 'asc'];
					}
					
					table.order(sortDef).draw();
				}
			});
		});
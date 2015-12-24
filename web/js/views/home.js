define([ 'marionette', 'text!templates/home.html' ], function(Marionette,
		homeTemplate) {

	return Marionette.ItemView.extend({
		my_template : _.template(homeTemplate),
		templateHelpers : function() {
			return {
				testContent : "someExample"
			};
		},

		initialize : function() {
			this.render();
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
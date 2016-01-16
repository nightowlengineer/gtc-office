define([ 'marionette', 'text!templates/home.html' ], function(Marionette,
		homeTemplate) {

	return Marionette.LayoutView.extend({
		my_template : _.template(homeTemplate),
		templateHelpers : function() {
			return {
				optionalMessage : this.optionalMessage
			};
		},

		initialize : function(options) {
			this.optionalMessage = options.optionalMessage;
			this.render();
		},

		render : function() {
			this.$el.html(this.my_template(this.templateHelpers()));
		}
	});
});
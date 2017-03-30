define([ 'marionette', 'text!templates/error.html' ], function(Marionette,
		ErrorTemplate) {

	return Marionette.View.extend({
		template : _.template(ErrorTemplate),
		templateContext : function() {
			return {
				message : this.message,
				errorCode : this.errorCode
			};
		},

		initialize : function(options) {
			this.errorCode = options.errorCode;
			this.message = options.message;
			this.render();
		}
	});
});
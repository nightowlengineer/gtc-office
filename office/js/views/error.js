define([ 'marionette', 'text!templates/error.html' ], function(Marionette,
		ErrorTemplate) {

	return Marionette.LayoutView.extend({
		template : _.template(ErrorTemplate),
		templateHelpers : function() {
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
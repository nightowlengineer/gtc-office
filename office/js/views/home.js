define([ 'marionette', 'text!templates/home.html' ], function(Marionette,
		homeTemplate) {

	return Marionette.LayoutView.extend({
		template : _.template(homeTemplate),
		templateHelpers : function() {
			return {
				optionalMessage : this.optionalMessage
			};
		},
		
		events : {
			'click .btn-login' : 'loginProcess'
		},
		
		loginProcess : function(e) {
			e.preventDefault();
			GtcOffice.lock.show(function(err, profile, token) {
				if (err) {
				      // Error callback
				      alert('There was an error');
				    } else {
				      // Success callback

				      // Save the JWT token.
				      localStorage.setItem('userToken', token);

				      // Save the profile
				      userProfile = profile;
				    }
			});
		},

		initialize : function(options) {
			this.optionalMessage = options.optionalMessage;
			this.render();
		},
	});
});
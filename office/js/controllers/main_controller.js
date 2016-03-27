define([ 'marionette', 'views/home', 'views/dash', 'views/error' ], function(
		Marionette, HomeView, DashView, ErrorView) {

	return Marionette.Controller.extend({
		home : function() {
			console.log("MainController.home called");
			GtcOffice.getProfile().done(function() {
				if (GtcOffice.isLoggedIn) {
					GtcOffice.navigate("#dash", true);
				} else {
					GtcOffice.showView(new HomeView());
					GtcOffice.setNav("home");
				}
			});
		},

		dash : function() {
			console.log("MainController.dash called");
			GtcOffice.getProfile().done(function() {
				if (GtcOffice.isLoggedIn) {
					GtcOffice.regions.getRegion('header').currentView.render();
					GtcOffice.showView(new DashView());
					GtcOffice.setNav("dash");
				} else {
					GtcOffice.navigate("#", true);
				}
			});
		},

		logout : function() {
			GtcOffice.showView(new HomeView({
				optionalMessage : "Logout completed."
			}))
			GtcOffice.regions.getRegion('header').currentView.render();
			GtcOffice.navigate("#", true);
		},
		
		404 : function(path) {
			this.error("404", path);
		},
		
		error : function(errorCode, extra) {
			console.log("ErrorController.error called");
			var detailedMessage = "An error occurred.";
			switch(errorCode)
			{
			case "404":
				detailedMessage = "That page doesn't exist: " + extra;
				break;
			case "502":
				detailedMessage = "The office is unavailable. Contact support via the footer.";
				break;
			default:
				break;
			}
			
			var options = {
					errorCode : errorCode,
					message : detailedMessage
			}
			GtcOffice.showView(new ErrorView(options));
			
			GtcOffice.navigate("#");
			GtcOffice.setNav("dash");
		}
	});

});
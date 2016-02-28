define([ 'marionette', 'views/home', 'views/dash', 'views/error' ], function(Marionette, HomeView, DashView, ErrorView) {

	return Marionette.Controller.extend({
		home : function() {
			console.log("MainController.home called");
			if (GtcOffice.userProfile != null)
			{
				GtcOffice.navigate("#dash", true);
				return;
			}
			GtcOffice.showView(new HomeView());
			GtcOffice.setNav("home"); //Doesn't exist - just remove current tab
		},
		
		dash : function() {
			console.log("MainController.dash called");
			GtcOffice.regions.getRegion('header').currentView.render();
			GtcOffice.showView(new DashView());
			GtcOffice.setNav("dash");
		},
		
		logout : function() {
			GtcOffice.showView(new HomeView({
				optionalMessage : "Logout completed."
			}))
			GtcOffice.regions.getRegion('header').currentView.render();
			GtcOffice.navigate("#", true);
		},
		
		404 : function(path) {
			console.log("MainController.404 called");
			var options = {
				errorCode : "404",
				message : "That page doesn't exist: " + path
			}
			GtcOffice.navigate("/404");
			GtcOffice.showView(new ErrorView(options));
			GtcOffice.setNav("dash");
		}
	});

});
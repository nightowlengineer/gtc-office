define([ 'marionette', 'views/home', 'views/error' ], function(Marionette, HomeView, ErrorView) {

	return Marionette.Controller.extend({
		index : function() {
			console.log("MainController.index called");
			GtcOffice.showView(new HomeView());
			GtcOffice.setNav("home");
		},
		
		404 : function(path) {
			console.log("MainController.404 called");
			var options = {
				errorCode : "404",
				message : "That page doesn't exist: " + path
			}
			GtcOffice.navigate("/404");
			GtcOffice.showView(new ErrorView(options));
			GtcOffice.setNav("home");
		}
	});

});
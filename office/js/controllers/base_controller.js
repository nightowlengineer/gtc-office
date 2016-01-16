define([ 'marionette', 'views/error' ], function(Marionette, ErrorView) {

	return Marionette.Controller.extend({
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
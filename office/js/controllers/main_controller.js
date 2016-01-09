define([ 'marionette', 'views/home' ], function(Marionette, HomeView) {

	return Marionette.Controller.extend({
		index : function() {
			console.log("MainController.index called");
			GtcOffice.showView(new HomeView());
			GtcOffice.setNav("home");
		}
	});

});
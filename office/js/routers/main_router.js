define([ 'marionette', 'controllers/main_controller' ], function(Marionette, MainController) {

	return Marionette.AppRouter.extend({
		appRoutes : {
			'' : 'index'
		},
		controller : new MainController(),


	});
	
	

});
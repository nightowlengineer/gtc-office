define([ 'marionette', 'controllers/main_controller' ], function(Marionette, MainController) {

	return Marionette.AppRouter.extend({
		
		appRoutes : {
			'(/)' : 'home',
			'logout' : 'logout',
			'dash' : 'dash'
		},
		
		controller : new MainController()
	});
});
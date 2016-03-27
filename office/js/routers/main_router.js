define([ 'marionette', 'controllers/main_controller' ], function(Marionette, MainController) {

	return Marionette.AppRouter.extend({
		
		appRoutes : {
			'(/)' : 'home',
			'logout' : 'logout',
			'dash' : 'dash',
			'error/:errorCode' : 'error',
			'*path' : '404'
		},
		
		controller : new MainController()
	});
});
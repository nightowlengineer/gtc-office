define([ 'marionette', 'controllers/main_controller' ], function(Marionette, MainController) {

	return Marionette.AppRouter.extend({
		
		appRoutes : {
			'(/)' : 'index',
			'logout' : 'logout',
			'home' : 'home',
			'*path' : '404'
		},
		
		controller : new MainController()
	});
});
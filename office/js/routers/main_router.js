define([ 'marionette', 'controllers/main_controller' ], function(Marionette, MainController) {

	return Marionette.AppRouter.extend({
		
		appRoutes : {
			'(/)' : 'index',
			'*path' : '404',
			'#' : 'index'
				
		},
		
		controller : new MainController()
	});
});
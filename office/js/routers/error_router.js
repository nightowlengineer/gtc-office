define([ 'marionette', 'controllers/error_controller' ], function(Marionette, ErrorController) {

	return Marionette.AppRouter.extend({
		
		appRoutes : {
			'*path' : '404',
			'error(/:code)' : 'error'
		},
		
		controller : new ErrorController()
	});
});
define([ 'marionette', 'controllers/error_controller' ], function(Marionette, ErrorController) {

	return Marionette.AppRouter.extend({
		
		appRoutes : {
			'error(/:code)' : 'error'
		},
		
		controller : new ErrorController()
	});
});
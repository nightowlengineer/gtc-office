define([ 'marionette', 'controllers/member_controller' ], function(Marionette, MemberController) {

	return Marionette.AppRouter.extend({
		appRoutes : {
			'member' : 'home',
			'member/:id' : 'view'
		},
		controller : new MemberController(),


	});
	
	

});
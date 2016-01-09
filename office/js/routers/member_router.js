define([ 'marionette', 'controllers/member_controller' ], function(Marionette, MemberController) {

	return Marionette.AppRouter.extend({
		appRoutes : {
			'member' : 'home',
			'member/applications' : 'applications',
			'member/current' : 'current',
			'member/:id' : 'view'
		},
		controller : new MemberController(),


	});
	
	

});
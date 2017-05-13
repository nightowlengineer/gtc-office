define([ 'marionette', 'controllers/member_controller' ], function(Marionette, MemberController) {

	return Marionette.AppRouter.extend({
		appRoutes : {
			'member(/)' : 'home',
			'member/import(/)' : 'import',
			'member/applications(/)' : 'applications',
			'member/current(/)' : 'current',
			'member/all(/)' : 'all',
			'member/create(/)' : 'create',
			'member/:id(/)' : 'view'
		},
		controller : new MemberController(),


	});
	
	

});
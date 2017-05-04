define([ 'marionette', 'controllers/member_controller' ], function(Marionette, MemberController) {

	return Marionette.AppRouter.extend({
		appRoutes : {
			'member(/)' : 'home',
			'member/import(/)' : 'import',
			'member/applications(/)' : 'applications',
			'member/current(/)' : 'current',
			'member/create(/)' : 'create',
			'member/number/:membershipNumber(/)' : 'viewByNumber',
			'member/:id(/)' : 'view'
		},
		controller : new MemberController(),


	});
	
	

});
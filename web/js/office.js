define([ "marionette", "views/header", "views/footer" ], function(Marionette,
		HeaderView, FooterView) {
	var OfficeLayout = new Marionette.LayoutView.extend({

		regions : {
			header : '#header',
			footer : '#footer'
		},

		onBeforeShow : function() {
			this.getRegion('header').show(new HeaderView());
			this.getRegion('footer').show(new FooterView());
		}
	});

	return OfficeLayout;
});
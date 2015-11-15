define([ "marionette", "jquery-ui", "office" ], function(Marionette, OfficeLayout) {
	var GtcOffice = new Marionette.Application();

	GtcOffice.navigate = function(route, options) {
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	GtcOffice.getCurrentRoute = function() {
		return Backbone.history.fragment
	};

	GtcOffice.startSubApp = function(appName, args) {
		var currentApp = appName ? GtcOffice.module(appName) : null;
		if (GtcOffice.currentApp === currentApp) {
			return;
		}

		if (GtcOffice.currentApp) {
			GtcOffice.currentApp.stop();
		}

		GtcOffice.currentApp = currentApp;
		if (currentApp) {
			currentApp.start(args);
		}
	};

	GtcOffice.on("before:start", function() {
		var RegionContainer = Marionette.LayoutView.extend({
			el : "#app-container",

			regions : {
				header : "#header",
				main : "#main-region",
				dialog : "#dialog-region"
			}
		});

		GtcOffice.regions = new RegionContainer();
		GtcOffice.regions.dialog.onShow = function(view) {
			var self = this;
			var closeDialog = function() {
				self.stopListening();
				self.empty();
				self.$el.dialog("destroy");
			};

			this.listenTo(view, "dialog:close", closeDialog);

			this.$el.dialog({
				modal : true,
				title : view.title,
				width : "auto",
				close : function(e, ui) {
					closeDialog();
				}
			});
		};
	});

	GtcOffice.on("start", function() {
		if (Backbone.history) {
			require([ "office" ],
					function(OfficeLayout) {
						Backbone.history.start();
						var officeLayout = new OfficeLayout();
						
						if (GtcOffice.getCurrentRoute() === "") {
							GtcOffice.trigger("home:view");
						}
					});
		}
	});

	return GtcOffice;
});
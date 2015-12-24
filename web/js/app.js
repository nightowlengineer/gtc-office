define([ "marionette", "views/header", "views/footer", "views/home" ],
		function(Marionette, HeaderView, FooterView, HomeView) {
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

			GtcOffice.on("start", function() {
				var RegionContainer = Marionette.LayoutView.extend({
					el : "#appWrapper",

					regions : {
						header : "#header",
						footer : "#footer",
						content : "#content",
						dialog : "#dialog"
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

				this.regions.getRegion('header').show(new HeaderView());
				this.regions.getRegion('content').show(new HomeView());
				this.regions.getRegion('footer').show(new FooterView());
				Backbone.history.start();

				if (GtcOffice.getCurrentRoute() === "") {
					GtcOffice.trigger("home:view");
				}

			});

			return GtcOffice;
		});
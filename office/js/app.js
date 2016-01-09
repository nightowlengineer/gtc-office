define([ "marionette", "routers/main_router", "routers/member_router",
		"views/header", "views/footer", "views/home", "pace", "underscore", "underscore.string", "jquery"], function(Marionette,
		MainRouter, MemberRouter, HeaderView, FooterView, HomeView, pace, _, s, $) {
	GtcOffice = new Marionette.Application();

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
	}

	GtcOffice.on("start", function() {
		
		pace.start({
			restartOnRequestAfter: 100
		});
		
		$(document).on('click a', 'a:not([data-bypass])', function(e) {
			e.preventDefault();
			var link = e.target.attributes.getNamedItem("data-route").value;
			GtcOffice.navigate(link, true);
		});
		
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
		this.regions.getRegion('footer').show(new FooterView());

		// Routers
		var mainRouter = new MainRouter();
		var memberRouter = new MemberRouter();
		
		Backbone.history.start({
			pushState: true,
			root: window.location.pathname.replace('/','').split('/')[0]
		});
	});

	
	GtcOffice.setNav = function(location)
	{
		// Reset nav
		$("li[data-app-location]").removeClass("active");

		// Expand the location
		var path = s.words(location, ".");
		// Set the parent location
		if (path[0] != location)
		{
			$("li[data-app-location='" + path[0] + "']").addClass("active");
		}
		$("li[data-app-location='" + location + "']").addClass("active");
	};
	
	GtcOffice.showView = function(view) {
		this.regions.getRegion('content').show(view);
	};
	
	return GtcOffice;
});
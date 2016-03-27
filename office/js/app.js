define([ "marionette", "routers/main_router", "routers/error_router",
        "routers/member_router", "views/header", "views/footer", "views/home",
        "pace", "underscore", "underscore.string", "jquery", "auth0-lock" ],
        function(Marionette, MainRouter, ErrorRouter, MemberRouter, HeaderView, FooterView,
        		HomeView, pace, _, s, $, Auth0Lock) {
	GtcOffice = new Marionette.Application();
	
	GtcOffice.navigate = function(route, options) {
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	GtcOffice.getCurrentRoute = function() {
		return Backbone.history.fragment
	};

	GtcOffice.userProfile;
	GtcOffice.isLoggedIn;

	GtcOffice.getProfile = function() {
		var deferredObject = $.Deferred();
		var profilePromise = GtcOffice.lock.getProfile(localStorage
				.getItem("userToken"), function(err, profile) {
			if (err) {
				GtcOffice.userProfile = null;
				GtcOffice.isLoggedIn = false;
			} else {
				GtcOffice.userProfile = profile;
				GtcOffice.isLoggedIn = true;
			}
			console.log("Fetched profile");
			deferredObject.resolve();
		});
		return deferredObject.promise(profilePromise);
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

	GtcOffice.lock = new Auth0Lock('y8T1angMINFrNKwwiSec1DDhQaZB7zTq',
			'gtc.eu.auth0.com');

	GtcOffice.on("start", function() {

		// sso requires redirect mode, hence we need to parse
		// the response from Auth0 that comes on location hash
		var hash = GtcOffice.lock.parseHash(window.location.hash);
		if (hash && hash.id_token) {
			console.log("Resuming session from Auth0");
			localStorage.setItem('userToken', hash.id_token);
			GtcOffice.isLoggedIn = true;
		}

		$.ajaxSetup({
			headers : {
				'Authorization' : 'Bearer ' + localStorage.getItem('userToken')
			}
		});

		pace.start({
		// restartOnRequestAfter: 500
		});

		$(document).on(
				'click a',
				'a:not([data-bypass])',
				function(e) {
					e.preventDefault();
					var link = e.target.attributes.getNamedItem("data-route");
					if (link) {
						var link = e.target.attributes
								.getNamedItem("data-route").value;
						GtcOffice.navigate(link, true);
					}
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

		var errorRouter = new ErrorRouter();
		var History = Backbone.History.extend({
		  loadUrl: function() {
		    var match = Backbone.History.prototype.loadUrl.apply(this, arguments);
		    if (!match) GtcOffice.navigate("error/404", true);
		    return match;
		  }
		});
		(Backbone.history = new History).start({
			pushState : true,
			root : window.location.pathname.replace('/', '').split('/')[0]
		});
	});

	GtcOffice.setNav = function(location) {
		// Reset nav
		$("li[data-app-location]").removeClass("active");

		// Expand the location
		var path = s.words(location, ".");
		// Set the parent location
		if (path[0] != location) {
			$("li[data-app-location='" + path[0] + "']").addClass("active");
		}
		$("li[data-app-location='" + location + "']").addClass("active");
	};

	GtcOffice.showView = function(view) {
		this.regions.getRegion('content').show(view);
	};

	return GtcOffice;
});
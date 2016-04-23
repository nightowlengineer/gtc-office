require
		.config({
			baseUrl : "/office/js/",
			paths : {
				jquery : "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min",
				json2 : "https://cdnjs.cloudflare.com/ajax/libs/json2/20150503/json2.min",
				underscore : "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
				"underscore.string" : "https://cdnjs.cloudflare.com/ajax/libs/underscore.string/3.3.4/underscore.string.min",
				backbone : "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
				"backbone-deep-model" : "libs/backbone-deep-model.min",
				marionette : "https://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.5/backbone.marionette.min",
				handlebars : "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.amd.min",
				"jquery-ui" : "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min",
				text : "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
				bootstrap : "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min",
				typeahead : "https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min",
				bloodhound : "https://cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/0.11.1/bloodhound.min",
				datatables : "https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.11/js/jquery.dataTables.min",
				"x-editable" : "https://cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.1/bootstrap3-editable/js/bootstrap-editable.min",
				pace : "https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min",
				"auth0-lock" : "https://cdn.auth0.com/js/lock-8.2.min",
				app : "app",
				templates : "templates",
			},
			shim : {
				underscore : {
					exports : "_"
				},
				"underscore.string" : {
					deps : [ "underscore" ],
					exports : "s"
				},
				backbone : {
					deps : [ "jquery", "underscore", "json2" ],
					exports : "Backbone"
				},
				"backbone-deep-model" : {
					deps : [ "backbone" ],
					exports : "Backbone"
				},
				marionette : {
					deps : [ "backbone" ],
					exports : "Marionette"
				},
				"jquery-ui" : [ "jquery" ],
				tpl : [ "text" ],
				typeahead : {
					deps : [ "jquery" ],
					exports : "jquery"
				},
				bootstrap : {
					deps : [ "jquery" ],
				},
				bloodhound : {
					deps : [ "jquery" ],
					exports : "Bloodhound"
				},
				"x-editable" : {
					deps : [ "jquery", "bootstrap" ],
					exports : "jquery"
				}
			}
		});

require([ "app" ], function(GtcOffice) {
	GtcOffice.start();
});
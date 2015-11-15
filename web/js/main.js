require
		.config({
			baseUrl : './js',
			paths : {
				jquery : 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min',
				json2 : 'https://cdnjs.cloudflare.com/ajax/libs/json2/20150503/json2.min',
				underscore : 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
				backbone : 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min',
				marionette : 'https://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.3/backbone.marionette.min',
				handlebars : 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.4/handlebars.amd.min',
				"jquery-ui" : 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
				text : 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
				app : 'app',
				templates : 'templates',
				bootstrap : 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
				typeahead : 'http://twitter.github.com/typeahead.js/releases/latest/typeahead.jquery',
				bloodhound : 'http://twitter.github.com/typeahead.js/releases/latest/bloodhound'
			},
			shim : {
				underscore : {
					exports : "_"
				},
				backbone : {
					deps : [ "jquery", "underscore", "json2" ],
					exports : "Backbone"
				},
				marionette : {
					deps : [ "backbone" ],
					exports : "Marionette"
				},
				"jquery-ui" : [ "jquery" ],
				tpl : [ "text" ],
				typeahead : {
					'deps' : [ 'jquery' ],
					'exports' : 'jquery'
				},
				bloodhound : {
					deps : [ "jquery" ],
					exports : "Bloodhound"
				}
			}
		});

require([ "app" ], function(GtcOffice) {
	GtcOffice.start();
});
define([ 'app', 'backbone', 'backbone-deep-model' ], function(App, Backbone) {

	return Backbone.DeepModel.extend({
		idAttribute : "_id",
		basePath : function() {
			return GtcOffice.ConfigHandler.getValue("basePath");
		},
		urlRoot : function() {
			return this.basePath();
		},
		
		fetch : function(options) {
			options = options || {};
			var custom = {
			    'Content-type': 'application/json',
			    'Accept': 'application/json',
			    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
			  };
			options.headers = options.headers ? _.extend(options.headers, custom) : custom;
			return Backbone.Model.prototype.fetch.call(this, options);
		},
		
		save : function(attrs, options) {
			options = options || {};
			var custom = {
			    'Content-type': 'application/json',
			    'Accept': 'application/json',
			    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
			  };
			options.headers = options.headers ? _.extend(options.headers, custom) : custom;
			attrs = attrs || this.attributes;
			return Backbone.Model.prototype.save.call(this, attrs, options);
		},
		
		getPlainData : function(apiPath, cache)
		{
			var returnData;
			
			if (cache && typeof(Storage) !== "undefined")
			{
				cachedVersion = sessionStorage.getItem(apiPath);
				if (cachedVersion && cachedVersion != "")
				{
					returnData = JSON.parse(cachedVersion);
				}
				else
				{
					$.ajax({
						type: 'GET',
						url : this.basePath() + apiPath,
						async : false,
						success : function(data){
							sessionStorage.setItem(apiPath, JSON.stringify(data));
							returnData = data;
						}
					});
				}
			}
			else
			{
				$.ajax({
					type: 'GET',
					url : this.basePath() + apiPath,
					async : false,
					success : function(data){
						returnData = data;
					}
				});
			}
			return returnData;
		},
		
		getJsonData : function(apiPath)
		{
			var returnData;
			
			$.ajax({
				type: 'GET',
				url : this.basePath() + apiPath,
				async : false,
				timeout: 5000,
				success : function(data){
					returnData = data;
				}
			});
			
			return returnData;
		}
	});

});
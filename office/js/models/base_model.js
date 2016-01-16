define([ 'backbone', 'backbone-deep-model' ], function(Backbone) {

	return Backbone.DeepModel.extend({
		idAttribute : "_id",
		basePath : "https://api.dev.gtc.org.uk/",
		urlRoot : "https://api.dev.gtc.org.uk/",
		
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
						url : this.basePath + apiPath,
						async : false,
						success : function(data){
							sessionStorage.setItem(apiPath, JSON.stringify(data));
							returnData = data;
						}
					});
				}
				return returnData;
			}
			else
			{
				$.ajax({
					type: 'GET',
					url : this.basePath + apiPath,
					async : false,
					success : function(data){
						return data;
					}
				});
			}
		}
	});

});
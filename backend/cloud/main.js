Parse.Cloud.beforeSave('Game', function(request, response) {
	if (request.object.get('status') === undefined) {
		request.object.set('status', 'preGame');
		response.success();
		return;
	}
	else if (request.object.get('status') === 'preGame') {
		var query = new Parse.Query("Map");

		query.get(request.object.id, {
			success: function(result) {
				if(request.object.get('players').length >= result.get('players'))
					resquest.object.set('status', 'active')

				response.success();
				return;
			},
			error: function(error) {
				response.error("Query failed. Error: " + error.message);
				return;
			}
		})
	}
	else if (request.object.get('status') === 'active') {

	}

	response.success();
});

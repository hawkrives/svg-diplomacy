Parse.Cloud.beforeSave('Game', function(request, response) {
	if(request.object.get('status') === undefined) {
		request.object.set('status', 'preGame');
	}
	response.success();
});

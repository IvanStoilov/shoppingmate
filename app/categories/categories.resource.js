(function () {
	angular
		.module('app.categories')
		.service('CategoriesResource', CategoriesResource);

	CategoriesResource.$inject = ['$http', 'Config'];

	function CategoriesResource($http, Config)
	{
		var baseUrl = Config.apiRootUrl + '/categories';

		var service = {
			getAll: getAll
		};

		return service;

		function getAll()
		{
			return $http.get(baseUrl).then(function (response) {
				return response.data;
			});
		}
	}

})();
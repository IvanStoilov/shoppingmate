(function () {
	angular
		.module('app.categories')
		.service('CategoriesResource', CategoriesResource);

	CategoriesResource.$inject = ['$http'];

	function CategoriesResource($http)
	{
		var baseUrl = 'http://127.0.0.1:3000/api/categories';

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
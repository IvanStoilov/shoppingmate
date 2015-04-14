(function () {
	angular
		.module('app.products')
		.service('ProductsResource', ProductsResource);

	ProductsResource.$inject = ['$http', 'Config'];

	function ProductsResource($http, Config)
	{
		var baseUrl = Config.apiRootUrl + '/categories/';

		var service = {
			getByCategoryId: getByCategoryId
		};

		return service;

		function getByCategoryId(categoryId)
		{
			return $http.get(baseUrl + categoryId + "/products").then(function (response) {
				return response.data;
			});
		}
	}

})();
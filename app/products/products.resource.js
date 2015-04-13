(function () {
	angular
		.module('app.products')
		.service('ProductsResource', ProductsResource);

	ProductsResource.$inject = ['$http'];

	function ProductsResource($http)
	{
		var baseUrl = 'http://127.0.0.1:3000/api/categories/';

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
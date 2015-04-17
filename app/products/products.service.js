(function () {
	angular
		.module('app.products')
		.service('ProductsService', ProductsService);

	ProductsService.$inject = ['ProductsResource', '$q'];

	function ProductsService(ProductsResource, $q)
	{
		var service = {
			getByCategoryId: getByCategoryId
		}

		var _categoriesCache = {};

		return service;

		function getByCategoryId(categoryId) {

			if (_categoriesCache.hasOwnProperty(categoryId))
			{
				var deferred = $q.defer();
				deferred.resolve(_categoriesCache[categoryId]);
				return deferred.promise;
			}

			return ProductsResource.getByCategoryId(categoryId).then(function (products) {
				_categoriesCache[categoryId] = products;
				return products;
			});
		}
	}
})();
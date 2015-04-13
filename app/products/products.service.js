(function () {
	angular
		.module('app.products')
		.service('ProductsService', ProductsService);

	ProductsService.$inject = ['ProductsResource'];

	function ProductsService(ProductsResource)
	{

//		{
//			"id": 1,
//			"name": "Apple",
//			"image": "img/products/apple.jpg",
//			"category_id": 1,
//			"quantity": 500,
//			"unit": "g",
//			"price": Math.random() * 10
//		},

		var service = {
			getByCategoryId: getByCategoryId
		}

		var _categoriesCache = {};

		return service;

		function getByCategoryId(categoryId) {

			return ProductsResource.getByCategoryId(categoryId).then(function (products) {
				_categoriesCache.categoryId = products;
				return products;
			});
		}
	}
})();
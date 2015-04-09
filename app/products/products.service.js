(function () {
	angular
		.module('app.products')
		.service('ProductsService', ProductsService);

	function ProductsService()
	{
		var _products = [
			{
				"name": "Apple",
				"image": "img/products/apple.jpg",
				"category_id": 1,
				"price": Math.random() * 10
			},
			{
				"name": "Pear",
				"image": "img/products/pear.jpg",
				"category_id": 1,
				"price": (Math.random() * 10)
			},
			{
				"name": "Tomatoes",
				"image": "img/products/tomato.jpg",
				"category_id": 2,
				"price": (Math.random() * 10)
			},
			{
				"name": "Spinach",
				"image": "img/products/spinash.jpg",
				"category_id": 2,
				"price": (Math.random() * 10)
			},
			{
				"name": "Beet Root",
				"image": "img/products/beets.jpg",
				"category_id": 2,
				"price": (Math.random() * 10)
			},
			{
				"name": "Lettuce",
				"image": "img/products/lettuce.jpg",
				"category_id": 2,
				"price": (Math.random() * 10)
			},
			{
				"name": "Cheese",
				"image": "img/products/cheese.jpg",
				"category_id": 3,
				"price": (Math.random() * 10)
			},
			{
				"name": "Milk",
				"image": "img/products/milk.jpg",
				"category_id": 3,
				"price": (Math.random() * 10)
			}
		];

		var service = {
			getAll: getAll,
			getByCategoryId: getByCategoryId
		}

		return service;

		function getAll() {
			return _products;
		}

		function getByCategoryId(categoryId) {
			return _products.filter(function (product) {
				return product.category_id == categoryId
			});
		}
	}
})();
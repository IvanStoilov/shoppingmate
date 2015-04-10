(function () {
	angular
		.module('app.products')
		.service('ProductsService', ProductsService);

	function ProductsService()
	{
		var _products = [
			{
				"id": 1,
				"name": "Apple",
				"image": "img/products/apple.jpg",
				"category_id": 1,
				"quantity": 500,
				"unit": "g",
				"price": Math.random() * 10
			},
			{
				"id": 2,
				"name": "Pear",
				"image": "img/products/pear.jpg",
				"category_id": 1,
				"quantity": 500,
				"unit": "g",
				"price": (Math.random() * 10)
			},
			{
				"id": 3,
				"name": "Tomatoes",
				"image": "img/products/tomato.jpg",
				"category_id": 2,
				"quantity": 500,
				"unit": "g",
				"price": (Math.random() * 10)
			},
			{
				"id": 4,
				"name": "Spinach",
				"image": "img/products/spinash.jpg",
				"category_id": 2,
				"quantity": 1,
				"unit": "st",
				"price": (Math.random() * 10)
			},
			{
				"id": 5,
				"name": "Beet Root",
				"image": "img/products/beets.jpg",
				"category_id": 2,
				"quantity": 4,
				"unit": "st",
				"price": (Math.random() * 10)
			},
			{
				"id": 6,
				"name": "Lettuce",
				"image": "img/products/lettuce.jpg",
				"category_id": 2,
				"quantity": 1,
				"unit": "st",
				"price": (Math.random() * 10)
			},
			{
				"id": 7,
				"name": "Cheese",
				"image": "img/products/cheese.jpg",
				"category_id": 3,
				"quantity": 1,
				"unit": "st",
				"price": (Math.random() * 10)
			},
			{
				"id": 8,
				"name": "Milk",
				"image": "img/products/milk.jpg",
				"category_id": 3,
				"quantity": 1,
				"unit": "btl",
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
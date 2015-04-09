(function () {
	angular
		.module('app.basket')
		.service('BasketService', BasketService);

	function BasketService()
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
			}
		];

		var service = {
			getSavedProducts: getSavedProducts
		};

		return service;

		function getSavedProducts() {
			return _products;
		}
	}
});
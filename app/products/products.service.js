(function () {
	angular
		.module('app.products')
		.service('ProductsService', ProductsService);

	function ProductsService()
	{
		var _products = [
			{
				"name": "Apple",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Pear",
				"image": "img/photo2.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Irinka's",
				"image": "img/photo3.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "White bread",
				"image": "img/photo3.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Fish",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Kip filet",
				"image": "img/photo2.jpg",
				"price": Math.round(Math.random() * 10)
			}
		];

		var service = {
			getAll: getAll
		}

		return service;

		function getAll() {
			return _products;
		}
	}
})();
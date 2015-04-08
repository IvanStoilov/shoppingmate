(function () {
	angular
		.module('app.categories')
		.service('CategoriesService', CategoriesService);

	function CategoriesService()
	{
		var _categories = [
			{
				"id": 1,
				"name": "Fruits",
				"image": "img/products/fruits.jpg"
			},
			{
				"id": 2,
				"name": "Vegetables",
				"image": "img/products/vegetables.jpg"
			},
			{
				"id": 3,
				"name": "Dairy",
				"image": "img/products/dairy.jpg"
			}
		];

		var service = {
			getAll: getAll
		}

		return service;

		function getAll() {
			return _categories;
		}
	}
})();
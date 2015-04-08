(function () {
	angular
		.module('app.categories')
		.service('CategoriesService', CategoriesService);

	function CategoriesService()
	{
		var _categories = [
			{
				"name": "Fruits",
				"image": "img/photo1.jpg"
			},
			{
				"name": "Vegetables",
				"image": "img/photo2.jpg"
			},
			{
				"name": "Bakery",
				"image": "img/photo3.jpg"
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
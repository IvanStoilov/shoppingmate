(function () {
	'use strict';

	angular
		.module('app.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$stateParams', 'ProductsService', 'BasketService', 'CategoriesService'];

	function ProductsController($stateParams, ProductsService, BasketService, CategoriesService) {
		var vm = this;

		var selectedCategoryId = parseInt($stateParams.categoryId);

		ProductsService.getByCategoryId(selectedCategoryId).then(function (products) {
			vm.products = products;

			CategoriesService.getById(selectedCategoryId).then(function (category) {
				vm.selectedCategory = category;

				CategoriesService.getById(category.parent_id).then(function (parentCategory) {
					vm.breadcrumbs = [
						{text: "All categories", sref: "main.categories"},
						{text: parentCategory.name, sref: "main.subcategories({parentCategory: id})"},
						{text: category.name, sref: false}
					];
				});
			});
		});
		vm.addToBasket = addToBasket;

		function addToBasket(product) {
			BasketService.addToBasket(product);
		}
	};
})();
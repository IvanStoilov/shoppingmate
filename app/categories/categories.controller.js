(function () {
	'use strict';

	angular
		.module('app.categories')
		.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['CategoriesService', '$stateParams'];

	function CategoriesController(CategoriesService, $stateParams) {
		var vm = this;
		vm.categories = [];
		vm.selectedCategory = false;

		var selectedCategoryId = parseInt($stateParams.selectedCategoryId);

		activate();

		function activate() {
			if (selectedCategoryId) {
				activateSubCategories();
			} else {
				activateTopCategories();
			}
		}

		function activateTopCategories()
		{
			vm.breadcrumbs = [
				{text: "All categories", sref: false}
			];

			CategoriesService.getTopCategories().then(function (categories) {
				vm.categories = categories;
			});
		}

		function activateSubCategories() {
			CategoriesService.getSubCategories(selectedCategoryId).then(function (categories) {
				vm.categories = categories;

				CategoriesService.getById(selectedCategoryId).then(function (category) {
					vm.selectedCategory = category;

					vm.breadcrumbs = [
						{text: "All categories", sref: "main.categories"},
						{text: category.name, sref: false}
					];
				})
			});
		}
	};
})();
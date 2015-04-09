(function () {
	'use strict';

	angular
		.module('app.categories')
		.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject = ['CategoriesService'];

	function CategoriesController(CategoriesService) {
		var vm = this;

		vm.categories = CategoriesService.getAll();
	};
})();
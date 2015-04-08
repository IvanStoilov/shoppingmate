(function () {
	'use strict';

	angular
		.module('app.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$routeParams', 'ProductsService'];

	function ProductsController($routeParams, ProductsService) {
		var vm = this;

		vm.products = ProductsService.getByCategoryId($routeParams.categoryId);
		vm.addToBasket = addToBasket;

		function addToBasket() {
			
		}
	};
})();
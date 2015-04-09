(function () {
	'use strict';

	angular
		.module('app.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$stateParams', 'ProductsService'];

	function ProductsController($stateParams, ProductsService) {
		var vm = this;

		vm.products = ProductsService.getByCategoryId($stateParams.categoryId);
		vm.addToBasket = addToBasket;

		function addToBasket() {
			
		}
	};
})();
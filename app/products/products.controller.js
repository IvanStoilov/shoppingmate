(function () {
	'use strict';

	angular
		.module('app.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['ProductsService'];

	function ProductsController(ProductsService) {
		var vm = this;

		vm.products = ProductsService.getAll();
		vm.addToBasket = addToBasket;

		function addToBasket() {
			
		}
	};
})();
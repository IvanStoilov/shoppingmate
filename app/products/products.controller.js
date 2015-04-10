(function () {
	'use strict';

	angular
		.module('app.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$stateParams', 'ProductsService', 'BasketService'];

	function ProductsController($stateParams, ProductsService, BasketService) {
		var vm = this;

		vm.products = ProductsService.getByCategoryId($stateParams.categoryId);
		vm.addToBasket = addToBasket;

		function addToBasket(product) {
			BasketService.addToBasket(product);
		}
	};
})();
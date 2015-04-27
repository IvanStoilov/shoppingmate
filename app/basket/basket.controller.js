(function () {
	'use strict';

	angular
		.module('app.basket')
		.controller('BasketController', BasketController);

	BasketController.$inject = ['$scope', 'BasketService'];

	function BasketController($scope, BasketService) {
		var vm = this;

		vm.totalPrice = 0;
		vm.removeProduct = removeProduct;
		vm.addProduct = addProduct;
		vm.products = [];
		vm.animationsActive = true;

		activate();

		function activate() {
			$scope.$watch(BasketService.getNumberOfProducts, _updateProductsAndPrice);

			BasketService.reloadBasket();
		}

		function addProduct(product) {
			_disableAnimations();
			BasketService.addProduct(product);
		}

		function removeProduct(product) {
			_disableAnimations();
			BasketService.removeProduct(product);
		}

		function _updateProductsAndPrice()
		{
			vm.products = BasketService.getSavedProducts();
			vm.totalPrice = BasketService.getTotalPrice();
			_enableAnimations();
		}

		function _disableAnimations()
		{
			vm.animationsActive = false;
			return this;
		}

		function _enableAnimations()
		{
			vm.animationsActive = true;
			return this;
		}
	}
})();

(function () {
	'use strict';

	angular
		.module('app.basket')
		.controller('BasketController', BasketController);

	BasketController.$inject = ['$scope', 'BasketService'];

	function BasketController($scope, BasketService) {
		var vm = this;

		vm.totalPrice = 0;
		vm.remove = BasketService.removeProduct;

		activate();

		function activate() {
			$scope.$watch(BasketService.getTotalPrice, function (value) {
				vm.totalPrice = value;
			});

			$scope.$watch(BasketService.getSavedProducts, function (products) {
				vm.products = products;
			});
		}
	}
})();

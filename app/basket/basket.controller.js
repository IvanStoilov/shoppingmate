(function () {
	'use strict';

	angular
		.module('app.basket')
		.controller('BasketController', BasketController);

	BasketController.$inject = ['$scope', 'BasketService'];

	function BasketController($scope, BasketService) {
		var vm = this;

		vm.products = BasketService.getSavedProducts();
		vm.totalPrice = 0;

		activate();

		function activate() {
			$scope.$watch(BasketService.getTotalPrice, function (value) {
				vm.totalPrice = value;
			});
		}
	}
})();

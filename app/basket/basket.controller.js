(function () {
	'use strict';

	angular
		.module('app.basket')
		.controller('BasketController', BasketController);

	BasketController.$inject = ['BasketService'];

	function BasketController(BasketService) {
		var vm = this;

		vm.products = BasketService.getSavedProducts();
	}
});
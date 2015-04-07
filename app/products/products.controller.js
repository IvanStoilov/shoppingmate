(function () {
	'use strict';

	angular
		.module('app.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = [];

	function ProductsController() {
		var vm = this;

		vm.products = [
			{
				"name": "Apple",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Pear",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Irinka's",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "White bread",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Fish",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			},
			{
				"name": "Kip filet",
				"image": "img/photo1.jpg",
				"price": Math.round(Math.random() * 10)
			}
		];
	};
})();
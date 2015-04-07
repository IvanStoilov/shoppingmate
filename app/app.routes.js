(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		$routeProvider
			.when('/products', {
				templateUrl: "app/products/products.html",
				controller: 'ProductsController',
				controllerAs: 'products'
			})
			.otherwise({
				redirectTo: '/products'
			});
	}


})();


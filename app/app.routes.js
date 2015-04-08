(function () {
	'use strict';

	angular
		.module('app')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		$routeProvider
			.when('/category', {
				templateUrl: "app/products/products.html",
				controller: 'ProductsController',
				controllerAs: 'products'
			})
			.when('/products', {
				templateUrl: "app/categories/categories.html",
				controller: 'CategoriesController',
				controllerAs: 'categories'
			})
			.otherwise({
				redirectTo: '/products'
			});
	}


})();

